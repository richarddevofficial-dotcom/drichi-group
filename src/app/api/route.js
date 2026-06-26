import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src/lib/data/portfolio.js");

// Helper to read current portfolio data
function readPortfolioData() {
  const fileContent = fs.readFileSync(dataFilePath, "utf8");
  // Extract the array from the export
  const match = fileContent.match(
    /export const portfolioItems = (\[[\s\S]*?\]);/,
  );
  if (match) {
    return eval(match[1]);
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
  try {
    const body = await request.json();
    const items = readPortfolioData();

    const newItem = {
      id: `project-${Date.now()}`,
      ...body,
      slug: body.title.toLowerCase().replace(/\s+/g, "-"),
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
