'use client';
import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { getUser } from './firebaseService';
import { currentUser, mentors, User, AccessRequest, AccessCategory, initialAccessRequests } from '@/data/mockData';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  aiPanelOpen: boolean;
  language: string;
  currentRole: 'learner' | 'expert';
  accessRequests: AccessRequest[];
  firebaseUid: string | null;
}

interface AppContextType extends AppState {
  login: (user: User) => void;
  logout: () => void;
  completeOnboarding: () => void;
  toggleAIPanel: () => void;
  setAIPanelOpen: (open: boolean) => void;
  setLanguage: (lang: string) => void;
  switchRole: (role: 'learner' | 'expert') => void;
  sendAccessRequest: (
    learnerHerPathId: string,
    requestedCategories: AccessCategory[],
    purpose: string
  ) => { success: boolean; message: string; request?: AccessRequest };
  approveAccessRequest: (
    requestId: string,
    grantedCategories: Record<AccessCategory, boolean>,
    durationHours: number
  ) => void;
  rejectAccessRequest: (requestId: string) => void;
  revokeAccess: (requestId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    user: currentUser, // default to demo user; Firebase auth state will override
    isAuthenticated: true,
    isOnboarded: true,
    aiPanelOpen: false,
    language: 'English',
    currentRole: 'learner',
    accessRequests: initialAccessRequests,
    firebaseUid: null,
  });

  // ── Firebase Auth State Listener ─────────────────────────────────────────
  // Runs once on mount. Keeps the app state in sync with Firebase Auth
  // so users stay logged in across page refreshes.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in — try to load their Firestore profile
        const userData = await getUser(firebaseUser.uid);
        if (userData) {
          const role = userData.userType === 'expert' || userData.isMentor ? 'expert' : 'learner';
          setState(s => ({
            ...s,
            user: {
              ...currentUser,
              ...userData,
              id: firebaseUser.uid,
              email: firebaseUser.email || userData.email || '',
            } as User,
            isAuthenticated: true,
            isOnboarded: userData.onboarded ?? true,
            currentRole: role,
            firebaseUid: firebaseUser.uid,
          }));
        } else {
          // Signed in via Firebase Auth but no Firestore doc yet
          setState(s => ({
            ...s,
            isAuthenticated: true,
            firebaseUid: firebaseUser.uid,
          }));
        }
      }
      // If firebaseUser is null, leave existing state (demo mode stays working)
    });

    return () => unsubscribe(); // cleanup on unmount
  }, []);

  const login = useCallback((user: User) => {
    const role = user.userType === 'expert' || user.isMentor ? 'expert' : 'learner';
    setState(s => ({ ...s, user, isAuthenticated: true, currentRole: role }));
  }, []);

  const logout = useCallback(async () => {
    try {
      await auth.signOut();
    } catch (_) {}
    setState(s => ({ ...s, user: null, isAuthenticated: false, isOnboarded: false, firebaseUid: null }));
  }, []);

  const completeOnboarding = useCallback(() => {
    setState(s => ({ ...s, isOnboarded: true }));
  }, []);

  const toggleAIPanel = useCallback(() => {
    setState(s => ({ ...s, aiPanelOpen: !s.aiPanelOpen }));
  }, []);

  const setAIPanelOpen = useCallback((open: boolean) => {
    setState(s => ({ ...s, aiPanelOpen: open }));
  }, []);

  const setLanguage = useCallback((language: string) => {
    setState(s => ({ ...s, language }));
  }, []);

  const switchRole = useCallback((targetRole: 'learner' | 'expert') => {
    if (targetRole === 'expert') {
      const expertUser = mentors[0]; // Priya Sharma
      setState(s => ({ ...s, user: expertUser, currentRole: 'expert' }));
    } else {
      setState(s => ({ ...s, user: currentUser, currentRole: 'learner' }));
    }
  }, []);

  const sendAccessRequest = useCallback(
    (learnerHerPathId: string, requestedCategories: AccessCategory[], purpose: string) => {
      const targetLearner = currentUser.herpathId?.toLowerCase() === learnerHerPathId.trim().toLowerCase() ? currentUser : null;

      if (!targetLearner) {
        return { success: false, message: 'Learner not found. Please check the HerPath ID (e.g. HP-7K29-X4M8) and try again.' };
      }

      const activeUser = state.user || mentors[0];

      const existing = state.accessRequests.find(
        r => r.expertId === activeUser.id && r.learnerHerPathId.toLowerCase() === learnerHerPathId.trim().toLowerCase()
      );

      if (existing) {
        if (existing.status === 'APPROVED') {
          return { success: false, message: 'You already have active approved access to this learner.' };
        }
        if (existing.status === 'PENDING') {
          return { success: false, message: 'Access request already sent and pending learner approval.' };
        }
      }

      const newReq: AccessRequest = {
        id: `req-${Date.now()}`,
        expertId: activeUser.id,
        expertName: activeUser.name,
        expertRole: activeUser.role || 'Expert Mentor',
        expertAvatarColor: activeUser.avatarColor || '#0F766E',
        expertInitials: activeUser.initials || 'EX',
        learnerId: targetLearner.id,
        learnerName: targetLearner.name,
        learnerHerPathId: targetLearner.herpathId || 'HP-7K29-X4M8',
        requestedCategories,
        purpose,
        status: 'PENDING',
        createdAt: new Date().toISOString(),
      };

      setState(s => ({
        ...s,
        accessRequests: [newReq, ...s.accessRequests],
      }));

      return { success: true, message: 'Access request sent successfully! Waiting for learner approval.', request: newReq };
    },
    [state.accessRequests, state.user]
  );

  const approveAccessRequest = useCallback(
    (requestId: string, grantedCategories: Record<AccessCategory, boolean>, durationHours: number) => {
      const expires = new Date();
      expires.setHours(expires.getHours() + durationHours);

      setState(s => ({
        ...s,
        accessRequests: s.accessRequests.map(r => {
          if (r.id === requestId) {
            return { ...r, status: 'APPROVED', grantedCategories, durationHours, expiresAt: expires.toISOString() };
          }
          return r;
        }),
      }));
    },
    []
  );

  const rejectAccessRequest = useCallback((requestId: string) => {
    setState(s => ({
      ...s,
      accessRequests: s.accessRequests.map(r => (r.id === requestId ? { ...r, status: 'REJECTED' } : r)),
    }));
  }, []);

  const revokeAccess = useCallback((requestId: string) => {
    setState(s => ({
      ...s,
      accessRequests: s.accessRequests.map(r => (r.id === requestId ? { ...r, status: 'REVOKED' } : r)),
    }));
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        login,
        logout,
        completeOnboarding,
        toggleAIPanel,
        setAIPanelOpen,
        setLanguage,
        switchRole,
        sendAccessRequest,
        approveAccessRequest,
        rejectAccessRequest,
        revokeAccess,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export function useDemoAuth() {
  const { login, user, isAuthenticated } = useApp();
  const loginAsDemo = useCallback(() => {
    login(currentUser);
  }, [login]);
  return { loginAsDemo, user, isAuthenticated };
}
