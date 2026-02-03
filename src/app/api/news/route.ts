import { NextResponse } from 'next/server';
import { getNews } from '@/lib/menu-service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const news = await getNews();
        return NextResponse.json({ news });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
    }
}
