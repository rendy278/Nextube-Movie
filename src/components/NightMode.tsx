"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { z } from "zod";

const nightModeSchema = z.union([z.literal("true"), z.literal("false")]);

const NightMode = () => {
  const [isNightMode, setIsNightMode] = useState(false);

  useEffect(() => {
    const savedNightMode = localStorage.getItem("nightMode");
    if (savedNightMode) {
      const parsedNightMode = nightModeSchema.safeParse(savedNightMode);
      if (parsedNightMode.success) {
        const isNight = parsedNightMode.data === "true";
        setIsNightMode(isNight);
        if (isNight) {
          document.documentElement.classList.add("dark");
        }
      }
    }
  }, []);

  const toggleNightMode = () => {
    setIsNightMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("nightMode", newMode.toString());
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newMode;
    });
  };

  return (
    <div>
      <button
        className=" visible bg-red-500 font-bold text-white p-2 text-xl focus:outline-none"
        onClick={toggleNightMode}
      >
        {isNightMode ? <Moon /> : <Sun />}
      </button>
    </div>
  );
};

export default NightMode;
