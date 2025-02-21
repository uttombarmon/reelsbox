import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: NextRequest) {
    try {

        const { name, email, password } = await req.json();
        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
        }

        await dbConnect();
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        const user = new User({ name, email, password });
        await user.save();
        return NextResponse.json({ message: "User registered successfully" }, { status: 201 });

    } catch (error) {
        console.log(error);

        return NextResponse.json({ "error": "User register failed" }, { status: 500 });
    }
}