"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Product {
  name: string;
  price: number;
}

interface EditUserParams {
  id: string;
}

interface EditUserProps {
  params: EditUserParams;
}

function EditProducts({ params }: EditUserProps) {
  const { id } = params;
  const router = useRouter();

  const [productsData, setProductsData] = useState<Product | null>(null);

  const [newName, setNewName] = useState<string>("");
  const [newPrice, setNewPrice] = useState<string>("");

  const getProductById = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:4000/products/${id}`, {
        method: "GET",
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch the user");
      }

      const data: Product = await res.json();
      setProductsData(data);
      setNewName(data.name);
      setNewPrice(data.price.toString()); // Convert number to string
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
        getProductById(id);
    }
  }, [id]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await fetch(`http://localhost:4000/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName, price: parseFloat(newPrice) }), // Convert string to number
      });

      if (!res.ok) {
        throw new Error("Failed to update Product!");
      }
      router.refresh();
      router.push("/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container mx-auto py-10">
        <h3 className="text-3xl font-bold">Edit Products!</h3>
        <hr className="my-3" />
        <Link
          href="/products"
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
            type="number"
            className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
            placeholder={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-500 text-white border py-2 px-3 rounded text-lg my-2"
          >
            Edit Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProducts;
