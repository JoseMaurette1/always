import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CircleArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen  text-gray-800">
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
          Showcase version, full version is private
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
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
