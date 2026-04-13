import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect,useState } from "react";

const Users = () => {
  const [users, setUsers]= useState({});
  const getAllUsers = async () => {
    await axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/all-users`, {
        withCredentials: true, // axios send automatically cookies when we apply this property
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setUsers(response?.data)
        console.log(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(loginData);
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg  font-semibold md:text-2xl">Users</h1>
      </div>
      <div className="h-full flex flex-col items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          {JSON.stringify(users, undefined,4)}
          {/* <h3 className="text-2xl font-bold tracking-tight">
            You have no products
          </h3>
          <p className="text-sm">produts addingggg</p>
          <Button className="mt-4">Users</Button> */}
        </div>
      </div>
    </main>
  );
};

export default Users;
