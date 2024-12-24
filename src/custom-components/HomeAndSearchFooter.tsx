import { House, Search } from "lucide-react";
import Link from "next/link";

const HomeAndSearchFooter = () => {
  return (
    <div className="flex w-screen h-10 border-gray-800 fixed bottom-0">
      <Link
        href="http://localhost:3000/posts/search"
        className=" bg-black flex justify-center h-full rounded-none"
        style={{ width: "50%" }}
      >
        <Search className="text-white h-full" />
      </Link>
      <Link
        href="http://localhost:3000/posts"
        className=" bg-black flex justify-center h-full rounded-none"
        style={{ width: "50%" }}
      >
        <House className="text-white h-full" />
      </Link>
    </div>
  );
};
export default HomeAndSearchFooter;
