// src/data/fraud-legal.seed.ts

export interface Authority {
  name: string;
  purpose: string;
  website?: string;
  helpline?: string;
  inPerson?: string;
  lastVerified: string;
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
}

export interface RequiredDocument {
  id: string;
  label: string;
}

export interface FraudCategory {
  id: string;
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

const LV = "2026-09-29";
const VB = "pending-review" as const;

export const FRAUD_CATEGORIES: FraudCategory[] = [
  // ─────────────────────────────────────────────── 1. UPI / Payment
  {
    id: "upi-payment",
    emoji: "💳",
    name: "UPI / Payment Fraud",
    shortDescription:
      "Money sent to a scammer, unauthorized UPI debit, or a fake payment link.",
    warningSigns: [
      "Unknown UPI ID asking for money",
      "QR code to 'receive' money",
      "Urgent 'account will be blocked' messages",
      "Request for OTP / UPI PIN",
    ],
    authorities: [
      {
        name: "National Cyber Crime Reporting Portal",
        purpose: "File online complaint for any cyber financial fraud",
        website: "https://cybercrime.gov.in",
        helpline: "1930",
        lastVerified: LV,
        verifiedBy: VB,
      },
      {
        name: "Your Bank / Payment App Fraud Desk",
        purpose: "Freeze transaction, raise chargeback",
        website: "https://www.npci.org.in",
        inPerson: "Nearest branch of your bank",
        lastVerified: LV,
        verifiedBy: VB,
      },
    ],
    laws: [
      {
        lawName: "Bharatiya Nyaya Sanhita, 2023",
        section: "318(4)",
        title: "Cheating",
        plainExplanation:
          "Covers deceiving someone to dishonestly take their property or money.",
        whenRelevant: "When someone tricked you into transferring money.",
        sourceUrl: "https://www.indiacode.nic.in",
        lastVerified: LV,
        verifiedBy: VB,
      },
      {
        lawName: "Information Technology Act, 2000",
        section: "66D",
        title: "Cheating by personation using computer resource",
        plainExplanation:
          "Covers cheating by impersonation through a computer or device.",
        whenRelevant:
          "When the fraudster impersonated a bank, company, or person online.",
        sourceUrl: "https://www.indiacode.nic.in",
        lastVerified: LV,
        verifiedBy: VB,
      },
    ],
    videos: [
      {
        title: "How to report UPI fraud on cybercrime.gov.in",
        youtubeUrl:
          "https://www.youtube.com/watch?v=i1NnjgQjeHQ&time_continue=123&source_ve_path=MjM4NTE&embeds_referring_euri=https%3A%2F%2Fchatgpt.com%2F",
        channel: "Replace with a vetted video",
      },
    ],
    documents: [
      { id: "govt-id", label: "Government ID" },
      { id: "mobile", label: "Mobile Number" },
      { id: "email", label: "Email" },
      { id: "upi-id", label: "UPI ID" },
      { id: "txn-id", label: "Transaction ID / UTR" },
      { id: "txn-date", label: "Transaction Date" },
      { id: "fraud-amount", label: "Fraud Amount" },
      { id: "bank-provider", label: "Bank / Payment Provider" },
      { id: "payment-screenshot", label: "Payment Screenshot" },
      { id: "bank-statement", label: "Bank Statement" },
      { id: "chat-screenshots", label: "Chat Screenshots" },
      { id: "sms-email", label: "SMS / Email" },
      { id: "suspect-phone", label: "Suspect Phone / UPI ID" },
      { id: "suspicious-url", label: "Suspicious URL" },
      { id: "suspect-email", label: "Suspect Email" },
      { id: "suspect-bank", label: "Suspect Bank Account" },
    ],
  },

  // ─────────────────────────────────────────────── 2. Bank Fraud
  {
    id: "bank",
    emoji: "🏦",
    name: "Bank Fraud",
    shortDescription:
      "Unauthorized debit/credit, cloned card, or fake bank call.",
    warningSigns: [
      "Unknown transactions in statement",
      "Calls from 'bank' asking for OTP / CVV",
      "Card used without your knowledge",
    ],
    authorities: [
      {
        name: "National Cyber Crime Reporting Portal",
        purpose: "File online complaint",
        website: "https://cybercrime.gov.in",
        helpline: "1930",
        lastVerified: LV,
        verifiedBy: VB,
      },
      {
        name: "RBI Consumer Education & Protection",
        purpose: "Escalate unresolved bank complaints",
        website: "https://rbi.org.in",
        lastVerified: LV,
        verifiedBy: VB,
      },
    ],
    laws: [
      {
        lawName: "Bharatiya Nyaya Sanhita, 2023",
        section: "318(4)",
        title: "Cheating",
        plainExplanation: "Dishonest inducement causing loss of money.",
        whenRelevant: "When you were tricked into a bank transaction.",
        sourceUrl: "https://www.indiacode.nic.in",
        lastVerified: LV,
        verifiedBy: VB,
      },
      {
        lawName: "Information Technology Act, 2000",
        section: "66",
        title: "Computer-related offences",
        plainExplanation: "Covers unauthorized access to a computer resource.",
        whenRelevant: "When your bank account was accessed without consent.",
        sourceUrl: "https://www.indiacode.nic.in",
        lastVerified: LV,
        verifiedBy: VB,
      },
    ],
    videos: [
      {
        title: "How to report bank fraud in India",
        youtubeUrl:
          "https://www.youtube.com/watch?v=i1NnjgQjeHQ&time_continue=123&source_ve_path=MjM4NTE&embeds_referring_euri=https%3A%2F%2Fchatgpt.com%2F",
        channel: "Replace with a vetted video",
      },
    ],
    documents: [
      { id: "govt-id", label: "Government ID" },
      { id: "mobile", label: "Mobile Number" },
      { id: "email", label: "Email" },
      { id: "txn-id", label: "Transaction ID / UTR" },
      { id: "txn-date", label: "Transaction Date" },
      { id: "fraud-amount", label: "Fraud Amount" },
      { id: "bank-provider", label: "Bank / Payment Provider" },
      { id: "bank-statement", label: "Bank Statement" },
      { id: "card-details", label: "Card number (last 4 digits only)" },
      { id: "sms-alerts", label: "Bank SMS / email alerts" },
      { id: "written-complaint", label: "Written complaint to bank" },
      { id: "suspect-phone", label: "Suspect Phone" },
      { id: "suspect-email", label: "Suspect Email" },
      { id: "suspect-bank", label: "Suspect Bank Account" },
    ],
  },

  // ─────────────────────────────────────────────── 3. Phishing
  {
    id: "phishing",
    emoji: "🎣",
    name: "Phishing",
    shortDescription:
      "Fake emails / SMS / links that steal login or card details.",
    warningSigns: [
      "Urgent language",
      "Suspicious sender domain",
      "Link preview mismatch",
    ],
    authorities: [
      {
        name: "National Cyber Crime Reporting Portal",
        purpose: "Report phishing URL",
        website: "https://cybercrime.gov.in",
        helpline: "1930",
        lastVerified: LV,
        verifiedBy: VB,
      },
      {
        name: "CERT-In",
        purpose: "Report cybersecurity incidents",
        website: "https://www.cert-in.org.in",
        lastVerified: LV,
        verifiedBy: VB,
      },
    ],
    laws: [
      {
        lawName: "Information Technology Act, 2000",
        section: "66D",
        title: "Cheating by personation using computer resource",
        plainExplanation: "Covers online impersonation fraud.",
        whenRelevant:
          "When you received a fake email / SMS pretending to be a bank.",
        sourceUrl: "https://www.indiacode.nic.in",
        lastVerified: LV,
        verifiedBy: VB,
      },
      {
        lawName: "Information Technology Act, 2000",
        section: "66C",
        title: "Identity theft",
        plainExplanation: "Fraudulent use of credentials.",
        whenRelevant: "If credentials were stolen.",
        sourceUrl: "https://www.indiacode.nic.in",
        lastVerified: LV,
        verifiedBy: VB,
      },
    ],
    videos: [
      {
        title: "How to spot a phishing email",
        youtubeUrl:
          "https://www.youtube.com/watch?v=i1NnjgQjeHQ&time_continue=123&source_ve_path=MjM4NTE&embeds_referring_euri=https%3A%2F%2Fchatgpt.com%2F",
        channel: "Replace with a vetted video",
      },
      {
        title: "Phishing awareness — stay safe online",
        youtubeUrl: "https://www.youtube.com/channel/UCSefrNGpowURW77cK0dXTGA",
        channel: "Replace with a vetted video",
      },
    ],
    documents: [
      { id: "mobile-email", label: "Mobile / Email as required" },
      { id: "incident-date", label: "Date & Time" },
      { id: "what-happened", label: "What happened" },
      { id: "message-screenshot", label: "Message Screenshot" },
      { id: "original-email", label: "Original Email" },
      { id: "sender-details", label: "Sender Details" },
      { id: "url", label: "URL" },
      { id: "phone-number", label: "Phone Number" },
      { id: "website-screenshot", label: "Website Screenshot" },
      { id: "txn-id", label: "Transaction ID / UTR" },
      { id: "bank-statement", label: "Bank Statement" },
      { id: "payment-receipt", label: "Payment Receipt" },
    ],
  },

  // ─────────────────────────────────────────────── 4. Fake Job
  {
    id: "fake-job",
    emoji: "💼",
    name: "Fake Job / Employment Scam",
    shortDescription:
      "Fake offer letter, registration fee, or unpaid work scam.",
    warningSigns: [
      "Asks for money for 'registration'",
      "Offer without interview",
      "Unofficial email domain",
    ],
    authorities: [
      {
        name: "National Cyber Crime Reporting Portal",
        purpose: "Report online job scam",
        website: "https://cybercrime.gov.in",
        helpline: "1930",
        lastVerified: LV,
        verifiedBy: VB,
      },
      {
        name: "Ministry of Labour & Employment",
        purpose: "Employment-related grievances",
        website: "https://labour.gov.in",
        lastVerified: LV,
        verifiedBy: VB,
      },
    ],
    laws: [
      {
        lawName: "Bharatiya Nyaya Sanhita, 2023",
        section: "318(4)",
        title: "Cheating",
        plainExplanation: "Dishonest inducement causing loss.",
        whenRelevant: "When a fake employer took money or documents.",
        sourceUrl: "https://www.indiacode.nic.in",
        lastVerified: LV,
        verifiedBy: VB,
      },
    ],
    videos: [
      {
        title: "How to identify fake job offers",
        youtubeUrl:
          "https://www.youtube.com/watch?v=i1NnjgQjeHQ&time_continue=123&source_ve_path=MjM4NTE&embeds_referring_euri=https%3A%2F%2Fchatgpt.com%2F",
        channel: "Replace with a vetted video",
      },
    ],
    documents: [
      { id: "job-ad", label: "Job Advertisement" },
      { id: "company-name", label: "Company Name" },
      { id: "recruiter-details", label: "Recruiter Details" },
      { id: "offer-letter", label: "Offer Letter" },
      { id: "website-social", label: "Website / Social Profile" },
      { id: "chats-emails", label: "Chats / Emails" },
      { id: "txn-id", label: "Transaction ID / UTR" },
      { id: "payment-receipt", label: "Payment Receipt" },
      { id: "bank-statement", label: "Bank Statement" },
      { id: "amount", label: "Amount" },
      { id: "date", label: "Date" },
      { id: "suspect-phone", label: "Phone" },
      { id: "suspect-email", label: "Email" },
      { id: "upi-id", label: "UPI ID" },
      { id: "bank-account", label: "Bank Account" },
    ],
  },
];
