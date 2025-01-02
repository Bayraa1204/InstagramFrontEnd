"use client";
import { userType } from "@/app/posts/page";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

const SeeFollowedPeoples = ({
  followedPeopleData,
  followers,
}: {
  followedPeopleData: userType[] | undefined;
  followers: number | undefined;
}) => {
  return (
    <Dialog>
      <DialogTrigger>
        {
          <div className="flex-col text-center">
            <p className="text-white font-bold">{followers}</p>
            followers
          </div>
        }
      </DialogTrigger>
      <DialogContent className="bg-black">
        <DialogHeader className="gap-4">
          <DialogTitle className="text-white">Followers</DialogTitle>
          <div style={{ height: "400px", overflow: "scroll" }}>
            {followedPeopleData?.map((user) => {
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
                        className="text-white text-[15px] "
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

export default SeeFollowedPeoples;
