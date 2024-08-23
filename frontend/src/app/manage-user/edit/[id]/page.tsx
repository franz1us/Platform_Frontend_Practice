"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  name: string;
  email: string;
}

interface EditUserParams {
  id: string;
}

interface EditUserProps {
  params: EditUserParams;
}

function EditUser({ params }: EditUserProps) {
  const { id } = params;
  const router = useRouter();

  const [userData, setUserData] = useState<User | null>(null);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const getUserById = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:4000/users/${id}`, {
        method: "GET",
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch the user");
      }

      const data: User = await res.json();
      setUserData(data);
      setNewName(data.name);
      setNewEmail(data.email);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getUserById(id);
    }
  }, [id]);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await fetch(`http://localhost:4000/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName, email: newEmail }), 
      });

      if (!res.ok) {
        throw new Error("Failed to update user");
      }
      router.refresh();
      router.push("/manage-user");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container mx-auto py-10">
        <h3 className="text-3xl font-bold">Edit Users!</h3>
        <hr className="my-3" />
        <Link
          href="/manage-user"
          className="bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2"
        >
          Go back
        </Link>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
            placeholder={newName} 
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            type="email"
            className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
            placeholder={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-500 text-white border py-2 px-3 rounded text-lg my-2"
          >
            Edit User
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
