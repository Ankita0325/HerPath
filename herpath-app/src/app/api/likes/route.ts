import { NextResponse } from 'next/server';

export const runtime = 'edge';

async function getBearerToken(request: Request): Promise<string | null> {
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }
  return null;
}

export async function POST(request: Request) {
  try {
    const token = await getBearerToken(request);
    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { serviceId, action } = await request.json();

    if (!serviceId || !action) {
      return NextResponse.json({ error: 'serviceId and action are required' }, { status: 400 });
    }

    if (action !== 'like' && action !== 'unlike') {
      return NextResponse.json({ error: 'Invalid action. Use "like" or "unlike"' }, { status: 400 });
    }

    return NextResponse.json({ message: `Successfully ${action}d`, serviceId, action, liked: action === 'like' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const token = await getBearerToken(request);
    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const url = new URL(request.url);
    const serviceId = url.searchParams.get('serviceId');

    if (!serviceId) {
      return NextResponse.json({ error: 'serviceId is required' }, { status: 400 });
    }

    return NextResponse.json({ serviceId, liked: false });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
