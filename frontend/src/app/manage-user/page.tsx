"use client";

import React, { useEffect, useState, Fragment } from "react";
import Link from "next/link";
import AddUserModal from "../components/AddUserModal";
import DeleteUser from "../components/DeleteUser";

interface DeleteUserProps {
  id: string;
}

function ManageUser() {
  const [user, setUserData] = useState<any[]>([]);
  const [showAddUser, setShowAddUser] = useState<boolean>(false);

  // Function to fetch user data
  const getUser = async () => {
  try {
    const response = await fetch("http://localhost:4000/users", {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const userData = await response.json();

    if (Array.isArray(userData)) {
      setUserData(userData);
    } else {
      console.error("Expected an array, but received:", userData);
      setUserData([]);
    }
  } catch (error) {
    console.error(error);
  }
};


  useEffect(() => {
    getUser();
    const intervalId = setInterval(() => {
      getUser();
    }, 1000);
  
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  

  return (
    <>
      <Fragment>
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
              className="border-2 border-gray-300 rounded-md p-3 ml-10 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              type="search"
              placeholder="Search Users"
            />
            <button className="bg-green-500 inline-block text-white border py-2 px-3 rounded my-2 my-10 ml-2 mr-5 hover:bg-green-600 transition duration-300 ease-in-out">
              Search
            </button>
            <button
              className="bg-green-500 inline-block text-white border py-2 px-3 rounded my-2 my-10 mx-5 hover:bg-green-600 transition duration-300 ease-in-out"
              onClick={() => setShowAddUser(true)}
            >
              Add New User
            </button>
          </div>
          <div className="m-10">
            <ul className="grid grid-cols-7 bg-blue-300 p-2 rounded font-bold">
              <li>ID</li>
              <li>Name</li>
              <li>Email</li>
            </ul>

            {user.length > 0 ? (
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
                      href={`/manage-user/edit/${val.id}`}
                    >
                      <li>Edit</li>
                    </Link>
                    <DeleteUser id={val.id}/>
                  </ul>
                </div>
              ))
            ) : (
              <p className="bg-gray-300 p-3 my-3">No users available!</p>
            )}
          </div>
        </div>
        <AddUserModal
          isVisible={showAddUser}
          onClose={() => setShowAddUser(false)}
        />
      </Fragment>
    </>
  );
}

export default ManageUser;
