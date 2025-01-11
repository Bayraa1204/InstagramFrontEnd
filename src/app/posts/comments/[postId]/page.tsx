"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { use, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import IconFooter from "@/custom-components/Footer";
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
      `https://instagram-1-5x7q.onrender.com/post/${postId}`,
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
  const [token, setToken] = useState<string | null>("");
  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
  }, []);
  const checkComment = async () => {
    if (commentValue.length == 0) {
      setCommentValue("");
    } else {
      await fetch(`https://instagram-1-5x7q.onrender.com/createComment`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          postId: postId,
          comment: commentValue,
        }),
      });
      setCommentValue("");
    }
  };
  const HandleComment = (e: { target: { value: string } }) => {
    setCommentValue(e.target.value);
  };
  useEffect(() => {
    getPostsData();
  }, []);
  return (
    <Card className="flex-col h-screen w-screen bg-black border-none rounded-none">
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
                  <AvatarImage
                    src={
                      comment.userId.profileImg ??
                      `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`
                    }
                  />
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
          <Button className="hover:text-slate-600" onClick={checkComment}>
            Post
          </Button>
        ) : null}
      </CardFooter>
      <IconFooter />
    </Card>
  );
};

export default Page;
