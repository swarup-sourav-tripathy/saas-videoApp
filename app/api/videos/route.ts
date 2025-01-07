import { NextRequest, NextResponse } from "next/server"
import prisma from "@/prisma/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        
        const videos = await prisma.video.findMany({
            orderBy: { createdAt: "desc" }
        })
        console.log(videos, "test");

        const headers = new Headers();
        headers.set("Cache-Control", "no-store");

        return NextResponse.json(videos, { headers })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Error fetching videos" }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}
