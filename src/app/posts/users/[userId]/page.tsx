"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import HomeAndSearchFooter from "@/custom-components/HomeAndSearchFooter";
import { use, useEffect } from "react";
const Page = ({ params }: { params: Promise<{ userId: string }> }) => {
  const { userId } = use(params);
  const getUserData = async () => {
    const token = localStorage.getItem("accessToken");
    const dataJson = await fetch(
      `https://instagram-1-5x7q.onrender.com/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await dataJson.json();
    console.log(data);
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Card className="border-none rounded-none">
      <CardHeader>
        <CardTitle>{userId}</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
      <HomeAndSearchFooter />
    </Card>
  );
};
export default Page;
