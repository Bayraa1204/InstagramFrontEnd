import Link from "next/link";
import { Bookmark, MessageCircle, Send } from "lucide-react";
import IsLiked from "./IsLikedHeartRed";
type likeType = {
  _id: string;
  profileImg: string;
  username: string;
  email: string;
};
const PostReactions = ({
  postLike,
  postId,
}: {
  postLike: likeType[];
  postId: string;
}) => {
  return (
    <div
      className="flex w-full text-white"
      style={{ justifyContent: "space-between" }}
    >
      <div className="h-[30px] flex gap-2 text-white">
        <IsLiked
          postId={postId}
          likedPeopleData={postLike}
          userId={localStorage.getItem("accessToken") ?? ""}
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
