import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import fetch from "node-fetch";
import path from "path";
import { createReadStream, promises as fs } from "fs";

// Load environment variables
dotenv.config();

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || "kuqcfg5r",
  dataset: process.env.SANITY_DATASET || "production",
  useCdn: false,
  apiVersion: process.env.SANITY_API_VERSION || "2025-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
});

const postImages = [
  {
    slug: "visual-storytelling-modern-branding",
    url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200",
  },
  {
    slug: "content-mapping-blueprint-marketing-success",
    url: "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?w=1200",
  },
  {
    slug: "social-media-trends-2026",
    url: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=1200",
  },
  {
    slug: "5-photography-tips-brand-content",
    url: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=1200",
  },
  {
    slug: "building-brand-trust-digital-age",
    url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200",
  },
  {
    slug: "color-psychology-brand-design",
    url: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200",
  },
  {
    slug: "video-marketing-capturing-attention",
    url: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1200",
  },
  {
    slug: "corporate-events-instagram-worthy-moments",
    url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200",
  },
  {
    slug: "influencer-partnerships-finding-right-fit",
    url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200",
  },
  {
    slug: "behind-lens-professional-brand-photography",
    url: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200",
  },
];

async function downloadImage(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download image: ${url}`);
  const buffer = await res.buffer();
  await fs.writeFile(dest, buffer);
}

async function addCoverImages() {
  try {
    console.log("\n🖼️  Adding cover images to blog posts...\n");
    for (const { slug, url } of postImages) {
      // Find the post by slug
      const post = await client.fetch(
        `*[_type == "post" && slug.current == $slug][0]`,
        { slug }
      );
      if (!post) {
        console.log(`⚠️  Post not found: ${slug}`);
        continue;
      }
      // Download image to temp file
      const filename = path.join(".tmp", `${slug}.jpg`);
      await fs.mkdir(".tmp", { recursive: true });
      await downloadImage(url, filename);
      // Upload image as asset
      const asset = await client.assets.upload(
        "image",
        createReadStream(filename),
        {
          filename: `${slug}.jpg`,
        }
      );
      // Patch post with mainImage
      await client
        .patch(post._id)
        .set({
          mainImage: {
            _type: "image",
            asset: { _type: "reference", _ref: asset._id },
          },
        })
        .commit();
      console.log(`✅ Added cover image to: ${post.title}`);
      // Clean up temp file
      await fs.unlink(filename);
    }
    // Remove temp directory
    await fs.rmdir(".tmp");
    console.log("\n🎉 All cover images added!\n");
  } catch (error) {
    console.error("❌ Error adding cover images:", error.message);
    process.exit(1);
  }
}

addCoverImages();
