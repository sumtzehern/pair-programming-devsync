'use server';

import { Room, room } from "@/db/schema";
import { db } from "@/db";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createRoomAction(roomData: Omit<Room, "id" | "userId">){
    const session = await getSession();
    console.log(session);
    if (!session) {
        throw new Error("Not logged in");
    }
    await db.insert(room).values({...roomData, userId: session.user.id });

    revalidatePath("/"); // revalidate the homepage
}