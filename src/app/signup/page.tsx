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
import Link from "next/link";

export default function Page() {
  const [userNameValue, setUserNameValue] = useState<string>("");
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");

  const [userNameError, setUserNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const [count, setCount] = useState<number>(0);

  const HandleUserName = (e: { target: { value: string } }) => {
    setUserNameValue(e.target.value);
  };
  const HandleEmail = (e: { target: { value: string } }) => {
    setEmailValue(e.target.value);
  };
  const HandlePassword = (e: { target: { value: string } }) => {
    setPasswordValue(e.target.value);
  };

  const signupButtonClicked = () => {
    checkUserName();
    checkEmail();
    checkPassword();
    if (!userNameError && !emailError && !passwordError) {
      fetch(`https://instagram-1-5x7q.onrender.com/user/signUp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userNameValue,
          password: passwordValue,
          email: emailValue,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setEmailValue("");
          setPasswordValue("");
          setUserNameValue("");
          const access = data.token;
          localStorage.setItem("accessToken", access);
        })
        .then(() => (window.location.href = "/posts"));
    }
  };
  const checkUserName = () => {
    if (userNameValue.length == 0 || userNameValue.includes(" ")) {
      setUserNameError(true);
    } else {
      setCount(count + 1);
      setUserNameError(false);
    }
  };
  const checkEmail = () => {
    if (emailValue.length == 0 || emailValue.includes(" ")) {
      setEmailError(true);
    } else {
      if (emailValue.includes("@")) {
        setCount(count + 1);
        setEmailError(false);
      } else {
        setEmailError(true);
      }
    }
  };
  const checkPassword = () => {
    if (passwordValue.length == 0 || passwordValue.includes(" ")) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };
  const [baseUrl, setBaseUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);
  return (
    <div className="h-screen bg-black flex justify-center items-center">
      <Card className="w-[80%] flex-row bg-black border-none">
        <CardHeader>
          <CardTitle className="flex  text-white justify-center text-[30px]">
            Instagram
          </CardTitle>
          <CardDescription className="font-bold text-center text-gray-400 text-[16px]">
            Sign up to see photos and videos from your friends.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            className=" border-zinc-700 text-white rounded-[5px] bg-zinc-900"
            placeholder="Username"
            value={userNameValue}
            onChange={HandleUserName}
          />
          {userNameError && (
            <div className="text-red-600">Username hooson baina.</div>
          )}
          <Input
            className=" border-zinc-700 text-white rounded-[5px] bg-zinc-900"
            placeholder="Email"
            value={emailValue}
            onChange={HandleEmail}
          />
          {emailError && (
            <div className="text-red-600">Email hooson baina.</div>
          )}
          <Input
            className=" border-zinc-700 text-white rounded-[5px] bg-zinc-900"
            placeholder="Password"
            value={passwordValue}
            onChange={HandlePassword}
          />
          {passwordError && (
            <div className="text-red-600">Password hooson baina.</div>
          )}
        </CardContent>
        <CardFooter className="flex-col gap-[40px]">
          <Button
            onClick={signupButtonClicked}
            className="bg-sky-700 font-bold w-[270px] h-[32px]"
          >
            Sign up
          </Button>
          <div className="font-bold text-center text-gray-400 text-[16px]">
            Have an account?{" "}
            <Link href={`${baseUrl}/login`} className="text-blue-600">
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
