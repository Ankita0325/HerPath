/**
 * firebaseService.ts
 * Centralized Firebase / Firestore data helpers used across all pages.
 * Import these functions instead of calling Firestore directly in components.
 */

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  addDoc,
  serverTimestamp,
  DocumentData,
} from "firebase/firestore";
import { db } from "./firebase";

// ─── USER ─────────────────────────────────────────────────────────────────────

/** Fetch a user document by UID */
export async function getUser(uid: string): Promise<DocumentData | null> {
  try {
    const snap = await getDoc(doc(db, "users", uid));
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
  } catch (err) {
    console.warn("[firebaseService] getUser error:", err);
    return null;
  }
}

/** Fetch a user by email (fallback lookup) */
export async function getUserByEmail(email: string): Promise<DocumentData | null> {
  try {
    const q = query(collection(db, "users"), where("email", "==", email.trim()));
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const d = snap.docs[0];
    return { id: d.id, ...d.data() };
  } catch (err) {
    console.warn("[firebaseService] getUserByEmail error:", err);
    return null;
  }
}

/** Create or overwrite a user document */
export async function createUser(uid: string, data: Record<string, unknown>): Promise<void> {
  await setDoc(doc(db, "users", uid), { ...data, updatedAt: new Date().toISOString() });
}

/** Partially update a user document */
export async function updateUser(uid: string, data: Partial<Record<string, unknown>>): Promise<void> {
  try {
    await updateDoc(doc(db, "users", uid), { ...data, updatedAt: new Date().toISOString() });
  } catch (err) {
    console.warn("[firebaseService] updateUser error:", err);
  }
}

// ─── ONBOARDING ───────────────────────────────────────────────────────────────

/** Save onboarding answers to the user's Firestore document */
export async function saveOnboarding(
  uid: string,
  onboardingData: {
    role: string;
    skills: string[];
    wantToLearn: string[];
    goals: string[];
    language: string;
    location: string;
    availability: string[];
  }
): Promise<void> {
  try {
    await updateDoc(doc(db, "users", uid), {
      ...onboardingData,
      onboarded: true,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    // If doc doesn't exist yet (race condition), create it
    try {
      await setDoc(
        doc(db, "users", uid),
        { ...onboardingData, onboarded: true, updatedAt: new Date().toISOString() },
        { merge: true }
      );
    } catch (e) {
      console.warn("[firebaseService] saveOnboarding error:", e);
    }
  }
}

// ─── PORTFOLIO / SKILLS ───────────────────────────────────────────────────────

/** Get all portfolio items for a user */
export async function getPortfolio(uid: string): Promise<DocumentData[]> {
  try {
    const q = query(collection(db, "portfolios", uid, "items"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.warn("[firebaseService] getPortfolio error:", err);
    return [];
  }
}

/** Add a portfolio item */
export async function addPortfolioItem(uid: string, item: Record<string, unknown>): Promise<string> {
  const ref = await addDoc(collection(db, "portfolios", uid, "items"), {
    ...item,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

// ─── OPPORTUNITIES ────────────────────────────────────────────────────────────

/** Fetch all published opportunities */
export async function getOpportunities(): Promise<DocumentData[]> {
  try {
    const q = query(collection(db, "opportunities"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.warn("[firebaseService] getOpportunities error:", err);
    return [];
  }
}

// ─── COMMUNITY ────────────────────────────────────────────────────────────────

/** Fetch community posts */
export async function getCommunityPosts(): Promise<DocumentData[]> {
  try {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.warn("[firebaseService] getCommunityPosts error:", err);
    return [];
  }
}

/** Add a community post */
export async function addCommunityPost(
  uid: string,
  authorName: string,
  content: string,
  tags: string[] = []
): Promise<void> {
  await addDoc(collection(db, "posts"), {
    uid,
    authorName,
    content,
    tags,
    likes: 0,
    createdAt: serverTimestamp(),
  });
}

// ─── LEARNING ─────────────────────────────────────────────────────────────────

/** Mark a lesson as complete for a user */
export async function markLessonComplete(uid: string, courseId: string, lessonId: string): Promise<void> {
  try {
    await setDoc(
      doc(db, "progress", uid),
      { [`${courseId}.${lessonId}`]: true, updatedAt: new Date().toISOString() },
      { merge: true }
    );
  } catch (err) {
    console.warn("[firebaseService] markLessonComplete error:", err);
  }
}

/** Get all progress for a user */
export async function getUserProgress(uid: string): Promise<DocumentData | null> {
  try {
    const snap = await getDoc(doc(db, "progress", uid));
    return snap.exists() ? snap.data() : null;
  } catch (err) {
    console.warn("[firebaseService] getUserProgress error:", err);
    return null;
  }
}

// ─── EXPERTS / MENTORS ────────────────────────────────────────────────────────

/** Fetch all expert profiles */
export async function getExperts(): Promise<DocumentData[]> {
  try {
    const q = query(collection(db, "experts"), orderBy("rating", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.warn("[firebaseService] getExperts error:", err);
    return [];
  }
}

/** Get a single expert by UID */
export async function getExpert(uid: string): Promise<DocumentData | null> {
  try {
    const snap = await getDoc(doc(db, "experts", uid));
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
  } catch (err) {
    console.warn("[firebaseService] getExpert error:", err);
    return null;
  }
}

/** Update expert profile */
export async function updateExpert(uid: string, data: Partial<Record<string, unknown>>): Promise<void> {
  try {
    await setDoc(doc(db, "experts", uid), { ...data, updatedAt: new Date().toISOString() }, { merge: true });
  } catch (err) {
    console.warn("[firebaseService] updateExpert error:", err);
  }
}

// ─── ACCESS REQUESTS ──────────────────────────────────────────────────────────

/** Save an access request to Firestore */
export async function saveAccessRequest(request: Record<string, unknown>): Promise<void> {
  try {
    await addDoc(collection(db, "accessRequests"), {
      ...request,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.warn("[firebaseService] saveAccessRequest error:", err);
  }
}

/** Get access requests for a learner */
export async function getLearnerAccessRequests(learnerId: string): Promise<DocumentData[]> {
  try {
    const q = query(collection(db, "accessRequests"), where("learnerId", "==", learnerId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.warn("[firebaseService] getLearnerAccessRequests error:", err);
    return [];
  }
}
