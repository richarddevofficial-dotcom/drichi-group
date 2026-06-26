import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src/lib/data/portfolio.js");

// Simple API key check
function isAuthenticated(request) {
  const apiKey = request.headers.get("x-api-key");
  return apiKey === (process.env.ADMIN_PASSWORD || "admin123");
}

// Helper to read current portfolio data
function readPortfolioData() {
  try {
    const fileContent = fs.readFileSync(dataFilePath, "utf8");
    const match = fileContent.match(
      /export const portfolioItems = (\[[\s\S]*?\]);/,
    );
    if (match) {
      return eval(match[1]);
    }
  } catch (error) {
    console.error("Error reading portfolio:", error);
  }
  return [];
}

// Helper to write portfolio data back to file
function writePortfolioData(items) {
  const fileContent = `export const portfolioItems = ${JSON.stringify(items, null, 2)};`;
  fs.writeFileSync(dataFilePath, fileContent, "utf8");
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
  if (!isAuthenticated(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

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
  if (!isAuthenticated(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

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
  if (!isAuthenticated(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const items = readPortfolioData();

    const filteredItems = items.filter((item) => item.id !== id);

    if (filteredItems.length === items.length) {
      return NextResponse.json(
        { success: false, error: "Item not found" },
        { status: 404 },
      );
    }

    writePortfolioData(filteredItems);
    return NextResponse.json({ success: true, message: "Item deleted" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
