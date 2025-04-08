const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { config } = require("dotenv");

// Load environment variables from .env.local and .env.production
config({ path: ".env.local" });
config({ path: ".env.production" });

// Ensure environment variables are available
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  // Fall back to hardcoded values if not available from environment
  process.env.NEXT_PUBLIC_SUPABASE_URL =
    "https://ohdogbczynddtogdjbhg.supabase.co";
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oZG9nYmN6eW5kZHRvZ2RqYmhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxMzQ2NjUsImV4cCI6MjA1OTcxMDY2NX0.wAEecwxkoITczVw5_rdaZwCjjP8RDirxkBzrXyk6W-s";
}

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

// Initialize Next.js
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Parse URL
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      // Let Next.js handle the request
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("Internal server error");
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
