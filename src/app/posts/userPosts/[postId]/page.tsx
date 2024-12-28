"use client";

import { use, useEffect, useState } from "react";
import HomeAndSearchFooter from "@/custom-components/HomeAndSearchFooter";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import PostReactions from "@/custom-components/PostReactions";
import SeeLikedPeoples from "@/custom-components/SeeLikedPeoples";
import PostCommentSection from "@/custom-components/PostCommentSection";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { commentType, likeType, userType } from "../../page";
export type postType = {
  _id: string;
  caption: string;
  postImg: string;
  userId: userType;
  like: likeType[];
  comments: commentType;
};
const Page = ({ params }: { params: Promise<{ postId: string }> }) => {
  const { postId } = use(params);
  const [postData, setPostData] = useState<postType>();
  const getPostData = async () => {
    const token = localStorage.getItem("accessToken");
    const dataJson = await fetch(
      `https://instagram-1-5x7q.onrender.com/post/getOnlyOnePost/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await dataJson.json();
    setPostData(data);
  };
  useEffect(() => {
    getPostData();
  }, []);
  return (
    <div className="bg-black h-screen flex-col justify-items-center items-center relative">
      <Card className="bg-black border-gray-800 w-screen rounded-se-none">
        <div className="flex mt-4 items-center gap-3 p-6 pt-0 text-white">
          <Link
            href={`http://localhost:3000/posts/users/${postData?.userId._id}`}
          >
            <Avatar>
              <AvatarImage src={postData?.userId.profileImg} />
            </Avatar>
          </Link>
          <Link
            href={`http://localhost:3000/posts/users/${postData?.userId._id}`}
          >
            {postData?.userId.username}
          </Link>
        </div>
        <CardContent className="flex-col items-center justify-center w=[340px] h-[340px] mb-4">
          <Carousel>
            <CarouselContent>
              <CarouselItem className="flex justify-center w=[340px] h-[340px]">
                <img src={postData?.postImg} />
              </CarouselItem>
              <CarouselItem className="flex justify-center w=[340px] h-[340px]">
                <img src={postData?.postImg} />
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2">
          <PostReactions
            postLike={postData?.like}
            postId={postData?._id ?? ""}
          />
          <SeeLikedPeoples
            likedPeopleData={postData?.like}
            userId={localStorage.getItem("accessToken") ?? ""}
          />
          <PostCommentSection
            postComments={postData?.comments}
            postId={postData?._id ?? ""}
          />
        </CardFooter>
      </Card>
      <HomeAndSearchFooter />
    </div>
  );
};
export default Page;
