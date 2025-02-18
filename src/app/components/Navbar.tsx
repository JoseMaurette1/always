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
        <div>{/* Left Content */}</div>
        <div className="flex items-center space-x-4 mr-12 md:mr-12">
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
