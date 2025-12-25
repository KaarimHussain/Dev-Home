import { NextResponse } from 'next/server';
import { db } from "../database";

export async function GET() {
    return new Promise((resolve) => {
        db.all("SELECT * FROM experiences", (err, rows: any[]) => {
            if (err) {
                resolve(NextResponse.json({ error: err.message }, { status: 500 }));
            } else {
                const parsedRows = rows.map(row => ({
                    ...row,
                    achievements: JSON.parse(row.achievements),
                    technologies: JSON.parse(row.technologies),
                    current: Boolean(row.current)
                }));
                resolve(NextResponse.json(parsedRows));
            }
        });
    });
}

export async function POST(request: Request) {
    try {
        const { company, position, location, duration, type, description, achievements, technologies, current } = await request.json();
        return new Promise((resolve) => {
            const stmt = db.prepare("INSERT INTO experiences (company, position, location, duration, type, description, achievements, technologies, current) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
            stmt.run(
                company,
                position,
                location,
                duration,
                type,
                description,
                JSON.stringify(achievements),
                JSON.stringify(technologies),
                current ? 1 : 0,
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
        const { id, company, position, location, duration, type, description, achievements, technologies, current } = await request.json();
        return new Promise((resolve) => {
            const stmt = db.prepare("UPDATE experiences SET company = ?, position = ?, location = ?, duration = ?, type = ?, description = ?, achievements = ?, technologies = ?, current = ? WHERE id = ?");
            stmt.run(
                company,
                position,
                location,
                duration,
                type,
                description,
                JSON.stringify(achievements),
                JSON.stringify(technologies),
                current ? 1 : 0,
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
        return new Promise((resolve) => {
            const stmt = db.prepare("DELETE FROM experiences WHERE id = ?");
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
