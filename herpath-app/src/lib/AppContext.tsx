'use client';
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { currentUser, User } from '@/data/mockData';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  aiPanelOpen: boolean;
  language: string;
}

interface AppContextType extends AppState {
  login: (user: User) => void;
  logout: () => void;
  completeOnboarding: () => void;
  toggleAIPanel: () => void;
  setAIPanelOpen: (open: boolean) => void;
  setLanguage: (lang: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    user: null,
    isAuthenticated: false,
    isOnboarded: false,
    aiPanelOpen: false,
    language: 'English',
  });

  const login = useCallback((user: User) => {
    setState(s => ({ ...s, user, isAuthenticated: true }));
  }, []);

  const logout = useCallback(() => {
    setState(s => ({ ...s, user: null, isAuthenticated: false, isOnboarded: false }));
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

  return (
    <AppContext.Provider value={{ ...state, login, logout, completeOnboarding, toggleAIPanel, setAIPanelOpen, setLanguage }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

// Demo: auto-login with demo user for easy access
export function useDemoAuth() {
  const { login, user, isAuthenticated } = useApp();
  const loginAsDemo = useCallback(() => {
    login(currentUser);
  }, [login]);
  return { loginAsDemo, user, isAuthenticated };
}
