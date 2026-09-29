// src/lib/fraud-legal.ts

export type FraudCategoryId =
  | "upi-payment"
  | "bank"
  | "online-shopping"
  | "fake-job"
  | "investment"
  | "phishing"
  | "account-hacking"
  | "identity-theft"
  | "social-media"
  | "romance"
  | "online-harassment"
  | "ticket-booking"
  | "loan"
  | "impersonation"
  | "fake-website";

export interface Authority {
  name: string;
  purpose: string;
  website?: string;
  helpline?: string;
  inPerson?: string;
  lastVerified: string; // ISO date
  verifiedBy: "admin" | "pending-review";
}

export interface LawSection {
  lawName: string;
  section: string;
  title: string;
  plainExplanation: string;
  whenRelevant: string;
  sourceUrl: string;
  lastVerified: string;
  verifiedBy: "admin" | "pending-review";
}

export interface VideoResource {
  title: string;
  youtubeUrl: string;
  channel: string;
  durationLabel?: string;
}

export interface RequiredDocument {
  id: string;
  label: string;
  hint?: string;
}

export interface FraudCategory {
  id: FraudCategoryId;
  emoji: string;
  name: string;
  shortDescription: string;
  warningSigns: string[];
  authorities: Authority[];
  laws: LawSection[];
  videos: VideoResource[];
  documents: RequiredDocument[];
}

export const LEGAL_DISCLAIMER =
  "Information provided for educational and navigation purposes. Laws and procedures can change. Verify current requirements with the relevant official authority or qualified legal professional. This is legal information, not legal advice.";