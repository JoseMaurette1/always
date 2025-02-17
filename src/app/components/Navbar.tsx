import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
        <div>{/* Left side content can go here if any */}</div>
        <div className="flex items-center space-x-4 md:mr-4">
          <Link href={"/Updates"}>
            <Button>Patch Notes</Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
