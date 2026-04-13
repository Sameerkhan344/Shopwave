import Navbar from "@/components/Navbar";
import { Outlet } from "react-router";

const MainLayouts = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainLayouts;
