import React from "react";
import { Share } from "lucide-react";
import { Download } from "lucide-react";

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">
          How to install Always
        </h1>
        <p className="text-center">
          This is a step by step guide to install Always as a{" "}
          <span className="font-bold">Progressive Web App (PWA).</span>
        </p>

        <h2 className="text-xl font-bold mt-4">
          Instructions for Safari (iOS)
        </h2>
        <p className="text-sm">
          <span className="font-bold">Step 1:</span> Open Safari on your iPhone
          and navigate to{" "}
          <a
            href="https://alwaysv1.vercel.app"
            className="inline-flex items-center gap-1 font-bold underline"
          >
            Always&apos;s website <Share className="w-4 h-4" />
          </a>
        </p>
        <p className="text-sm">
          <span className="font-bold">Step 2:</span> Tap the{" "}
          <span className="font-bold inline-flex items-center gap-1">
            Share <Share className="w-4 h-4" />
          </span>{" "}
          button (a square with an arrow pointing up) located at the bottom of
          your screen.
        </p>
        <p className="text-sm">
          <span className="font-bold">Step 3:</span> Scroll down in the menu and
          select{" "}
          <span className="font-bold">&quot;Add to Home Screen&quot;</span>.
        </p>
        <p className="text-sm">
          <span className="font-bold">Step 4:</span> Tap{" "}
          <span className="font-bold">Add</span> in the top-right corner of the
          screen.
        </p>
        <p className="text-sm">
          <span className="font-bold">Step 5:</span> Always will now appear as
          an app icon on your home screen. Tap it to launch the app.
        </p>

        <h2 className="text-xl font-bold mt-4">
          Instructions for Chrome (iOS & Android)
        </h2>
        <p className="text-sm">
          <span className="font-bold">Step 1:</span> Open Google Chrome and
          visit{" "}
          <a
            href="https://alwaysv1.vercel.app"
            className="inline-flex items-center gap-1 font-bold underline"
          >
            Always&apos;s website <Share className="w-4 h-4" />
          </a>
        </p>
        <p className="text-sm">
          <span className="font-bold">Step 2:</span> Tap the{" "}
          <span className="font-bold inline-flex items-center gap-1">
            Share <Share className="w-4 h-4" />
          </span>{" "}
          button (a square with an arrow pointing up) in the top-right corner of
          the browser.
        </p>
        <p className="text-sm">
          <span className="font-bold">Step 3:</span> In the Share menu, scroll
          down and select{" "}
          <span className="font-bold">&quot;Add to Home Screen&quot;</span>.
        </p>
        <p className="text-sm">
          <span className="font-bold">Step 4:</span> Confirm by tapping{" "}
          <span className="font-bold">Add</span>, and Always will be added to
          your home screen as a PWA.
        </p>
        <p className="text-sm">
          <span className="font-bold">Step 5:</span> Tap the Always icon on your
          home screen to launch the app.
        </p>
      </div>
    </div>
  );
};

export default page;
