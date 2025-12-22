import { NextResponse } from 'next/server';
import { db } from "../database";
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret-key-change-it');

export async function POST(request: Request) {
    try {
        const { action, username, password } = await request.json();

        if (action === 'login') {
            return new Promise((resolve) => {
                db.get("SELECT * FROM admins WHERE username = ? AND password = ?", [username, password], async (err, row: any) => {
                    if (err) {
                        resolve(NextResponse.json({ error: "Database error" }, { status: 500 }));
                        return;
                    }

                    if (row) {
                        // Create JWT
                        const token = await new SignJWT({ sub: row.id, username: row.username })
                            .setProtectedHeader({ alg: 'HS256' })
                            .setExpirationTime('24h')
                            .sign(SECRET_KEY);

                        // Set Cookie
                        const cookieStore = await cookies();
                        cookieStore.set('auth_token', token, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === 'production',
                            maxAge: 60 * 60 * 24, // 24 hours
                            path: '/',
                        });

                        resolve(NextResponse.json({ success: true }));
                    } else {
                        resolve(NextResponse.json({ error: "Invalid credentials" }, { status: 401 }));
                    }
                });
            });
        } else if (action === 'logout') {
            const cookieStore = await cookies();
            cookieStore.delete('auth_token');
            return NextResponse.json({ success: true });
        } else if (action === 'check') {
            const cookieStore = await cookies();
            const token = cookieStore.get('auth_token');

            if (!token) {
                return NextResponse.json({ authenticated: false }, { status: 401 });
            }

            try {
                // Verify logic could go here or rely on middleware
                return NextResponse.json({ authenticated: true });
            } catch (e) {
                return NextResponse.json({ authenticated: false }, { status: 401 });
            }
        }

        return NextResponse.json({ error: "Invalid action" }, { status: 400 });

    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
