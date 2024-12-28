"use client";

import { userType } from "@/app/posts/page";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const FollowButton = ({ userId }: { userId: string }) => {
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const [userData, setUserData] = useState<userType>();
  const getUserData = async () => {
    const token = localStorage.getItem("accessToken");
    const dataJson = await fetch(
      `https://instagram-1-5x7q.onrender.com/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await dataJson.json();
    await setUserData(data);
  };
  useEffect(() => {
    getUserData();
  }, []);
  const CheckIfFollowed = async () => {
    await userData?.followers.map((followedUser) => {
      followedUser == userData._id &&
        setIsFollowed(true) &&
        console.log("followed");
    });
  };
  const HandleFollowUser = async () => {
    const token = localStorage.getItem("accessToken");
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
  }, []);
  return (
    <Button
      className={`w-full ${
        isFollowed ? "bg-blue-500" : "bg-neutral-700"
      }font-bold h-[32px]`}
      onClick={HandleFollowUser}
    >
      {isFollowed ? "Following" : "Follow"}
    </Button>
  );
};
export default FollowButton;
