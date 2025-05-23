"use client";
import React from "react";
import WorkoutForm from "../components/WorkoutForm";
import { motion } from "framer-motion";

const WorkoutsClientPage = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <WorkoutForm />
      </motion.div>
    </>
  );
};

export default WorkoutsClientPage;
