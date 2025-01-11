"use client";
import { jwtDecode } from "jwt-decode";
import { BadgePlus, CircleUser, House, Search } from "lucide-react";
import Link from "next/link";
import { JwtPayLoad } from "./HandleFollowButton";
import { useEffect, useState } from "react";

const IconFooter = () => {
  const [decodedToken, setDecodedToken] = useState<JwtPayLoad>();
  const [baseUrl, setBaseUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
    const token = localStorage.getItem("accessToken");
    if (token) {
      setDecodedToken(jwtDecode<JwtPayLoad>(token ?? ""));
    }
  }, []);
  return (
    <div
      className="flex w-screen h-10 border-gray-800 fixed bottom-0 left-0"
      style={{ position: "fixed", bottom: "0" }}
    >
      <Link
        href={`${baseUrl}/posts/uploadPost`}
        className=" bg-black flex justify-center h-full rounded-none"
        style={{ width: "25%" }}
      >
        <BadgePlus className="text-white h-full" />
      </Link>
      <Link
        href={`${baseUrl}/posts/search`}
        className=" bg-black flex justify-center h-full rounded-none"
        style={{ width: "25%" }}
      >
        <Search className="text-white h-full" />
      </Link>
      <Link
        href={`${baseUrl}/posts`}
        className=" bg-black flex justify-center h-full rounded-none"
        style={{ width: "25%" }}
      >
        <House className="text-white h-full" />
      </Link>
      <Link
        href={`${baseUrl}/profile/${decodedToken?.userId}`}
        className=" bg-black flex justify-center h-full rounded-none"
        style={{ width: "25%" }}
      >
        <CircleUser className="text-white h-full" />
      </Link>
    </div>
  );
};
export default IconFooter;
