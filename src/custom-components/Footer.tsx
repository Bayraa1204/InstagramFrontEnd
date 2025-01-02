"use client"
import { jwtDecode } from "jwt-decode";
import { CircleUser, House, Search } from "lucide-react";
import Link from "next/link";
import { JwtPayLoad } from "./HandleFollowButton";

const IconFooter = () => {
  const token = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode<JwtPayLoad>(token ?? "");
  return (
    <div
      className="flex w-screen h-10 border-gray-800 fixed bottom-0 left-0"
      style={{ position: "fixed", bottom: "0" }}
    >
      <Link
        href="http://localhost:3000/posts/search"
        className=" bg-black flex justify-center h-full rounded-none"
        style={{ width: "33%" }}
      >
        <Search className="text-white h-full" />
      </Link>
      <Link
        href="http://localhost:3000/posts"
        className=" bg-black flex justify-center h-full rounded-none"
        style={{ width: "33%" }}
      >
        <House className="text-white h-full" />
      </Link>
      <Link
        href={`http://localhost:3000/profile/${decodedToken.userId}`}
        className=" bg-black flex justify-center h-full rounded-none"
        style={{ width: "33%" }}
      >
        <CircleUser className="text-white h-full" />
      </Link>
    </div>
  );
};
export default IconFooter;
