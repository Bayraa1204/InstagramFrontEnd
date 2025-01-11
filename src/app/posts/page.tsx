"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import PostReactions from "@/custom-components/PostReactions";
import PostCommentSection from "@/custom-components/PostCommentSection";
import SeeLikedPeoples from "@/custom-components/SeeLikedPeoples";
import Link from "next/link";
import IconFooter from "@/custom-components/Footer";

export type userType = {
  _id: string;
  username: string;
  email: string;
  profileImg: string;
  posts: postType;
  followers: userType[];
  following: userType[];
  bio: string;
};
export type commentType = {
  _id: string;
  userId: userType;
  comment: string;
}[];
export type postType = {
  _id: string;
  caption: string;
  postImg: string[];
  userId: userType;
  like: userType[];
  comments: commentType;
}[];
const Page = () => {
  const [posts, setPosts] = useState<postType>([]);

  useEffect(() => {
    async () => {
      const [token, setToken] = useState<string | null>("");
      useEffect(() => {
        setToken(localStorage.getItem("accessToken"));
      }, []);
      if (!token) {
        window.location.href = "/login";
      }
      const dataJson = await fetch(
        "https://instagram-1-5x7q.onrender.com/post/getPost",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await dataJson.json();
      setPosts(data);
    };
  }, []);
  const [baseUrl, setBaseUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);
  return (
    <div className="bg-black h-max flex-col justify-items-center items-center relative mb-[20px]">
      <h1 className=" text-[40px] text-white font-sans pt-6 p-6">Instagram</h1>
      {posts?.map((post, index) => {
        return (
          <Card
            className="bg-black border-gray-800 w-screen rounded-none"
            key={index}
          >
            <div className="flex mt-4 items-center gap-3 p-6 pt-0 text-white">
              <Link href={`${baseUrl}/posts/users/${post.userId._id}`}>
                <Avatar>
                  <AvatarImage src={post.userId.profileImg} />
                </Avatar>
              </Link>

              <Link href={`${baseUrl}/posts/users/${post.userId._id}`}>
                {post.userId.username}
              </Link>
            </div>
            <CardContent className="flex-col items-center justify-center w=[340px] h-[340px] mb-4">
              <Carousel>
                <CarouselContent>
                  {post.postImg.map((img, index) => {
                    return (
                      <CarouselItem
                        key={index}
                        className="flex justify-center w=[340px] h-[340px]"
                      >
                        <img src={img} />
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
              </Carousel>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2">
              <div className="flex items-center gap-1 text-white text-[15px]">
                <div className="font-bold">{post.userId.username}</div>
                <div>{post.caption}</div>
              </div>
              <PostReactions postLike={post.like} postId={post._id} />
              <SeeLikedPeoples likedPeopleData={post.like} />
              <PostCommentSection
                postComments={post.comments}
                postId={post._id}
              />
            </CardFooter>
          </Card>
        );
      })}
      <IconFooter />
    </div>
  );
};
export default Page;
