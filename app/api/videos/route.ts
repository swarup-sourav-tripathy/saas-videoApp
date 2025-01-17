import { NextRequest, NextResponse } from "next/server"
import prisma from "@/prisma/lib/prisma";
import { unstable_noStore as noCache } from "next/cache";


export async function GET(request: NextRequest) {
    try {
       noCache()
        const videos = await prisma.video.findMany({
            orderBy: { createdAt: "desc" }
        })
        console.log(videos, "test");

        const headers = new Headers();
        headers.set("Cache-Control", "no-store");
        headers.set('Pragma', 'no-cache');
        headers.set('Expires', '0');
        headers.set('Vary', 'Origin');


        return NextResponse.json(videos , { headers })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Error fetching videos" }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}
