import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import IconFooter from "@/custom-components/Footer";

const Page = () => {
  return (
    <Card className="border-none rounded-none bg-black relative h-screen">
      <CardHeader className="text-white text-[25px]">
        <CardTitle>Search Posts</CardTitle>
        <CardDescription>
          <Input placeholder="search..." />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
      <IconFooter />
    </Card>
  );
};

export default Page;
