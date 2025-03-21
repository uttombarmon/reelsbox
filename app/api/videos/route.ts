import { authOptions } from "@/lib/auth"
import { dbConnect } from "@/lib/db"
import Video, { VideoInterface } from "@/models/Video"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
    try {
        console.log("Come here");
        await dbConnect()
        const videos =  await Video.find({}).sort({createdAT:-1}).lean()
        if (!videos || videos.length === 0){
            return NextResponse.json([], {status: 200})
        }
        return NextResponse.json(videos, {status: 200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: error}, {status:500})
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({error: "Unauthorized "}, { status: 401 })
        }
        await dbConnect();
        const body:VideoInterface = await request.json()
        if (
            !body.title ||
            !body.description ||
            !body.url ||
            !body.thumbnail
        ) {
            return NextResponse.json({error: "Missing required fields "}, { status: 400 })
        }
        const videoData ={
            ...body,
            control: body.control ?? true,
            transformation: {
                height: 1920,
                width: 1080,
                quality: body.transformation?.quality ?? 100
            }
        }
        const newVideo = await Video.create(videoData)
        return NextResponse.json(newVideo)
    } catch (error) {
        return NextResponse.json({error: "Failed to create video"}, { status: 201 })
    }
}
