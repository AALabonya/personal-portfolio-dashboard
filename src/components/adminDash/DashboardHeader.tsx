
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


import React, { SetStateAction } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";

export interface ISideBarState {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}
const DashboardHeader: React.FC<ISideBarState> = ({ setIsOpen ,isOpen}) => {

  return (
    <div className="w-full h-[70px] flex items-center justify-between px-[20px]  py-[10px] border-b shrink-0 ">
      <Link to="/">
       <p>Personal Dashboard</p>
      </Link>

      <Button
  className="menuBTn flex md:hidden"
  onClick={() => setIsOpen((prev) => !prev)} 
  variant={"ghost"}
>
  {isOpen ? <IoClose /> : <IoMenu />}
</Button>
      <div className="flex items-center justify-end gap-[8px]">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt="user avatar" />
              <AvatarFallback>
                <p className="text-muted-foreground uppercase">
            userData?.userData?.name
                 
                </p>
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={"/"}>Home</Link>
            </DropdownMenuItem>
           
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DashboardHeader;
