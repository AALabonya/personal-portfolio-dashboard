import { Outlet } from "react-router-dom";
import DashboardHeader from "../adminDash/DashboardHeader";
import Sidebar from "../adminDash/DashboardSidebar";
import { useState } from "react";


const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer> */}
      <div className="w-full h-dvh flex flex-col items-start justify-start">
      <DashboardHeader isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="w-full h-[calc(100%-70px)] flex items-start justify-start">
        <Sidebar isOpen={isOpen} setIsopen={setIsOpen} />
        <div className="h-full w-full overflow-auto smoothBar lg:p-[50px] bg-[#f3f3f3]">
        <Outlet></Outlet>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MainLayout;
