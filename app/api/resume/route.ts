
import { NextResponse } from 'next/server';
import { db } from "../database";

export async function GET() {
    return new Promise<NextResponse>((resolve) => {
        // Fetch the first resume entry. In a real app allowing multiple, this would be different.
        // For now, we assume one active resume or we take the latest.
        db.get("SELECT * FROM resume ORDER BY id DESC LIMIT 1", (err, row) => {
            if (err) {
                // return empty if query fail is better than error for optional resume
                resolve(NextResponse.json({}));
            } else {
                resolve(NextResponse.json(row || {}));
            }
        });
    });
}

// Update (Since we treat it as a singleton config, we can use PUT or POST to update/insert)
export async function POST(request: Request) {
    try {
        const { url, label } = await request.json();
        return new Promise<NextResponse>((resolve) => {
            // First check if a row exists
            db.get("SELECT count(*) as count FROM resume", (err, row: any) => {
                if (row && row.count > 0) {
                    // Update existing
                    const stmt = db.prepare("UPDATE resume SET url = ?, label = ? WHERE id = (SELECT id FROM resume ORDER BY id DESC LIMIT 1)");
                    stmt.run(url, label || 'Resume', function (err: any) {
                        if (err) resolve(NextResponse.json({ error: err.message }, { status: 500 }));
                        else resolve(NextResponse.json({ success: true }));
                    });
                    stmt.finalize();
                } else {
                    // Insert new
                    const stmt = db.prepare("INSERT INTO resume (url, label) VALUES (?, ?)");
                    stmt.run(url, label || 'Resume', function (err: any) {
                        if (err) resolve(NextResponse.json({ error: err.message }, { status: 500 }));
                        else resolve(NextResponse.json({ success: true }));
                    });
                    stmt.finalize();
                }
            });
        });
    } catch (error) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}
