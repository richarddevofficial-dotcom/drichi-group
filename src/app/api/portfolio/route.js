import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Use /tmp for Vercel compatibility
const dataFilePath = path.join("/tmp", "portfolio.json");

function readPortfolioData() {
  try {
    if (fs.existsSync(dataFilePath)) {
      const data = fs.readFileSync(dataFilePath, "utf8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading:", error);
  }
  return [];
}

function writePortfolioData(items) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(items, null, 2));
  } catch (error) {
    console.error("Error writing:", error);
  }
}

// GET - Fetch all portfolio items
export async function GET() {
  try {
    const items = readPortfolioData();
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// POST - Add new portfolio item
export async function POST(request) {
  try {
    const body = await request.json();
    const items = readPortfolioData();

    const newItem = {
      id: `project-${Date.now()}`,
      title: body.title || "",
      slug: (body.title || "")
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),
      description: body.description || "",
      client: body.client || "",
      category: body.category || "",
      tags: body.tags || [],
      image: body.image || "/images/portfolio/placeholder.jpg",
      url: body.url || "#",
    };

    items.push(newItem);
    writePortfolioData(items);

    return NextResponse.json({ success: true, data: newItem });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// PUT - Update portfolio item
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    const items = readPortfolioData();

    const index = items.findIndex((item) => item.id === id);
    if (index === -1) {
      return NextResponse.json(
        { success: false, error: "Item not found" },
        { status: 404 },
      );
    }

    items[index] = { ...items[index], ...updates };
    writePortfolioData(items);

    return NextResponse.json({ success: true, data: items[index] });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// DELETE - Remove portfolio item
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const items = readPortfolioData();

    const filteredItems = items.filter((item) => item.id !== id);
    writePortfolioData(filteredItems);

    return NextResponse.json({ success: true, message: "Item deleted" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
