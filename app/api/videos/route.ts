import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
    try {
        const videos = await prisma.video.findMany({
            orderBy: { createdAt: "desc" }
        })
        console.log(videos, "test");

        const headers = new Headers();
        headers.set("Cache-Control", "no-store");

        return NextResponse.json(videos)
    } catch (error) {
        return NextResponse.json({ error: "Error fetching videos" }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}
