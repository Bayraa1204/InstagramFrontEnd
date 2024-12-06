"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Link from "next/link";
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
  like: string;
  comments: commentType;
}[];
const Page = () => {
  const [posts, setPosts] = useState<postType>([]);

  const getPostsData = async () => {
    const dataJson = await fetch(
      "https://instagram-1-5x7q.onrender.com/getPost",
      {
        method: "GET",
      }
    );
    const data = await dataJson.json();
    setPosts(data);
    console.log(data);
  };
  useEffect(() => {
    getPostsData();
  }, []);
  return (
    <div className="bg-black h-max flex-col justify-items-center items-center">
      <h1 className=" text-[40px] text-white font-sans pt-6 p-6">Instagram</h1>
      {posts?.map((post, index) => {
        return (
          <Card
            className="bg-black border-gray-800 w-screen rounded-se-none"
            key={index}
          >
            <div className="flex mt-4 items-center gap-3 p-6 pt-0 text-white">
              <Avatar>
                <AvatarImage src={post.userId.profileImg} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>{post.userId.username}</div>
            </div>
            <CardContent className="flex-col items-center justify-center w=[340px] h-[340px] mb-4">
              <Carousel>
                <CarouselContent>
                  <CarouselItem className="flex justify-center w=[340px] h-[340px]">
                    <img className="" src={post.postImg} />
                  </CarouselItem>
                  <CarouselItem className="flex justify-center w=[340px] h-[340px]">
                    <img className="" src={post.postImg} />
                  </CarouselItem>
                  <CarouselItem className="flex justify-center w=[340px] h-[340px]">
                    <img className=" " src={post.postImg} />
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2">
              <div className="flex justify-between w-full text-white">
                <div className="h-[20px] flex gap-2 text-white">
                  <Heart />
                  <MessageCircle />
                  <Send />
                </div>
                <Bookmark />
              </div>
              <div className="font-bold text-white">548 likes</div>
              {/* <div className="text-[20px] text-white font-sans">
                {post.caption}
              </div> */}
              <div>
                {post.comments.slice(0, 2).map((comment) => {
                  return (
                    <div
                      key={comment._id}
                      className="flex items-center gap-2 mb-3 text-white"
                    >
                      <Avatar className="w-[20px] h-[20px]">
                        <AvatarImage src={comment.userId.profileImg} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="font-bold">{comment.userId.username}</div>
                      <div>{comment.comment}</div>
                    </div>
                  );
                })}
                <Link
                  href="http://localhost:3000/comments"
                  className="text-gray-500"
                >
                  View all comments
                </Link>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};
export default Page;
