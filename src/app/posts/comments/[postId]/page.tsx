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

  const getPostsData = async () => {
    const dataJson = await fetch(
      `https://instagram-1-5x7q.onrender.com/${postId}`
    );
    const data = await dataJson.json();
    setComments(data.comments);
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
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};

export default Page;
