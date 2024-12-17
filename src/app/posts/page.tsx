"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bookmark,
  Heart,
  MessageCircle,
  Send,
  Search,
  House,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Link from "next/link";
import SeeLikedPeoples from "@/components/seeLikedPeoples";
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
  const [isLiked, setIsLiked] = useState<boolean>(false);

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
  const HandleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    if (isLiked) {
      setIsLiked(false);
    } else {
      setIsLiked(true);
      fetch("https://instagram-1-5x7q.onrender.com/likePost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: token,
        }),
      });
    }
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
                <div className="h-[30px] flex gap-2 text-white">
                  <button onClick={HandleLike}>
                    {isLiked ? (
                      <Heart fill="red" className="text-red-600" />
                    ) : (
                      <Heart fill="black" />
                    )}
                  </button>
                  <button>
                    <MessageCircle />
                  </button>
                  <button>
                    <Send />
                  </button>
                </div>
                <button>
                  <Bookmark />
                </button>
              </div>
              <SeeLikedPeoples likedPeopleData={post.like} />
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
                {post.comments.length > 0 && (
                  <Link
                    href={`http://localhost:3000/posts/comments/${post._id}`}
                    className="text-gray-500"
                  >
                    View all comments
                  </Link>
                )}
              </div>
            </CardFooter>
          </Card>
        );
      })}
      <div className="fixed bottom-0 left-0 w-screen flex h-10 border-gray-800 z-999">
        <Link
          href="http://localhost:3000/posts/search"
          className="w-[50%] bg-black flex justify-center h-full rounded-none"
        >
          <Search className="text-white h-full" />
        </Link>
        <Link
          href="http://localhost:3000/posts"
          className="w-[50%] bg-black flex justify-center h-full rounded-none"
        >
          <House className="text-white h-full" />
        </Link>
      </div>
    </div>
  );
};
export default Page;
