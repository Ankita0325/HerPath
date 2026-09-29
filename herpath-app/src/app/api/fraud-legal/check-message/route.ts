// src/app/api/fraud-legal/check-message/route.ts
import { NextRequest, NextResponse } from "next/server";

const RULES: { test: RegExp; label: string }[] = [
  { test: /\b(urgent|immediately|today only|within 24 hours|blocked)\b/i,
    label: "⚠ Urgent / threatening language" },
  { test: /https?:\/\/[^\s]+/i, label: "⚠ Contains a link" },
  { test: /\b(bit\.ly|tinyurl|t\.co|shorturl)\b/i, label: "⚠ Shortened / disguised URL" },
  { test: /\b(otp|pin|cvv|password|upi pin)\b/i, label: "⚠ Requests sensitive information" },
  { test: /\b(bank|sbi|hdfc|icici|axis|rbi|income tax|police|cbi|customs)\b/i,
    label: "⚠ Mentions an authority or bank (possible impersonation)" },
  { test: /\b(kyc|verify|reactivate|suspend)\b/i, label: "⚠ KYC / verification pressure" },
  { test: /\b(lottery|prize|winner|congratulations)\b/i, label: "⚠ Prize / lottery bait" },
  { test: /\b(job|salary|registration fee|refundable deposit)\b/i, label: "⚠ Job / fee bait" },
];

export async function POST(req: NextRequest) {
  const { text } = await req.json();
  if (typeof text !== "string" || !text.trim()) {
    return NextResponse.json(
      { indicators: [], verdict: "No message provided.", nextSteps: [] },
      { status: 400 }
    );
  }

  const indicators = RULES.filter((r) => r.test.test(text)).map((r) => r.label);
  const verdict =
    indicators.length === 0
      ? "No obvious risk indicators detected — but stay cautious."
      : indicators.length >= 3
      ? "Multiple possible phishing indicators detected."
      : "Possible phishing indicators detected.";

  const nextSteps = [
    "Do not click any links in the message.",
    "Do not share OTP, PIN, password, or CVV.",
    "Verify through the official bank / company website or app.",
    "Preserve the message as evidence if you may report it later.",
  ];

  return NextResponse.json({ indicators, verdict, nextSteps });
}