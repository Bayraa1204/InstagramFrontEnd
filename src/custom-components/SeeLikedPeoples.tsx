"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
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

const SeeLikedPeoples = ({
  likedPeopleData,
  userId,
}: {
  likedPeopleData: likeType[];
  userId: string;
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const decodedToken = jwtDecode<JwtPayLoad>(userId);
  const checkIfLiked = () => {
    likedPeopleData.map((likedPeople) => {
      if (likedPeople._id == decodedToken.userId) {
        setIsLiked(true);
      }
    });
  };
  useEffect(() => {
    checkIfLiked();
  }, [likedPeopleData]);

  return (
    <Dialog>
      <DialogTrigger>
        {likedPeopleData.length !== 0 ? (
          <div className="font-bold text-white">
            {likedPeopleData.length} likes
          </div>
        ) : null}
      </DialogTrigger>
      <DialogContent className="bg-black">
        <DialogHeader className="gap-4">
          <DialogTitle className="text-gray-600">Liked Users.</DialogTitle>
          {likedPeopleData?.map((user) => {
            const emailName = user.email.split("@");
            return (
              <div
                key={user._id}
                className="flex mb-8 "
                style={{ height: "52px", justifyContent: "space-between" }}
              >
                <div className="flex items-center gap-2">
                  <Link href={`http://localhost:3000/posts/users/${user._id}`}>
                    <Avatar>
                      <AvatarImage
                        src={
                          user.profileImg ??
                          `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`
                        }
                      />
                    </Avatar>
                  </Link>
                  <div>
                    <Link
                      href={`http://localhost:3000/posts/users/${user._id}`}
                      className="text-white text-[15px]"
                    >
                      {user.username}
                    </Link>
                    <div className=" text-[15px]" style={{ color: "dimgray" }}>
                      {emailName[0]}
                    </div>
                  </div>
                </div>
                <Button className="bg-blue-600">Follow</Button>
              </div>
            );
          })}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SeeLikedPeoples;
