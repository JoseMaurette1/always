"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Download } from "lucide-react";

import React from "react";
import WorkoutHistory from "../components/WorkoutHistory";
import { motion } from "framer-motion";

const Page = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <WorkoutHistory />
      <div className="flex items-center justify-center mt-4">
        <Link href={"/install"}>
          <Button variant="outline" className="">
            Always
            <Download className="mr-2" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default Page;
