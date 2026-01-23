import { NextResponse } from 'next/server';
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

export async function GET() {
    try {
        const querySnapshot = await getDocs(collection(db, "experiences"));
        const data = querySnapshot.docs.map(doc => {
            const d = doc.data();
            return {
                id: doc.id,
                ...d,
                // Firestore stores arrays and booleans natively, no need to parse if stored correctly.
                // Ensuring we handle potential migration cases or raw data correctly.
                achievements: d.achievements,
                technologies: d.technologies,
                current: d.current
            };
        });
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { company, position, location, duration, type, description, achievements, technologies, current } = await request.json();

        // Ensure arrays are arrays (if they came as strings in JSON? usually request.json() parses them)
        // If the client sends them, they are likely arrays.

        const docRef = await addDoc(collection(db, "experiences"), {
            company,
            position,
            location,
            duration,
            type,
            description,
            achievements, // Store as array
            technologies, // Store as array
            current: Boolean(current) // Store as boolean
        });
        return NextResponse.json({ id: docRef.id, success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const { id, company, position, location, duration, type, description, achievements, technologies, current } = await request.json();
        const docRef = doc(db, "experiences", id);
        await updateDoc(docRef, {
            company,
            position,
            location,
            duration,
            type,
            description,
            achievements,
            technologies,
            current: Boolean(current)
        });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        await deleteDoc(doc(db, "experiences", id));
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
