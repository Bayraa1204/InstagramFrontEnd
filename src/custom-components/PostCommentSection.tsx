import { Avatar, AvatarImage } from "@/components/ui/avatar";
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
  postComments: commentType[] | undefined;
  postId: string;
}) => {
  return (
    <div>
      {postComments?.slice(0, 1).map((comment) => {
        return (
          <div
            key={comment._id}
            className="flex items-center gap-2 text-white mb-4"
          >
            <Avatar style={{ height: "20px", width: "20px" }}>
              <AvatarImage
                src={
                  comment.userId.profileImg ??
                  `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`
                }
              />
            </Avatar>
            <div className="font-bold">{comment.userId.username}</div>
            <div>{comment.comment}</div>
          </div>
        );
      })}
      {postComments?.length != 0 && (
        <Link
          href={`http://localhost:3000/posts/comments/${postId}`}
          className="text-gray-400"
        >
          View all comments
        </Link>
      )}
    </div>
  );
};
export default PostCommentSection;
