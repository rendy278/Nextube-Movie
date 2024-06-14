import React from "react";
import Link from "next/link";
const Page = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="items-center mx-auto ">
        <div className="text-center flex text-red-500 gap-1">
          <h1 className="text-3xl font-bold">ITEMS NOT FOUND :{"("}</h1>
        </div>
        <button className="text-center w-full bg-red-500 hover:bg-red-600 transition-colors duration-300 mt-3 text-white p-2 rounded-md">
          <Link href="/">Back To Home </Link>
        </button>
      </div>
    </div>
  );
};

export default Page;
