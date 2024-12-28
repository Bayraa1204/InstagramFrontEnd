"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import HomeAndSearchFooter from "@/custom-components/HomeAndSearchFooter";
import { AtSign, Grid3x3 } from "lucide-react";
import { use, useEffect, useState } from "react";
import { userType } from "../../page";
import Link from "next/link";
import FollowButton from "@/custom-components/HandleFollowButton";

const Page = ({ params }: { params: Promise<{ userId: string }> }) => {
  const { userId } = use(params);
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
  return (
    <Card className="border-none rounded-none bg-black relative h-screen">
      <CardHeader className="gap-4 p-4 ">
        <CardTitle className="flex gap-5">
          <Avatar className="w-[77px] h-[77px] bg-cover">
            <AvatarImage
              src={
                userData?.profileImg ??
                `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`
              }
            />
          </Avatar>
          <div
            className="flex-col w-full"
            style={{ alignContent: "space-around" }}
          >
            <div className="text-left text-[20px] text-white mb-4">
              {userData?.username}
            </div>
            <FollowButton userId={userData?._id ?? ""} />
          </div>
        </CardTitle>
        <CardDescription className="text-left text-white font-bold flex-col">
          <div>{userData?.email.split("@")[0]}</div>
          <div className="flex items-center h-[26px] bg-neutral-700 rounded-xl w-fit p-2 text-[12px] gap-1 mt-2 mb-2">
            <AtSign className="h-[17px] w-[17px]" />
            {userData?.username}
          </div>
          <div>{userData?.bio}</div>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="border-t-neutral-700 border-t-[1px] text-gray-400 flex text-[14px] pb-3 pt-3">
          <div className="flex-col w-[33%] text-center">
            <p className="text-white font-bold">{userData?.posts.length}</p>{" "}
            posts
          </div>
          <div className="flex-col w-[33%] text-center">
            <p className="text-white font-bold">{userData?.followers.length}</p>{" "}
            followers
          </div>
          <div className="flex-col w-[33%] text-center">
            <p className="text-white font-bold">{userData?.following.length}</p>{" "}
            following
          </div>
        </div>
        <div className="h-[44px] flex justify-center items-center text-blue-500 border-t-2">
          <Grid3x3 />
        </div>
        <div className="flex-wrap flex justify-between">
          {userData?.posts.map((post) => {
            return (
              <Link
                key={post._id}
                href={`http://localhost:3000/posts/userPosts/${post._id}`}
                className="w-[127px] h-[127px] mb-1"
              >
                <img className="w-full h-full" src={post.postImg} />
              </Link>
            );
          })}
        </div>
      </CardContent>
      <HomeAndSearchFooter />
    </Card>
  );
};
export default Page;
