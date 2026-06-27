import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const messagesFile = path.join("/tmp", "messages.json");

function readMessages() {
  try {
    if (fs.existsSync(messagesFile)) {
      const data = fs.readFileSync(messagesFile, "utf8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading messages:", error);
  }
  return [];
}

function writeMessages(messages) {
  try {
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
  } catch (error) {
    console.error("Error writing messages:", error);
  }
}

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
