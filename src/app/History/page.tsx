"use client";

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
    </motion.div>
  );
};

export default Page;
