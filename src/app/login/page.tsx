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

const Page = () => {
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [baseUrl, setBaseUrl] = useState<string>("");

  const [passwordType, setPasswordType] = useState<string>("password");
  const [count, setCount] = useState<number>(0);

  const HandleUserName = (e: { target: { value: string } }) => {
    setEmailValue(e.target.value);
  };
  const HandlePassword = (e: { target: { value: string } }) => {
    setPasswordValue(e.target.value);
  };

  const checkUserName = () => {
    if (emailValue.length == 0 || emailValue[0] == " ") {
      setEmailError(true);
      setCount(count + 1);
    } else {
      setEmailError(false);
      setCount(count + 1);
    }
  };
  const checkPassword = () => {
    if (passwordValue.length == 0 || passwordValue[0] == " ") {
      setPasswordError(true);
      setCount(count + 1);
    } else {
      setPasswordError(false);
      setCount(count + 1);
    }
  };
  const fetchLogin = () => {
    if (!passwordError && !emailError) {
      console.log(count);
      fetch(`https://instagram-1-5x7q.onrender.com/user/logIn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: passwordValue,
          email: emailValue,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setEmailValue("");
          setPasswordValue("");
          localStorage.setItem("accessToken", data.token);
        })
        .then(() => (window.location.href = "/posts"));
    } else {
      setCount(0);
    }
  };
  const checkBox = () => {
    if (passwordType == "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };
  const loginButtonClicked = () => {
    checkUserName();
    checkPassword();
    if (count == 2) {
      fetchLogin();
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);
  return (
    <div className="h-screen bg-black flex justify-center items-center">
      <Card className="w-[320px]  flex-row bg-black border-none">
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
            placeholder="Email"
            value={emailValue}
            onChange={HandleUserName}
          />
          {emailError && (
            <div className="text-red-600">Email hooson baina.</div>
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
              className="w-[36px] h-[36px] bg-blue-500"
            />
          </div>
          {passwordError && (
            <div className="text-red-600">Password hooson baina.</div>
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
            Don&apos;t have an account?{" "}
            <Link href={`${baseUrl}/signup`} className="text-blue-600">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
export default Page;
