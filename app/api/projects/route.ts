
import { NextResponse } from 'next/server';
import { db } from "../database";

export async function GET() {
    return new Promise<NextResponse>((resolve) => {
        db.all("SELECT * FROM projects", (err, rows: any[]) => {
            if (err) {
                resolve(NextResponse.json({ error: err.message }, { status: 500 }));
            } else {
                const parsedRows = rows.map(row => ({
                    ...row,
                    tags: JSON.parse(row.tags),
                    tech: JSON.parse(row.tech),
                    images: JSON.parse(row.images),
                    favourite: Boolean(row.favourite)
                }));
                resolve(NextResponse.json(parsedRows));
            }
        });
    });
}

export async function POST(request: Request) {
    try {
        const { title, description, category, type, tags, tech, favourite, images } = await request.json();
        return new Promise<NextResponse>((resolve) => {
            const stmt = db.prepare("INSERT INTO projects (title, description, category, type, tags, tech, favourite, images) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            stmt.run(
                title,
                description,
                category,
                type,
                JSON.stringify(tags),
                JSON.stringify(tech),
                favourite ? 1 : 0,
                JSON.stringify(images),
                function (err: any) {
                    if (err) {
                        resolve(NextResponse.json({ error: err.message }, { status: 500 }));
                    } else {
                        // @ts-ignore
                        resolve(NextResponse.json({ id: this.lastID, success: true }));
                    }
                }
            );
            stmt.finalize();
        });
    } catch (error) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}

export async function PUT(request: Request) {
    try {
        const { id, title, description, category, type, tags, tech, favourite, images } = await request.json();
        return new Promise<NextResponse>((resolve) => {
            const stmt = db.prepare("UPDATE projects SET title = ?, description = ?, category = ?, type = ?, tags = ?, tech = ?, favourite = ?, images = ? WHERE id = ?");
            stmt.run(
                title,
                description,
                category,
                type,
                JSON.stringify(tags),
                JSON.stringify(tech),
                favourite ? 1 : 0,
                JSON.stringify(images),
                id,
                function (err: any) {
                    if (err) {
                        resolve(NextResponse.json({ error: err.message }, { status: 500 }));
                    } else {
                        resolve(NextResponse.json({ success: true }));
                    }
                }
            );
            stmt.finalize();
        });
    } catch (error) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        return new Promise<NextResponse>((resolve) => {
            const stmt = db.prepare("DELETE FROM projects WHERE id = ?");
            stmt.run(id, function (err: any) {
                if (err) {
                    resolve(NextResponse.json({ error: err.message }, { status: 500 }));
                } else {
                    resolve(NextResponse.json({ success: true }));
                }
            });
            stmt.finalize();
        });
    } catch (error) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}
