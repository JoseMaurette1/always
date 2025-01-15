import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Welcome to Always v.1</h1>
      <p className="pb-4">Showcase version, full version is private</p>
      <Button>
        <Link href="/workouts">Start</Link>
      </Button>
    </div>
  );
};

export default LoginPage;
