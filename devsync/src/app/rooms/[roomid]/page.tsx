import { getRoom } from "@/data-access/room";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { TagsList, splitTags } from "@/components/ui/tags-list";
import { DevFinderVideo } from "./video-player";

export default async function RoomPage(props: { params: { roomid: string } }) {
  const roomId = props.params.roomid;
  const room = await getRoom(roomId);

  if (!room) {
    return <div>Room not found</div>;
  }

  const languages = room.tags
    .split(",")
    .map((tag) => tag.trim());

  const tags = splitTags(room.tags)

  return (
    <div className="grid grid-cols-4 min-h-screen">
      <div className="col-span-3 p-4 pr-2">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 min-h-screen">
        <DevFinderVideo room={room}/>
        </div>
      </div>
      
      <div className="col-span-1 pl-2 p-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4">
          
          <h1 className="text-base">{room?.name}</h1>
          <p className="text-base text-gray-600">{room?.description}</p>
          {room.githubRepo && (
            <Link
              href={room.githubRepo}
              className="flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon className="mr-2" />
              View on GitHub
            </Link>
          )}
          <h3>Tags: </h3>
          <TagsList tags={tags} />
        </div>
      </div>
    </div>
  );
}
