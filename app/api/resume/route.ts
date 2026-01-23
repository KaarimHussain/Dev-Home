import { NextResponse } from 'next/server';
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Using a fixed ID for the singleton resume configuration
const RESUME_DOC_ID = 'current_resume';

export async function GET() {
    try {
        const docRef = doc(db, "resume", RESUME_DOC_ID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return NextResponse.json({ id: docSnap.id, ...docSnap.data() });
        } else {
            return NextResponse.json({});
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { url, label } = await request.json();

        // This acts as both insert and update for the singleton
        await setDoc(doc(db, "resume", RESUME_DOC_ID), {
            url,
            label: label || 'Resume'
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
