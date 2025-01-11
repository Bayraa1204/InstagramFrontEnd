"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AtSign, Grid3x3, Instagram } from "lucide-react";
import { use, useEffect, useState } from "react";
import { userType } from "../../page";
import Link from "next/link";
import FollowButton, {
  JwtPayLoad,
} from "@/custom-components/HandleFollowButton";
import SeeFollowedPeoples from "@/custom-components/SeeFollowedPeoples";
import IconFooter from "@/custom-components/Footer";
import { jwtDecode } from "jwt-decode";

const Page = ({ params }: { params: Promise<{ userId: string }> }) => {
  const [baseUrl, setBaseUrl] = useState<string>("");

  if (typeof window !== "undefined") {
    setBaseUrl(window.location.origin);
  }
  const { userId } = use(params);
  const decodedToken = jwtDecode<JwtPayLoad>(
    localStorage.getItem("accessToken") ?? ""
  );
  if (decodedToken.userId == userId) {
    window.location.href = `/profile/${userId}`;
  }
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
    setUserData(data);
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
            <FollowButton userData={userData} />
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
            <SeeFollowedPeoples
              followedPeopleData={userData?.followers}
              followersLength={userData?.followers.length}
              isFollowing={false}
            />
          </div>
          <div className="flex-col w-[33%] text-center">
            <SeeFollowedPeoples
              followedPeopleData={userData?.following}
              followersLength={userData?.following.length}
              isFollowing={true}
            />
          </div>
        </div>
        <div className="h-[44px] flex justify-center items-center text-blue-500 border-t-2">
          <Grid3x3 />
        </div>
        <div className="flex-wrap flex justify-between">
          {userData?.posts.length !== undefined &&
          userData?.posts.length > 0 ? (
            userData?.posts.map((post) => {
              return (
                <Link
                  key={post._id}
                  href={`${baseUrl}/posts/userPost/${post._id}`}
                  className="w-[33%] mb-1"
                >
                  <img className="aspect-square" src={post.postImg[0]} />
                </Link>
              );
            })
          ) : (
            <div
              className="text-white w-screen flex border-t-2 border-b-2 border-neutral-800 p-2 gap-2"
              style={{
                alignItems: "center",
                justifyItems: "center",
              }}
            >
              <Instagram className="w-[62px] h-[62px]" />
              <div className="text-[14px] font-bold">
                <div>No Posts Yet</div>
                <div className="text-left text-neutral-400">
                  When {userData?.username} posts, you&apos;ll see their photos
                  and videos here.
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <IconFooter />
    </Card>
  );
};
export default Page;
