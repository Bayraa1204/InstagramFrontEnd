"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useEffect, useState } from "react";
type likeType = {
  _id: string;
  profileImg: string;
  username: string;
  email: string;
}[];

const SeeLikedPeoples = ({
  likedPeopleData,
}: {
  likedPeopleData: likeType | undefined;
}) => {
  const [likedNum, setLikedNum] = useState<number>();
  const CheckLike = () => {
    setLikedNum(likedPeopleData?.length);
  };
  useEffect(() => {
    CheckLike();
  }, [likedPeopleData]);
  return (
    <Dialog>
      <DialogTrigger>
        {likedPeopleData?.length !== 0 ? (
          <div className="font-bold text-white">{likedNum} likes</div>
        ) : null}
      </DialogTrigger>
      <DialogContent className="bg-black h-[400px]">
        <DialogHeader className="gap-4">
          <DialogTitle className="text-white">Liked Users.</DialogTitle>
          <div style={{ height: "300px", overflow: "scroll" }}>
            {likedPeopleData?.map((user) => {
              const emailName = user.email?.split("@")[0];
              return (
                <div
                  key={user._id}
                  className="flex mb-8 "
                  style={{ height: "52px", justifyContent: "space-between" }}
                >
                  <div className="flex items-center gap-2">
                    <Link
                      href={`http://localhost:3000/posts/users/${user._id}`}
                    >
                      <Avatar>
                        <AvatarImage
                          src={
                            user.profileImg ??
                            `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`
                          }
                        />
                      </Avatar>
                    </Link>
                    <div className="text-left">
                      <Link
                        href={`http://localhost:3000/posts/users/${user._id}`}
                        className="text-white text-[15px] text-left"
                      >
                        {user.username}
                      </Link>
                      <div
                        className=" text-[15px]"
                        style={{ color: "dimgray" }}
                      >
                        {emailName}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SeeLikedPeoples;
