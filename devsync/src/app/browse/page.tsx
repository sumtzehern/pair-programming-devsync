import { Button } from "@/components/ui/button";
import { db } from "@/db";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "@/db/schema";
import { GithubIcon } from "lucide-react";
import { getRooms } from "@/data-access/room";
import { TagsList } from "@/components/ui/tags-list";
import { SearchBar } from "./search-bar";
import { splitTags } from "@/lib/utils";
import { unstable_noStore } from "next/cache";
import Image from "next/image";

export default async function Home({searchParams}: {searchParams: {search: string}}) {
  unstable_noStore();
  const rooms = await getRooms(searchParams.search);

  function RoomCard({room}: {room: Room}) {
    return <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
      <TagsList tags={splitTags(room.tags)} />
        {
          room.githubRepo && (
            <Link href={room.githubRepo}
            className="flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon className="mr-2" />View on GitHub</Link>
          )
        }
      </CardContent>
      <CardFooter>
        <Button asChild> 
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
      </CardFooter>
    </Card>;
  }

  return (
    <main className=" min-h-screen p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Find Development Room</h1>
        <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>
      
      <div className="mb-10">
      <SearchBar />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => {
            return <RoomCard key={room.id} room={room} />
        })}
      </div>
      
      {rooms.length === 0 && (
        <div className="flex flex-col gap-4 justify-center items-center mt-24">
          <Image
            src="/no-data.svg"
            width="200"
            height="200"
            alt="no data image"
          />

          <h2 className="text-2xl">No Rooms Yet!</h2>

          <Button asChild>
            <Link href="/create-room">Create Room</Link>
          </Button>
        </div>
      )}
      
    </main>
  );
}
