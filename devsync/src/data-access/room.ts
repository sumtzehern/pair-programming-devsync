import { db } from "@/db";
import { room } from "@/db/schema";
import { eq } from "drizzle-orm";
import { unstable_noStore } from "next/cache";
import { like } from "drizzle-orm";
import { getSession } from "@/lib/auth";


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