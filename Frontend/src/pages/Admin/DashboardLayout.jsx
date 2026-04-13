import React, { useEffect, useState } from "react";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SiteHeader } from "@/components/ui/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/features/auth/authSlice";
import { toast } from "react-toastify";

// import data from "./data.json"

const DashboardLayout = () => {
    const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const  user  = useSelector((state) => state.auth.user?.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      setMessage("You are not loggedIn, Redirecting to the login Page");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } else if (user.role !== 1) {
      setMessage("You are not authorized to access this resource, Redirecting to the Home Page");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);
  const logoutHandler = async () => {
    dispatch(logout())
     .unwrap()
          .then((response) => {
            console.log(response);
            if (response?.success === true) {
              
              toast.success(response?.message, { autoClose: 2000 });
              setTimeout(() => {
                navigate("/");
              }, 2000);
            } else {
              toast.error(response?.message, { autoClose: 2000 });
            }
          })
          .catch((error) => {
            toast.error(error, { autoClose: 2000 });
          });
  };
  if (message) {
    return (
    <div className="h-screen flex justify-center items-center">
      <div className="text-center">
      <p className="text-3xl">{message}</p>
      </div>
    </div>
    )
  }

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <AppSidebar variant="inset" logoutHandler={logoutHandler}/>
      <SidebarInset>
        <SiteHeader />
        <main className="flex flex-1 flex-col p-2">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
export default DashboardLayout;
