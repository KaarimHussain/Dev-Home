
import { NextResponse } from 'next/server';
import { db } from "../database";

export async function GET() {
    return new Promise((resolve) => {
        db.all("SELECT * FROM tech_stack", (err, rows) => {
            if (err) {
                resolve(NextResponse.json({ error: err.message }, { status: 500 }));
            } else {
                resolve(NextResponse.json(rows));
            }
        });
    });
}

export async function POST(request: Request) {
    try {
        const { name, icon, color, category } = await request.json();
        return new Promise((resolve) => {
            const stmt = db.prepare("INSERT INTO tech_stack (name, icon, color, category) VALUES (?, ?, ?, ?)");
            stmt.run(name, icon, color, category, function (err: any) {
                if (err) {
                    resolve(NextResponse.json({ error: err.message }, { status: 500 }));
                } else {
                    // @ts-ignore
                    resolve(NextResponse.json({ id: this.lastID, success: true }));
                }
            });
            stmt.finalize();
        });
    } catch (error) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}

export async function PUT(request: Request) {
    try {
        const { id, name, icon, color, category } = await request.json();
        return new Promise((resolve) => {
            const stmt = db.prepare("UPDATE tech_stack SET name = ?, icon = ?, color = ?, category = ? WHERE id = ?");
            stmt.run(name, icon, color, category, id, function (err: any) {
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

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        return new Promise((resolve) => {
            const stmt = db.prepare("DELETE FROM tech_stack WHERE id = ?");
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
