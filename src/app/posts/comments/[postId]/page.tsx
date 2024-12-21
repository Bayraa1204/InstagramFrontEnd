"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { use, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

const Page = ({ params }: { params: Promise<{ postId: string }> }) => {
  const { postId } = use(params);
  const [comments, setComments] = useState<commentType>([]);
  const [commentValue, setCommentValue] = useState<string>("");

  const getPostsData = async () => {
    const token = localStorage.getItem("accessToken");
    const dataJson = await fetch(
      `https://instagram-1-5x7q.onrender.com/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await dataJson.json();
    setComments(data.comments);
  };
  const checkComment = async () => {
    const token = localStorage.getItem("accessToken");
    if (commentValue.length == 0 || commentValue.includes(" ")) {
      setCommentValue("");
      console.log("hooson");
    } else {
      await fetch(`https://instagram-1-5x7q.onrender.com/createComment`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      });
    }
  };
  const HandleComment = (e: { target: { value: string } }) => {
    setCommentValue(e.target.value);
  };
  useEffect(() => {
    getPostsData();
  }, []);
  return (
    <Card className="flex-col h-screen w-screen bg-black">
      <CardHeader className="text-white flex-col items-center text-[40px] mb-8">
        <CardTitle>Instagram</CardTitle>
        <CardDescription className="text-[20px]">Comments</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {comments?.map((comment) => {
          return (
            <div
              key={comment._id}
              className="flex h-[50px] gap-4 border-gray-500"
            >
              <div className="text-white flex items-center text-[18px] gap-2 font-bold">
                <Avatar className="w-[50px] h-[50px]">
                  <AvatarImage src={comment.userId.profileImg} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {comment.userId.username}
              </div>
              <div className="text-white text-[18px] flex items-center">
                {comment.comment}
              </div>
            </div>
          );
        })}
      </CardContent>
      <CardFooter className="fixed bottom-12 w-screen">
        <Input
          onChange={HandleComment}
          value={commentValue}
          className="text-white"
          placeholder="Write a comment.."
        />
        {commentValue.length !== 0 ? (
          <Button className="hover:text-slate-600" onChange={checkComment}>
            Post
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
};

export default Page;
