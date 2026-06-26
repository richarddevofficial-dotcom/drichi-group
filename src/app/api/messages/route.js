import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const messagesFile = path.join(process.cwd(), "src/lib/data/messages.json");

function ensureFile() {
  const dir = path.dirname(messagesFile);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(messagesFile)) {
    fs.writeFileSync(messagesFile, JSON.stringify([], null, 2));
  }
}

function readMessages() {
  ensureFile();
  const data = fs.readFileSync(messagesFile, "utf8");
  return JSON.parse(data);
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
