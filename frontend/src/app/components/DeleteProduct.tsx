"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface DeleteUserProps {
  id: string;
}

function DeleteProducts({ id }: DeleteUserProps) {
  const router = useRouter();
  
  const handleDelete = async () => {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      const response = await fetch(`http://localhost:4000/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.refresh();
      } else {
        console.error("Failed to delete Product");
      }
    }
  };

  return (
    <a
      onClick={handleDelete}
      className="bg-red-500 text-white border py-2 px-3 rounded-md text-bold cursor-pointer"
    >
      Delete
    </a>
  );
}

export default DeleteProducts;
