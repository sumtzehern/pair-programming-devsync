import { getRoom } from "@/data-access/room";
import { EditRoomForm } from "./edit-room-form";
import { unstable_noStore } from "next/cache";

export default async function EditRoomPage({
  params,
}: {
  params: { roomid: string };
}) {
  // Log to ensure params is received correctly
  console.log("Received params:", params);

  if (!params.roomid) {
    return <div>Invalid parameters</div>;
  }

  unstable_noStore();
  const room = await getRoom(params.roomid);

  // Log to ensure room is fetched correctly
  console.log("Fetched room:", room);

  if (!room) {
    return <div>Room not found</div>;
  }

  return (
    <div className="container mx-auto flex flex-col gap-8 pt-12 pb-24">
      <h1 className="text-4xl font-bold">Edit Room</h1>
      <EditRoomForm room={room} />
    </div>
  );
}
