"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export default function Page() {
  const [userNameValue, setUserNameValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [userNameError, setUserNameError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const [passwordType, setPasswordType] = useState<string>("password");

  const [userData, setUserData] = useState([]);

  const getUsersData = async () => {
    const dataJson = await fetch(
      "https://instagram-1-5x7q.onrender.com/getUsers",
      {
        method: "GET",
      }
    );
    const data = await dataJson.json();
    setUserData(data);
    console.log(data);
  };
  useEffect(() => {
    getUsersData();
  }, []);

  const HandleUserName = (e: { target: { value: string } }) => {
    setUserNameValue(e.target.value);
  };
  const HandlePassword = (e: { target: { value: string } }) => {
    setPasswordValue(e.target.value);
  };

  const loginButtonClicked = () => {
    checkUserName();
    checkPassword();
    if (!userNameError || !passwordError) {
      userData;
    }
  };
  const checkUserName = () => {
    if (userNameValue.length == 0 || userNameValue.includes(" ")) {
      setUserNameError(true);
    } else {
      setUserNameError(false);
    }
  };
  const checkPassword = () => {
    if (passwordValue.length == 0 || passwordValue.includes(" ")) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };
  const checkBox = () => {
    if (passwordType == "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  return (
    <div className="w-[390px] h-screen bg-black flex justify-center items-center">
      <Card className="w-[320px] h-[443px] flex-row bg-black border-none">
        <CardHeader>
          <CardTitle className="flex w-[270px] text-white justify-center text-[30px]">
            Instagram
          </CardTitle>
          <CardDescription className=" font-bold w-[270px] text-center text-gray-400 text-[16px]">
            Log in to see photos and videos from your friends.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            className="w-[270px] h-[36px] border-zinc-700 text-white rounded-[5px] bg-zinc-900"
            placeholder="Username"
            value={userNameValue}
            onChange={HandleUserName}
          />
          {userNameError && (
            <div className="text-red-600">UserName hooson baina</div>
          )}
          <div className="flex">
            <Input
              className="w-[234px] h-[36px] border-zinc-700 text-white rounded-[5px] bg-zinc-900"
              placeholder="Password"
              value={passwordValue}
              onChange={HandlePassword}
              type={passwordType}
            />
            <Checkbox
              onClick={checkBox}
              className="w-[36px] h-[36px] bg-zinc-700"
            />
          </div>
          {passwordError && (
            <div className="text-red-600">Password hooson baina</div>
          )}
        </CardContent>
        <CardFooter className="flex-col gap-[40px]">
          <Button
            onClick={loginButtonClicked}
            className="bg-sky-700 font-bold w-[270px] h-[32px]"
          >
            Log in
          </Button>
          <div className="font-bold w-[270px] text-center text-gray-400 text-[16px]">
            Don't have an account?{" "}
            <Link href="http://localhost:3000/signup" className="text-blue-600">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
