"use client";
import { jwtDecode } from "jwt-decode";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
type likeType = {
  _id: string;
  profileImg: string;
  username: string;
  email: string;
};
type JwtPayLoad = {
  exp: number;
  iat: number;
  userId: string;
};
const IsLiked = ({
  likedPeopleData,
  postId,
}: {
  likedPeopleData: likeType[] | undefined;
  postId: string;
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const token = localStorage.getItem("accessToken") ?? "";
  const decodedToken = jwtDecode<JwtPayLoad>(token);
  const checkIfLiked = () => {
    likedPeopleData?.map((likedPeople) => {
      if (likedPeople._id == decodedToken.userId) {
        setIsLiked(true);
      }
    });
  };
  useEffect(() => {
    checkIfLiked();
  }, [likedPeopleData]);

  const HandleLike = async (postId: string) => {
    if (isLiked) {
      const token = localStorage.getItem("accessToken");
      setIsLiked(false);
      await fetch("https://instagram-1-5x7q.onrender.com/unLike", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: postId,
        }),
      });
    } else {
      const token = localStorage.getItem("accessToken");
      setIsLiked(true);
      await fetch("https://instagram-1-5x7q.onrender.com/likePost", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: postId,
        }),
      });
    }
  };
  return (
    <button onClick={() => HandleLike(postId)}>
      {isLiked ? (
        <Heart fill="red" className="text-red-600" />
      ) : (
        <Heart fill="black" />
      )}
    </button>
  );
};

export default IsLiked;
