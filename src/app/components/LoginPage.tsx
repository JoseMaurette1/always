import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CircleArrowRight,
  BriefcaseBusiness,
  Github,
  Linkedin,
  Instagram,
} from "lucide-react";
import { motion } from "framer-motion";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen  ">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="text-center"
      >
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight">
          Welcome to Always v.1
        </h1>
        <p className="text-lg text-gray-600 pb-8">
          Showcase Version, Merged with{" "}
          <Link
            className="underline text-blue-500 text-xl"
            href={"https://Macrotrue.vercel.app/"}
          >
            Macrotrue
          </Link>
        </p>
        <div className="flex items-center space-x-4">
          <Link
            href="https://github.com/JoseMaurette1"
            target="_blank"
            rel="noreferrer"
          >
            <Button
              variant="outline"
              size="icon"
              className="hidden sm:flex border-border/50 hover:border-foreground/20"
            >
              <Github className="h-4 w-4" />
            </Button>
          </Link>
          <Link
            href={"https://hosem.vercel.app"}
            target="_blank"
            rel="noreferrer"
          >
            <Button
              variant="outline"
              size="icon"
              className="hidden sm:flex border-border/50 hover:border-foreground/20"
            >
              <BriefcaseBusiness />
            </Button>
          </Link>
          <Link
            href="https://linkedin.com/in/josemaurette"
            target="_blank"
            rel="noreferrer"
          >
            <Button
              variant="outline"
              size="icon"
              className="hidden sm:flex border-border/50 hover:border-foreground/20"
            >
              <Linkedin className="h-4 w-4" />
            </Button>
          </Link>
          <Link
            href="https://www.instagram.com/hose_04/"
            target="_blank"
            rel="noreferrer"
          >
            <Button
              variant="outline"
              size="icon"
              className="hidden sm:flex border-border/50 hover:border-foreground/20"
            >
              <Instagram className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
        className="md:mt-8 sm:mt-8 mt-0"
      >
        <Link href={"/workouts"}>
          <Button>
            Get Started <CircleArrowRight />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default LoginPage;
