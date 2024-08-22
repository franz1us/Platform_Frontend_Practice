import React from "react";
import Link from "next/link";

function Nav() {
  return (
    <nav className="flex justify-between items-center shadow-lg p-10 bg-white">
      <div>
        <Link href="/">
          <p className="text-lg font-bold">M4NAGEMENT</p>
        </Link>
      </div>
      <ul className="flex space-x-4">
        <li className="relative group">
          <Link href="/manage-user" className="hover:text-blue-500 transition duration-300 ease-in-out">Manage</Link>
          <div className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
        </li>
        <li className="relative group">
          <Link href="/products" className="hover:text-green-500 transition duration-300 ease-in-out">Products</Link>
          <div className="absolute left-0 bottom-0 w-full h-0.5 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
        </li>
        <li className="relative group">
          <Link href="/orders" className="hover:text-red-500 transition duration-300 ease-in-out">Orders</Link>
          <div className="absolute left-0 bottom-0 w-full h-0.5 bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
        </li>
        <li className="relative group">
          <Link href="/chart" className="hover:text-purple-500 transition duration-300 ease-in-out">Chart</Link>
          <div className="absolute left-0 bottom-0 w-full h-0.5 bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
