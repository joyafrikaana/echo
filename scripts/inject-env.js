#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load .env from project root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
dotenv.config({ path: path.join(root, ".env") });

const FORMSPREE = process.env.FORMSPREE_ENDPOINT || "";
const TAWK_SRC = process.env.TAWK_SRC || "";

// Prepare a Tawk snippet that can be injected into HTML files.
// Accept either a raw <script>...</script> block (paste whole snippet into env)
// or a simple URL (the common case). We'll generate a safe loader when a URL is provided.
let TAWK_SNIPPET = "";
if (TAWK_SRC) {
  const srcTrim = TAWK_SRC.toString().trim();
  if (srcTrim.startsWith("<script")) {
    TAWK_SNIPPET = srcTrim;
  } else {
    const safeSrc = srcTrim.replace(/'/g, "\\'");
    TAWK_SNIPPET = `<!-- Tawk loader -->\n<script type="text/javascript">\nvar Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();\n(function(){\nvar s1=document.createElement('script'),s0=document.getElementsByTagName('script')[0];\ns1.async=true;\ns1.src='${safeSrc}';\ns1.charset='UTF-8';\ns1.setAttribute('crossorigin','*');\ns0.parentNode.insertBefore(s1,s0);\n})();\n</script>\n<!-- End Tawk -->`;
  }
}

const IGNORED = new Set(["node_modules", ".git", "dist", ".env"]);

async function copyAndInject(srcDir, destDir) {
  await fs.mkdir(destDir, { recursive: true });
  const entries = await fs.readdir(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    if (IGNORED.has(entry.name)) continue;
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      await copyAndInject(srcPath, destPath);
    } else if (entry.isFile()) {
      let data = await fs.readFile(srcPath);
      const ext = path.extname(entry.name).toLowerCase();
      if (ext === ".html" || ext === ".htm") {
        let text = data.toString("utf8");
        text = text.replace(/__FORMSPREE_ENDPOINT__/g, FORMSPREE);
        text = text.replace(/__TAWK_SRC__/g, TAWK_SRC);

        // If we have a prepared Tawk snippet, inject it before the closing </body>
        if (TAWK_SNIPPET) {
          if (/<\/body>/i.test(text)) {
            text = text.replace(/<\/body>/i, TAWK_SNIPPET + "\n</body>");
          } else {
            // no body tag found — append at the end
            text = text + "\n" + TAWK_SNIPPET;
          }
        }

        await fs.mkdir(path.dirname(destPath), { recursive: true });
        await fs.writeFile(destPath, text, "utf8");
      } else {
        await fs.mkdir(path.dirname(destPath), { recursive: true });
        await fs.copyFile(srcPath, destPath);
      }
    }
  }
}

(async () => {
  try {
    const dist = path.join(root, "dist");
    // Remove existing dist if present
    await fs.rm(dist, { recursive: true, force: true });
    await copyAndInject(root, dist);
    console.log("Built site to", dist);
    if (!FORMSPREE) console.warn("Warning: FORMSPREE_ENDPOINT not set in .env");
    if (!TAWK_SRC) console.warn("Warning: TAWK_SRC not set in .env");
  } catch (err) {
    console.error("Build failed:", err);
    process.exitCode = 1;
  }
})();
