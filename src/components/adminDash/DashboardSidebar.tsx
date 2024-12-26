"use client";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { SetStateAction, useEffect } from "react";
import { Button } from "../ui/button";
import { DashboardNav } from "./DashboardNav";

import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import {  useNavigate} from "react-router-dom";
import { BsFileEarmarkPost } from "react-icons/bs";
import { CiShop, CiViewList } from "react-icons/ci";

import { GrServices } from "react-icons/gr";
import { NavItem } from "@/types/user.interface";


export const adminLinks: NavItem[] = [
  {
    href: "/dashboard",
    Icon: GrServices,
    title: "Dashboard",
  },
  {
    href: "/dashboard/manage-project",
    Icon: BsFileEarmarkPost,
    title: "Manage Project",
  },
  {
    href: "/dashboard/manage-blog",
    Icon: CiViewList,
    title: "Manage Blogs",
  },
  {
    href: "/dashboard/manage-skills",
    Icon: CiShop,
    title: "Manage Skills",
  },
  {
    href: "/dashboard/manage-experience",
    Icon: CiShop,
    title: "Manage Experience",
  },
];


type SidebarProps = {
  className?: string;
  setIsopen: React.Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
};

export default function Sidebar({
  className,
  isOpen,
  setIsopen,
}: SidebarProps) {

  const navigate = useNavigate();  // Use useNavigate instead of useNavigation
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      const screen = window.screen.width;

      if (screen > 1024) {
        return;
      }

      if (target.closest(".sidebar") || target.closest(".menuBTn")) {
        return;
      }

      setIsopen(false);
    };

    if (isOpen) {
      document.body.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.body.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.body.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, setIsopen]);

  const toggleStyle = {
    left: isOpen ? "277px" : "10px",
    rotate: isOpen ? "0deg" : "180deg",
  };

  const handleCloseBar = () => {
    const width = window.screen.width;

    width > 767 ? "" : setIsopen(false);
  };

  const handleLogout = () => {
    console.log("logout");

    dispatch(logout());
    navigate("/login");  // Correct navigation to the login page
    toast.success("Logout successful");
  };

  return (
    <aside
      style={{
        transition: "0.3s",
        width: `${isOpen ? "287px" : "0px"}`,
        display: "flex",
      }}
      className={cn(
        `md:relative fixed top-[70px] md:top-0 left-0 bg-black  h-full border-r bg-card transition-[width] duration-500 md:block
        w-72 shrink-0 overflow-hidden z-[30] sidebar flex flex-col gap-[20px] justify-between pb-[20px] bg-white md:bg-transparent`,
        className
      )}
    >
      <div className="w-full">
        <ArrowLeft
          className={cn(
            "fixed z-20 top-[18%] cursor-pointer rounded-full border bg-background text-3xl text-foreground md:flex hidden bg-primary text-white"
          )}
          style={{
            transition: "0.3s",
            ...toggleStyle,
          }}
          onClick={() => setIsopen(!isOpen)}
        />

        <div className="space-y-4 lg:py-4">
          <div className="px-3 py-2">
            <div className="mt-3 space-y-1" onClick={handleCloseBar}>
              <DashboardNav navLinks={adminLinks} />
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={handleLogout}
        className="w-[90%] mx-auto hover:bg-gray-900"
      >
        Logout
      </Button>
    </aside>
  );
}