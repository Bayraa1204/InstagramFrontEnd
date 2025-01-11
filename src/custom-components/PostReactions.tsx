import Link from "next/link";
import { Bookmark, MessageCircle, Send } from "lucide-react";
import IsLiked from "./IsLikedHeartRed";
import { userType } from "@/app/posts/page";
import { useEffect, useState } from "react";

const PostReactions = ({
  postLike,
  postId,
}: {
  postLike: userType[] | undefined;
  postId: string;
}) => {
  const [baseUrl, setBaseUrl] = useState<string>("");
  const [token, setToken] = useState<string | null>("");
  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);
  return (
    <div
      className="flex w-full text-white"
      style={{ justifyContent: "space-between" }}
    >
      <div className="h-[30px] flex gap-2 text-white">
        <IsLiked
          userId={token ?? ""}
          likedPeopleData={postLike}
          postId={postId}
        />
        <Link
          href={`${baseUrl}/posts/comments/${postId}`}
          className="hover:text-slate-500 flex items-center"
        >
          <MessageCircle />
        </Link>
        <button>
          <Send />
        </button>
      </div>
      <button>
        <Bookmark />
      </button>
    </div>
  );
};
export default PostReactions;
