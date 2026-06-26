import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const messagesFile = path.join(process.cwd(), "src/lib/data/messages.json");

// Ensure messages file exists
function ensureFile() {
  if (!fs.existsSync(messagesFile)) {
    fs.writeFileSync(messagesFile, JSON.stringify([], null, 2));
  }
}

// Read messages
function readMessages() {
  ensureFile();
  const data = fs.readFileSync(messagesFile, "utf8");
  return JSON.parse(data);
}

// Write messages
function writeMessages(messages) {
  fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
}

// GET - Fetch all messages
export async function GET() {
  try {
    const messages = readMessages();
    return NextResponse.json({ success: true, data: messages.reverse() });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// POST - Save new message
export async function POST(request) {
  try {
    const body = await request.json();
    const messages = readMessages();

    const newMessage = {
      id: Date.now().toString(),
      ...body,
      isRead: false,
      createdAt: new Date().toISOString(),
    };

    messages.push(newMessage);
    writeMessages(messages);

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
