import { CircleUser, Menu, Package2 } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/features/auth/authSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user?.user);
  const cartItems = useSelector((state)=> state.cart.items)
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
  return (
    <>
      <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
        <nav className="md:flex hidden flex-col gap-6 text-lg font-medium md:flex-row md:items-center md-gap-5 md:text-sm lg:gap-6">
          <Link
            to={"/"}
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="relative text-xl">ShopWaves</span>
          </Link>
          <Link
            to={"/"}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link
            to={"/shop"}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Shop
          </Link>
          <Link
            to={"/about"}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
          <Link
            to={"/contact"}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Contact
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              {/* <span className="sr-only">Toggle navigation menu</span> */}
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium p-4">
              <Link
                to={"/"}
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="relative">ShopWaves</span>
              </Link>

              <Link
                to={"/"}
                className="text-muted-foreground hover:text-foreground"
              >
                Home
              </Link>
              <Link
                to={"/shop"}
                className="text-muted-foreground hover:text-foreground"
              >
                Shop
              </Link>
              <Link
                to={"/about"}
                className="text-muted-foreground hover:text-foreground"
              >
                About
              </Link>
              <Link
                to={"/contact"}
                className="text-muted-foreground hover:text-foreground"
              >
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="ml-auto sm:flex-initial">
            <Link to={"/cart"} className="relative">Cart ({cartItems.length})</Link>
          </div>
          {user == null ? (
            <>
              <Link to={"/login"}>
                <Button>Login</Button>
              </Link>
              <Link to={"/register"}>
                <Button>Register</Button>
              </Link>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <CircleUser className="h-5 w-5" />
                  {/* <span className="sr-only">Toggle user menu</span> */}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user.role === 1 ? (
                  <Link to={"/admin"}>
                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  </Link>
                ) : (
                  <Link to={"/profile"}>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </Link>
                )}
                <DropdownMenuItem>Setting</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span onClick={logoutHandler}>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
