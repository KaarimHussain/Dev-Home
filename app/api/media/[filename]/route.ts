import { NextResponse } from "next/server";
import { unlink } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ filename: string }> }
) {
    try {
        const { filename } = await params;

        if (!filename) {
            return NextResponse.json({ error: "Filename is required" }, { status: 400 });
        }

        // Safety check: ensure filename doesn't contain traversal characters
        if (filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
            return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
        }

        const filepath = join(process.cwd(), "public", "uploads", filename);

        if (existsSync(filepath)) {
            await unlink(filepath);
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: "File not found" }, { status: 404 });
        }
    } catch (error) {
        console.error("Error deleting file:", error);
        return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }
}
