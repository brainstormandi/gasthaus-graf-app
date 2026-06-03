import { NextResponse } from 'next/server';
import { getSpeisen } from '@/lib/menu-service';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const speisen = await getSpeisen();
        return NextResponse.json({ speisen });
    } catch (error) {
        console.error('API Speisen error:', error);
        return NextResponse.json({ error: 'Failed to fetch speisen' }, { status: 500 });
    }
}
