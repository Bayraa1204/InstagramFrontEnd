"use client";

import { useEffect } from "react";

export default function Home() {
  const isLoggedIn = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      window.location.href = "/posts";
    } else {
      window.location.href = "/login";
    }
  };
  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <div className=" bg-black w-screen h-screen tect-white text-[21px] text-center text-white items-center">
      Wait a sec..
    </div>                  
  );
}
