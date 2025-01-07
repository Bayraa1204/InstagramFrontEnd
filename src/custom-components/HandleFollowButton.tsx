"use client";

import { userType } from "@/app/posts/page";
import { Button } from "@/components/ui/button";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
export type JwtPayLoad = {
  exp: number;
  iat: number;
  userId: string;
};

const FollowButton = ({ userData }: { userData: userType | undefined }) => {
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const decodedToken = jwtDecode<JwtPayLoad>(
    localStorage.getItem("accessToken") ?? ""
  );
  const CheckIfFollowed = async () => {
    userData?.followers?.map((followedUser) => {
      if (followedUser._id == decodedToken.userId) {
        setIsFollowed(true);
      }
    });
  };
  const HandleFollowUser = async () => {
    const token = localStorage.getItem("accessToken");
    CheckIfFollowed();
    if (!isFollowed) {
      await fetch(`https://instagram-1-5x7q.onrender.com/user/followUser`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userData?._id,
        }),
      });
      setIsFollowed(true);
    } else {
      await fetch(`https://instagram-1-5x7q.onrender.com/user/unFollowUser`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userData?._id,
        }),
      });
      setIsFollowed(false);
    }
  };
  useEffect(() => {
    CheckIfFollowed();
  }, [userData]);
  return (
    <div>
      {isFollowed ? (
        <Button
          className="w-full font-bold h-[32px] bg-blue-500"
          onClick={HandleFollowUser}
        >
          Following
        </Button>
      ) : (
        <Button
          className="w-full font-bold h-[32px] bg-neutral-700"
          onClick={HandleFollowUser}
        >
          Follow
        </Button>
      )}
    </div>
  );
};
export default FollowButton;
