import { NextResponse } from "next/server";
import { readdir, writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export const dynamic = 'force-dynamic';

export async function GET() {
    const uploadDir = join(process.cwd(), "public", "uploads");

    try {
        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true });
        }

        const files = await readdir(uploadDir);

        // Filter for images/files only, ignore system files like .DS_Store
        const validFiles = files.filter(file => !file.startsWith('.'));

        const fileList = validFiles.map((file) => ({
            name: file,
            url: `/uploads/${file}`,
            path: `/uploads/${file}`, // Duplicate for consistency
        }));

        return NextResponse.json(fileList);
    } catch (error) {
        console.error("Error listing files:", error);
        return NextResponse.json({ error: "Failed to list files" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Sanitize filename to prevent directory traversal
        const filename = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        // Ensure unique name if needed, or simple overwrite. Let's keep it simple: timestamp prefix
        const uniqueFilename = `${Date.now()}-${filename}`;

        const uploadDir = join(process.cwd(), "public", "uploads");
        const filepath = join(uploadDir, uniqueFilename);

        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true });
        }

        await writeFile(filepath, buffer);

        return NextResponse.json({
            success: true,
            url: `/uploads/${uniqueFilename}`,
            name: uniqueFilename
        });
    } catch (error) {
        console.error("Error uploading file:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
