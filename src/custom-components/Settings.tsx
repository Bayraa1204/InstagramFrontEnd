"use client";
import { Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
const Setting = () => {
  const [count, setCount] = useState<number>(0);
  const [isSure, setIsSure] = useState<boolean>(false);
  const HandleSettings = () => {
    if (count == 1) {
      setCount(0);
      localStorage.removeItem("accessToken");
    } else {
      setIsSure(true);
    }
  };
  const HandleIsSure = () => {
    setIsSure(false);
    setCount(count + 1);
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger
          className="fixed z-50 text-white"
          style={{ right: "8px", top: "8px" }}
        >
          <Settings />
        </DialogTrigger>
        <DialogContent className="bg-black text-white w-[80%]">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription style={{ marginTop: "20px" }}>
              <Button onClick={HandleSettings} className="text-red-600">
                Log out?
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog open={isSure} onOpenChange={setIsSure}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className="bg-black text-white">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <div className="flex-col">
              <div className="text-neutral-600">
                This action cannot be undone
              </div>
              <div>
                <Button onClick={HandleIsSure} className="text-red-600 w-20">
                  Yes
                </Button>
                <Button onClick={() => setIsSure(false)} className="w-20">
                  No
                </Button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      ;
    </div>
  );
};

export default Setting;
