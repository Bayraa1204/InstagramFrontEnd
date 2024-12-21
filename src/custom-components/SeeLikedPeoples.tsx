import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
type likeType = {
  _id: string;
  profileImg: string;
  username: string;
  email: string;
};

const SeeLikedPeoples = ({
  likedPeopleData,
}: {
  likedPeopleData: likeType[];
}) => {
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
          {likedPeopleData?.map((user, index) => {
            const emailName = user.email.split("@");
            return (
              <div
                key={user._id}
                className="flex mb-8 h-[52px] justify-between"
              >
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage
                      src={
                        user.profileImg ??
                        `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`
                      }
                    />
                  </Avatar>
                  <div>
                    <div className="text-white text-[15px]">
                      {user.username}
                    </div>
                    <div className="text-gray-600 text-[15px]">
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
