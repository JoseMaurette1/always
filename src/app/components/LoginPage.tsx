import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CircleArrowRight } from "lucide-react";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Welcome to Always v.1</h1>
      <p className="pb-4">Showcase version, full version is private</p>
      <div className="flex flex-row">
        <Link href={"/workouts"}>
          <Button>
            Start <CircleArrowRight />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
