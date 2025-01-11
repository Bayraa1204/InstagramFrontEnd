"use client";

import { use, useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
import { commentType, userType } from "../../page";
import IconFooter from "@/custom-components/Footer";
export type postType = {
  _id: string;
  caption: string;
  postImg: string;
  userId: userType;
  like: userType[];
  comments: commentType;
};
const Page = ({ params }: { params: Promise<{ postId: string }> }) => {
  const { postId } = use(params);
  const [postData, setPostData] = useState<postType>();
  const useGetPostData = async () => {
    const [token, setToken] = useState<string | null>("");
    useEffect(() => {
      setToken(localStorage.getItem("accessToken"));
    }, []);
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
    useGetPostData();
  }, []);
  const [baseUrl, setBaseUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);
  return (
    <div className="bg-black h-screen flex-col justify-items-center items-center relative">
      <Card className="bg-black border-gray-800 w-screen rounded-se-none">
        <div className="flex mt-4 items-center gap-3 p-6 pt-0 text-white">
          <Link href={`${baseUrl}/posts/users/${postData?.userId._id}`}>
            <Avatar>
              <AvatarImage src={postData?.userId.profileImg} />
            </Avatar>
          </Link>
          <Link href={`${baseUrl}/posts/users/${postData?.userId._id}`}>
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
          <SeeLikedPeoples likedPeopleData={postData?.like} />
          <PostCommentSection
            postComments={postData?.comments}
            postId={postData?._id ?? ""}
          />
        </CardFooter>
      </Card>
      <IconFooter />
    </div>
  );
};
export default Page;
