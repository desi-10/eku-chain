"use client";
import { Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";

const DashboardHeader = () => {
  const session = useSession();
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 ">
      <div className="w-full">
        <form>
          <div className="flex items-center w-96 border bg-white rounded-lg px-3">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="search"
              placeholder="Search products..."
              className="border-0 bg-none outline-none p-1.5"
            />
          </div>
        </form>
        {/* <DashboardSheet /> */}
      </div>
      {session.data?.user && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center space-x-3 border p-1 rounded-full bg-emerald-500 text-white">
              <Avatar>
                <AvatarImage
                  src={
                    "https://agriguru.pythonanywhere.com/" +
                      session?.data.user?.profile_picture || ""
                  }
                />
                <AvatarFallback className="uppercase">
                  {/* {getUserInitials(user?.name)} */}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center space-x-1 capitalize pr-4">
                <p>{session?.data?.user?.first_name}</p>{" "}
                <p>{session?.data?.user?.last_name}</p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => signOut({ redirectTo: "/" })}
              className="cursor-pointer hover:bg-red-500 text-red-500 w-full"
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
};

export default DashboardHeader;
