import { NextResponse } from 'next/server';
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret-key-change-it');

export async function POST(request: Request) {
    try {
        const { action, username, password } = await request.json();

        if (action === 'login') {
            // Priority 1: Check Environment Variables
            const envUsername = process.env.ADMIN_USERNAME;
            const envPassword = process.env.ADMIN_PASSWORD;

            if (envUsername && envPassword && username === envUsername && password === envPassword) {
                // Create JWT for Env Admin
                const token = await new SignJWT({ sub: 'admin-env', username: envUsername })
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

                return NextResponse.json({ success: true });
            }

            // Priority 2: Check Firestore (Fallback)
            try {
                const adminsRef = collection(db, "admins");
                const q = query(adminsRef, where("username", "==", username), where("password", "==", password));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0];
                    const userData = userDoc.data();

                    // Create JWT
                    const token = await new SignJWT({ sub: userDoc.id, username: userData.username })
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

                    return NextResponse.json({ success: true });
                } else {
                    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
                }
            } catch (dbError) {
                console.error(dbError);
                return NextResponse.json({ error: "Database error" }, { status: 500 });
            }

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
