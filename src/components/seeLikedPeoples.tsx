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
        <div className="font-bold text-white">548 likes</div>
      </DialogTrigger>
      <DialogContent className="bg-black">
        <DialogHeader>
          <DialogTitle className="text-gray-600">Liked Users.</DialogTitle>
          {likedPeopleData?.map((user, index) => {
            const emailName = user.email.split("@");
            return (
              <div key={user._id} className="flex">
                <img
                  src={user.profileImg}
                  className="w-[52px] h-[52px] bg-cover rounded-full"
                />
                <div>
                  <div className="text-gray-600">{user.username}</div>
                  <div className="text-gray-600">{emailName[0]}</div>
                </div>
              </div>
            );
          })}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SeeLikedPeoples;
