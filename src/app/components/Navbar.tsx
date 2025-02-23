"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.div
      className="border-b"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center ml-[15rem] md:ml-[15rem]">
          <Link href={"/"}>
            <h1 className="text-2xl font-bold tracking-tighter">Always</h1>
          </Link>
        </div>
        <div className="flex items-center space-x-4 mr-8 md:mr-0">
          <Link href={"/Updates"}>
            <Button>Patch Notes</Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
