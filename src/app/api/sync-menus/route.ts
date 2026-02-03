import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { getMenus } from '@/lib/menu-service';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        // revalidateTag('menus');
        const menus = await getMenus();

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

export async function GET(request: Request) {
    // Valid for Cron Jobs
    try {
        // revalidateTag('menus');
        const menus = await getMenus();

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
