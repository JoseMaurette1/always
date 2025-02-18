"use client";

import React from "react";
import Feb16 from "./patchnotes/Feb16";
import Feb17 from "./patchnotes/Feb17";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const Updates = () => {
  return (
    <>
      <motion.div
        className="flex items-center justify-center min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="container mx-auto py-8">
          <motion.h1
            className="text-2xl md:text-3xl font-bold text-center mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
          >
            <Link href={"/"}>
              <ArrowLeft /> Latest Updates
            </Link>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.4 }}
          >
            <ScrollArea className="h-[70vh] md:h-[500px] w-full rounded-md border">
              <div className="p-4">
                <Feb17 />
                <Feb16 />
                {/* Add more patch note components here */}
              </div>
            </ScrollArea>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Updates;
