import { NextResponse } from 'next/server';
import { scrapeMenus } from '@/lib/scraper';

export async function POST() {
    try {
        const menus = await scrapeMenus();
        return NextResponse.json({
            success: true,
            count: menus.length,
            menus: menus,
            lastUpdated: new Date().toISOString()
        });
    } catch (error) {
        console.error('Sync error:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to sync menus'
        }, { status: 500 });
    }
}

// GET can be used for automatic triggers or status checks
export async function GET() {
    try {
        const menus = await scrapeMenus();
        return NextResponse.json({
            success: true,
            count: menus.length,
            menus: menus,
            lastUpdated: new Date().toISOString()
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: 'Failed to sync menus'
        }, { status: 500 });
    }
}
