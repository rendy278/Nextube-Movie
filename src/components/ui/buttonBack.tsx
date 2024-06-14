"use client";
import React from "react";
import { useRouter } from "next/navigation";

const ButtonBack: React.FC = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleGoBack}
      className="bg-red-500 mt-3 w-40 hover:bg-red-700 border border-gray-700 text-white font-bold py-2 px-4 rounded"
    >
      Back
    </button>
  );
};

export default ButtonBack;
