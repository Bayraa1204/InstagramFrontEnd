import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
};

const PostCommentSection = ({
  postComments,
  postId,
}: {
  postComments: commentType[];
  postId: string;
}) => {
  return (
    <div>
      {postComments.slice(0, 2).map((comment) => {
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
      {postComments.length > 0 && (
        <Link
          href={`http://localhost:3000/posts/comments/${postId}`}
          className="text-gray-500"
        >
          View all comments
        </Link>
      )}
    </div>
  );
};
export default PostCommentSection;
