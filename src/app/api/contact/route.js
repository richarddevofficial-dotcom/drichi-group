import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const messagesFile = path.join(process.cwd(), "src/lib/data/messages.json");

export async function POST(request) {
  try {
    const body = await request.json();

    const dir = path.dirname(messagesFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    let messages = [];
    if (fs.existsSync(messagesFile)) {
      const data = fs.readFileSync(messagesFile, "utf8");
      messages = JSON.parse(data);
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
      message:
        "Thank you! Your message has been sent. We'll get back to you within 24 hours.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
}
