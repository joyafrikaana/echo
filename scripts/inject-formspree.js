#!/usr/bin/env node
// Simple build-time injector for the Formspree endpoint
// Usage: run `node scripts/inject-formspree.js` before publishing/building

import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Load .env if present
dotenv.config();

const ENTRY = process.env.FORMSPREE_ENDPOINT || process.env.FORMSPREE_ENDPOINT;
if (!ENTRY) {
  console.error(
    "No Formspree endpoint found. Set FORMSPREE_ENDPOINT in .env or env."
  );
  process.exitCode = 1;
  process.exit(1);
}

const root = path
  .resolve(new URL(import.meta.url).pathname)
  .split("/scripts/")[0]
  .replace(/^[A-Z]:/i, (m) => m);
// When running on Windows, import.meta.url path has a leading /; adjust to platform path
const contactPath = path.join(root, "contact.html");

try {
  let html = fs.readFileSync(contactPath, "utf8");
  const replaced = html.replace(/__FORMSPREE_ENDPOINT__/g, ENTRY);
  fs.writeFileSync(contactPath, replaced, "utf8");
  console.log(`Injected Formspree endpoint into ${contactPath}`);
} catch (err) {
  console.error("Failed to inject endpoint:", err);
  process.exit(1);
}
