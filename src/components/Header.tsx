import React from "react";
import GenreDropDown from "./GenreDropDown";
import SearchInput from "./SearchInput";
import { Play } from "lucide-react";
import NightMode from "./NightMode";
import Link from "next/link";

const header = () => {
  return (
    <nav className="w-full fixed z-50 flex flex-wrap gap-2 md:gap-0 dark:border-b dark:border-white items-center justify-between p-4 bg-mainColor">
      <Link
        href="/"
        className="logo  md:w-fit flex gap-1  text-white items-center text-xl font-bold"
      >
        <Play className="text-red-500" />
        <h1>NextubeMovie</h1>
      </Link>

      <div className="flex  items-center">
        <GenreDropDown />
        <SearchInput />
      </div>
      <div className="fixed  bottom-4 right-4 z-50">
        <NightMode />
      </div>
    </nav>
  );
};

export default header;
