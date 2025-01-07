"use client";
import { Button } from "@/components/ui/button";
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
import { useState } from "react";

const Page = () => {
  const [images, setImages] = useState<FileList | null>(null);
  const [caption, setCaption] = useState<string>("");

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const HandleCaption = (e: { target: { value: string } }) => {
    setCaption(e.target.value);
  };
  const HandleImages = async () => {
    const token = localStorage.getItem("accessToken");
    await fetch("https://instagram-1-5x7q.onrender.com/post/createPost", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        caption: caption,
        postImg: await uploadedImages,
      }),
    });
  };

  const uploadImages = async () => {
    if (images) {
      const uploadPromises = Array.from(images).map(async (image) => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "ace_area");
        formData.append("cloud_name", "dl93ggn7x");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dl93ggn7x/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const result = await response.json();
        return result.secure_url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);

      setUploadedImages(uploadedUrls.filter((url) => url !== null) as string[]);
    } else {
    }
  };

  return (
    <Card className="bg-black border-none rounded-none h-screen flex-col ">
      <h1 className=" text-[40px] text-white font-sans pt-6 p-6 text-center">
        Create new Post
      </h1>
      <CardHeader className="text-white">
        <CardTitle>Select your image and write a description for it.</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="text-white space-y-4">
        <Input
          className=" border-neutral-500"
          placeholder="Write a description..."
          value={caption}
          onChange={HandleCaption}
        />
        <div className="max-w-lg mx-auto space-y-4">
          <input
            type="file"
            multiple
            onChange={(e) => {
              const files = e.target.files;
              if (files) {
                setImages(files);
              }
            }}
            className="file:border file:border-neutral-600 file:rounded-md file:px-4 file:py-2 file:bg-neutral-700 file:text-white file:cursor-pointer hover:file:bg-neutral-500"
          />
          <Button onClick={uploadImages}>Upload</Button>
          <Button onClick={HandleImages}>Post</Button>
          <div className="mt-4 text-center overflow-auto h-[500px]">
            {uploadedImages.map((img, index) => (
              <img
                key={index}
                src={img}
                className="max-w-full h-[300px] rounded-lg shadow-lg"
              />
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-white"></CardFooter>
      <IconFooter />
    </Card>
  );
};

export default Page;
