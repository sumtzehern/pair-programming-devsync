"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link"; // Import Link component from next/link
import Image from "next/image"; // Import Image component from next/image
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function AccountDropdown() {
    const session = useSession();
    const isLoggedIn = !!session.data;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"outline"}>
                    <Avatar className="mr-2 h-8 w-8">
                        <AvatarImage src={session.data?.user?.image ?? ""} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    {session.data?.user?.name}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuSeparator />
                { (
                    <DropdownMenuItem onClick={() => signOut({
                        callbackUrl: "/",
                    })}>
                        <LogOutIcon className="mr-2" />
                        Sign Out
                    </DropdownMenuItem>
                ) }
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export function Header() {
    const session = useSession();

    return (
        <header className="bg-gray-100 py-3 dark:bg-gray-800 container mx-auto">
            <div className="flex justify-between items-center">
                <Link href="/" className="flex gap-2 items-center text-xl hover:text-blue-500">
                    <Image 
                        src="/logo.png"
                        alt="logo"
                        width={50}
                        height={50}
                        className="rounded-lg"
                    />
                    <span className="font-bold">
                        <span className="text-blue-400">D</span>
                        <span className="text-green-400">e</span>
                        <span className="text-red-400">v</span>
                        <span className="text-yellow-400">S</span>
                        <span className="text-blue-400">y</span>
                        <span className="text-green-400">n</span>
                        <span className="text-red-400">c</span>
                    </span>
                </Link>

                <nav>
                    <Link href="/your-rooms" className="hover:text-blue-500">
                        Your Rooms
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    {
                        session.data && <AccountDropdown />
                    }
                    {
                        !session.data && <Button onClick={() => signIn()}>Log In</Button>
                    }
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
}
