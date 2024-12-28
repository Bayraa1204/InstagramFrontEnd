import Link from "next/link";
import { Bookmark, MessageCircle, Send } from "lucide-react";
import IsLiked from "./IsLikedHeartRed";
import { likeType } from "@/app/posts/page";

const PostReactions = ({
  postLike,
  postId,
}: {
  postLike: likeType[] | undefined;
  postId: string ;
}) => {
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
          href={`http://localhost:3000/posts/comments/${postId}`}
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
