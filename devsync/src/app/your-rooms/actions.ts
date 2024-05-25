'use server';

import { deletRoom, getRoom } from "@/data-access/room";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function deleteRoomAction(roomId: string) {
    //auth
    const session = await getSession();
    if (!session) {
      throw new Error("User not authenticated");
    }

    // user created room
    const room = await getRoom(roomId);
    if (!room) {
        throw new Error("Room not found");
    }
    await deletRoom(roomId);

    revalidatePath ("/your-rooms");
}