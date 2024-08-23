'use client'
import React, { useState, FormEvent, ChangeEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function AddUsers() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 

    if (!name || !email) {
      alert("Please add a name and email");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email })
      });

      if (response.ok) {
        router.push("/manage-user");
      } else {
        console.error("Failed to add user");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="container mx-auto py-10">
      <h3 className="text-3xl font-bold">Add Users!</h3>
      <hr className="my-3" />
      <Link href="/manage-user" className="bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2">
        Go back
      </Link>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
          placeholder="Enter Name"
          value={name}
          onChange={handleNameChange}
        />
        <input
          type="email"
          className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
          placeholder="Enter Email"
          value={email}
          onChange={handleEmailChange}
        />
        <button type="submit" className="bg-green-500 text-white border py-2 px-3 rounded text-lg my-2">
          Add User
        </button>
      </form>
    </div>
  );
}

export default AddUsers;
