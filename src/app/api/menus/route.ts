import { NextResponse } from 'next/server';
import { getMenus } from '@/lib/menu-service';

export async function GET() {
    try {
        const menus = await getMenus();
        return NextResponse.json({ menus });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch menus' }, { status: 500 });
    }
}
