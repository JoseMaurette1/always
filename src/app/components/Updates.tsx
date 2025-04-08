"use client";

import React from "react";
import Markdown from "markdown-to-jsx";
import { type Update } from "../lib/updates";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface UpdatesProps {
  updates: Update[];
}

const Updates = ({ updates }: UpdatesProps) => {
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
                <div className="space-y-12">
                  {updates.map((update: Update) => (
                    <article
                      key={update.id}
                      className="prose dark:prose-invert max-w-none"
                    >
                      <div className="mb-4">
                        <h2 className="text-2xl font-semibold">
                          {update.title}
                        </h2>
                        <time className="text-gray-500 text-sm">
                          {new Date(update.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                      </div>
                      <Markdown>{update.content}</Markdown>
                    </article>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Updates;
