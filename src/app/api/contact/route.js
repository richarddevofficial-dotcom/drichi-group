import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const messagesFile = path.join("/tmp", "messages.json");

export async function POST(request) {
  try {
    const body = await request.json();

    let messages = [];
    try {
      if (fs.existsSync(messagesFile)) {
        const data = fs.readFileSync(messagesFile, "utf8");
        messages = JSON.parse(data);
      }
    } catch (error) {
      // File doesn't exist yet
    }

    const newMessage = {
      id: Date.now().toString(),
      name: body.name,
      email: body.email,
      company: body.company || "",
      service: body.service || "",
      message: body.message,
      isRead: false,
      createdAt: new Date().toISOString(),
    };

    messages.push(newMessage);
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));

    return NextResponse.json({
      success: true,
      message: "Thank you! Your message has been sent.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to send message." },
      { status: 500 },
    );
  }
}
