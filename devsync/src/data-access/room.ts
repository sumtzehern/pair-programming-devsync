import { db } from "@/db";
import { Room, room } from "@/db/schema";
import { eq } from "drizzle-orm";
import { unstable_noStore } from "next/cache";
import { like } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { create } from "domain";
import { createReadStream } from "fs";


export async function getRooms(search: string | undefined) {
    const where = search ? like(room.tags, `%${search}%`) : undefined;
    const rooms = await db.query.room.findMany({
        where,
    });
    return rooms;
}

export async function getUserRooms() {
    const session = await getSession();
    if (!session) {
      throw new Error("User not authenticated");
    }
    const rooms = await db.query.room.findMany({
      where: eq(room.userId, session.user.id),
    });
  
    return rooms;
  }

export async function getRoom(roomId: string) {
    unstable_noStore();
    return await db.query.room.findFirst({ 
        where: eq(room.id, roomId) 
    });

}

export async function deletRoom(roomId: string) {
  await db.delete(room).where(eq(room.id, roomId));
}

export async function createRoom(
  roomData: Omit<Room, "id" | "userId">,
  userId: string
) {
  const inserted = await db
    .insert(room)
    .values({ ...roomData, userId })
    .returning();
  return inserted[0];
}

export async function editRoom(roomData: Room) {
  const updated = await db
    .update(room)
    .set(roomData)
    .where(eq(room.id, roomData.id))
    .returning();
  return updated[0];
}