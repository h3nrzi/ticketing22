import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const { cookie } = await request.json();

	// Set the session cookie
	cookies().set("session", cookie.split(";")[0].split("=")[1], {
		httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
		secure: process.env.NODE_ENV !== "test", // Only send over HTTPS in production
	});

	return NextResponse.json({ success: true });
}
