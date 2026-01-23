import { NextResponse } from 'next/server';
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

export async function GET() {
    try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const data = querySnapshot.docs.map(doc => {
            const d = doc.data();
            return {
                id: doc.id,
                ...d,
                // Firestore stores arrays and booleans natively
                tags: d.tags,
                tech: d.tech,
                images: d.images,
                favourite: d.favourite
            };
        });
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { title, description, category, type, tags, tech, favourite, images } = await request.json();

        const docRef = await addDoc(collection(db, "projects"), {
            title,
            description,
            category,
            type,
            tags, // Array
            tech, // Array
            favourite: Boolean(favourite), // Boolean
            images // Array
        });
        return NextResponse.json({ id: docRef.id, success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const { id, title, description, category, type, tags, tech, favourite, images } = await request.json();
        const docRef = doc(db, "projects", id);
        await updateDoc(docRef, {
            title,
            description,
            category,
            type,
            tags,
            tech,
            favourite: Boolean(favourite),
            images
        });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        await deleteDoc(doc(db, "projects", id));
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
