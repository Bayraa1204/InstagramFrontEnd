"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import PostReactions from "@/custom-components/PostReactions";
import PostCommentSection from "@/custom-components/PostCommentSection";
import SeeLikedPeoples from "@/custom-components/SeeLikedPeoples";
import HomeAndSearchFooter from "@/custom-components/HomeAndSearchFooter";
import Link from "next/link";
type likeType = {
  _id: string;
  profileImg: string;
  username: string;
  email: string;
};
type userType = {
  _id: string;
  username: string;
  email: string;
  profileImg: string;
};
type commentType = {
  _id: string;
  userId: userType;
  comment: string;
}[];
type postType = {
  _id: string;
  caption: string;
  postImg: string;
  userId: userType;
  like: likeType[];
  comments: commentType;
}[];
const Page = () => {
  const [posts, setPosts] = useState<postType>([]);

  const getPostsData = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      window.location.href = "/login";
    }
    const dataJson = await fetch(
      "https://instagram-1-5x7q.onrender.com/getPost",
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

  useEffect(() => {
    getPostsData();
  }, []);
  return (
    <div className="bg-black h-max flex-col justify-items-center items-center relative">
      <h1 className=" text-[40px] text-white font-sans pt-6 p-6">Instagram</h1>
      {posts?.map((post, index) => {
        return (
          <Card
            className="bg-black border-gray-800 w-screen rounded-se-none"
            key={index}
          >
            <div className="flex mt-4 items-center gap-3 p-6 pt-0 text-white">
              <Link
                href={`http://localhost:3000/posts/users/${post.userId._id}`}
              >
                <Avatar>
                  <AvatarImage src={post.userId.profileImg} />
                </Avatar>
              </Link>

              <Link
                href={`http://localhost:3000/posts/users/${post.userId._id}`}
              >
                {post.userId.username}
              </Link>
            </div>
            <CardContent className="flex-col items-center justify-center w=[340px] h-[340px] mb-4">
              <Carousel>
                <CarouselContent>
                  <CarouselItem className="flex justify-center w=[340px] h-[340px]">
                    <img src={post.postImg} />
                  </CarouselItem>
                  <CarouselItem className="flex justify-center w=[340px] h-[340px]">
                    <img src={post.postImg} />
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2">
              <PostReactions postLike={post.like} postId={post._id} />
              <SeeLikedPeoples
                likedPeopleData={post.like}
                userId={localStorage.getItem("accessToken") ?? ""}
              />
              <PostCommentSection
                postComments={post.comments}
                postId={post._id}
              />
            </CardFooter>
          </Card>
        );
      })}
      <HomeAndSearchFooter />
    </div>
  );
};
export default Page;
