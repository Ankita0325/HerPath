import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { serviceId } = await request.json();

    if (!serviceId) {
      return NextResponse.json({ error: 'serviceId is required' }, { status: 400 });
    }

    const today = new Date().toISOString().split('T')[0];
    const storageKey = `portfolio_view_${serviceId}_${today}`;

    if (typeof window !== 'undefined') {
      const existing = localStorage.getItem(storageKey);
      if (existing) {
        return NextResponse.json({ message: 'View already recorded today', counted: false });
      }
      localStorage.setItem(storageKey, 'true');
    }

    return NextResponse.json({ message: 'View recorded', counted: true, date: today });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
