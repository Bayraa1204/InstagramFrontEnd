import Link from "next/link";
import { Bookmark, MessageCircle, Send } from "lucide-react";
import IsLiked from "./IsLikedHeartRed";
import { userType } from "@/app/posts/page";

const PostReactions = ({
  postLike,
  postId,
}: {
  postLike: userType[] | undefined;
  postId: string;
}) => {
  const baseUrl = window.location.origin;
  return (
    <div
      className="flex w-full text-white"
      style={{ justifyContent: "space-between" }}
    >
      <div className="h-[30px] flex gap-2 text-white">
        <IsLiked
          userId={localStorage.getItem("accessToken") ?? ""}
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
