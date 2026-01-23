import { NextResponse } from 'next/server';
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

export async function GET() {
    try {
        const querySnapshot = await getDocs(collection(db, "tech_stack"));
        const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { name, icon, color, category } = await request.json();
        const docRef = await addDoc(collection(db, "tech_stack"), {
            name,
            icon,
            color,
            category
        });
        return NextResponse.json({ id: docRef.id, success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const { id, name, icon, color, category } = await request.json();
        const docRef = doc(db, "tech_stack", id);
        await updateDoc(docRef, {
            name,
            icon,
            color,
            category
        });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        await deleteDoc(doc(db, "tech_stack", id));
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
