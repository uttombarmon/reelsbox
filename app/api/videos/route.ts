/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/videos/route.ts (or pages/api/videos.ts if you're mixing App and Pages Router)

import { authOptions } from "@/lib/auth"; // Assuming this path is correct for your Next-Auth configuration
import { dbConnect } from "@/lib/db"; // Assuming this path is correct for your MongoDB connection
import Video from "@/models/Video"; // Assuming this path is correct for your Mongoose Video model
import { VideoInterface } from "@/types/VTypes"; // Assuming this path is correct for your VideoInterface type
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const DEFAULT_LIMIT = 10;

export async function GET(req: NextRequest) {
  try {
    console.log("Processing GET request for videos...");
    await dbConnect(); // Ensure database connection is established

    // Access query parameters using req.nextUrl.searchParams
    const category = req.nextUrl.searchParams.get("category");
    const skipParam = req.nextUrl.searchParams.get("skip");
    const limitParam = req.nextUrl.searchParams.get("limit");

    // Parse skip and limit parameters to integers, with fallbacks
    const skip = parseInt(skipParam || "0", 10);
    const limit = parseInt(limitParam || DEFAULT_LIMIT.toString(), 10);

    // Build the query object based on provided parameters
    const query: Record<string, unknown> = {};
    if (category) {
      query.category = category;
    }

    // Get the total count of documents matching the query
    const totalCount = await Video.countDocuments(query);

    // Fetch videos with sorting, limit, and skip for pagination
    const videos = await Video.find(query)
      .sort({ createdAt: -1 }) // Assuming 'createdAt' is the field for creation date
      .limit(limit)
      .skip(skip);

    // Calculate if there are more videos to fetch
    const hasMore = skip + videos.length < totalCount;

    // Return the videos along with pagination metadata
    return NextResponse.json(
      {
        videos: videos,
        pagination: {
          totalCount,
          currentPageItems: videos.length,
          limit,
          skip,
          hasMore,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    // Use 'any' for error type if not strictly typed
    console.error("Error fetching videos:", error);
    return NextResponse.json(
      { error: "Failed to fetch videos", details: error.message },
      { status: 500 } // 500 for internal server errors
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Authenticate the session using Next-Auth
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      // Ensure user and user.id exist
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect(); // Ensure database connection is established

    // Parse the request body as JSON
    const body: VideoInterface = await request.json();

    // Validate required fields
    if (!body.title || !body.description || !body.url || !body.thumbnail) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: title, description, url, or thumbnail",
        },
        { status: 400 } // 400 for bad request (missing data)
      );
    }

    // Construct video data, including userId from the session
    const videoData = {
      ...body,
      userId: session.user.id, // Assign the authenticated user's ID
      control: true, // Default 'control' to true if not provided
      transformation: {
        height: body.transformation?.height ?? 1920,
        width: body.transformation?.width ?? 1080,
        quality: body.transformation?.quality ?? 100,
      },
      createdAt: new Date(),
    };

    // Create a new video document in the database
    const newVideo = await Video.create(videoData);

    // Return the newly created video with a 201 status code (Created)
    return NextResponse.json(newVideo, { status: 201 });
  } catch (error: any) {
    // Use 'any' for error type if not strictly typed
    console.error("Error creating video:", error);
    return NextResponse.json(
      { error: `Failed to create video`, details: error.message },
      { status: 500 } // 500 for internal server errors during creation
    );
  }
}
