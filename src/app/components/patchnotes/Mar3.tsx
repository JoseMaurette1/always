import React from "react";
import Link from "next/link";

const Mar3 = () => {
  return (
    <>
      <article className="prose lg:prose-xl">
        <small className="text-gray-500">Published: February 16, 2025</small>
        <h2>New Features:</h2>
        <ul>
          <li>
            Merged with{" "}
            <Link
              className="underline text-blue-500 text-lg"
              href={"https://Macrotrue.vercel.app/"}
            >
              Macrotrue
            </Link>
          </li>
        </ul>
        <br />
      </article>
    </>
  );
};

export default Mar3;
