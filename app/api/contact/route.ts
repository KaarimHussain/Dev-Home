
import { NextResponse } from 'next/server';
import { db } from "../database";

export async function GET() {
    return new Promise<NextResponse>((resolve) => {
        db.all("SELECT * FROM contact_details", (err, rows) => {
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
        const { icon, label, value } = await request.json();
        return new Promise<NextResponse>((resolve) => {
            const stmt = db.prepare("INSERT INTO contact_details (icon, label, value) VALUES (?, ?, ?)");
            stmt.run(icon, label, value, function (err: any) {
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
        const { id, icon, label, value } = await request.json();
        return new Promise<NextResponse>((resolve) => {
            const stmt = db.prepare("UPDATE contact_details SET icon = ?, label = ?, value = ? WHERE id = ?");
            stmt.run(icon, label, value, id, function (err: any) {
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
        return new Promise<NextResponse>((resolve) => {
            const stmt = db.prepare("DELETE FROM contact_details WHERE id = ?");
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
