import { NextResponse } from 'next/server';
import { listPublicSummary } from '../../../src/lib/markdown';

export async function GET() {
  const items = listPublicSummary();
  return NextResponse.json({ items });
}
