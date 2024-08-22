"use client";

import React, { useEffect,useState } from "react";
import Link from "next/link";
import api from "../utils/api";

function ManageUser() {
  const [user, setUserData] = useState('[]');

  console.log(user);
  const getUser = async () => {
    try {
      const response = await fetch("http://localhost:4000/users", {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch User");
      }

      const UserData = await response.json();
      setUserData(UserData)

    } catch (error) {
      console.log(error);
    }
  };

useEffect(()=> {
    getUser();
},[])
  return (
    <>
      <Link
        href="/"
        className="bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2 my-10 mx-8"
      >
        Go back
      </Link>

      <hr className="my-3" />

      <div className="shadow-xl border-2 m-20 rounded-xl">
        <div className="bg-blue-300 py-3 rounded-t-xl font-bold">
          <div className="mx-5 text-xl">User Management</div>
        </div>

        <div className="pt-10">
          <input
            className=" border-2 border-gray-300 rounded-md p-3 ml-10  focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            type="search"
            placeholder="Search Users"
          />
          <button className="bg-green-500 inline-block text-white border py-2 px-3 rounded my-2 my-10 ml-2 mr-5 hover:bg-green-600 transition duration-300 ease-in-out">Search</button>
          <Link href="/manage-user/adduser">
            <button className="bg-green-500 inline-block text-white border py-2 px-3 rounded my-2 my-10 mx-5 hover:bg-green-600 transition duration-300 ease-in-out">
              Add New User
            </button>
          </Link>
        </div>
        <div  className="m-10">
        <ul className="grid grid-cols-7 bg-blue-300 p-2 rounded font-bold">
                <li>ID</li>
                <li>Name</li>
                <li>Email</li>
              </ul>

        {Array.isArray(user) && user.length > 0 ? (
          user.map((val) => (
            <div key={val.id}>
              <ul className="grid grid-cols-7">
                <li>{val.id}</li>
                <li>{val.name}</li>
                <li>{val.email}</li>
                <Link href={`/more/${val.id}`}>
                  <li>More</li>
                </Link>
                <Link
                  className="bg-gray-500 text-white border px-3 rounded-md text-lg"
                  href={`/edit`}
                >
                  <li>Edit</li>
                </Link>
                <Link
                  className="bg-red-500 text-white border px-3 rounded-md text-lg"
                  href={`/delete`}
                >
                  <li>Delete</li>
                </Link>
              </ul>
            </div>
          ))
        ) : (
          <p className="bg-gray-300 p-3 my-3">No have any users!</p>
        )}
        </div>
      </div>
    </>
  );
}

export default ManageUser;
