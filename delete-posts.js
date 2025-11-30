import { createClient } from "@sanity/client";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Sanity client
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || "kuqcfg5r",
  dataset: process.env.SANITY_DATASET || "production",
  useCdn: false,
  apiVersion: process.env.SANITY_API_VERSION || "2025-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
});

async function deletePosts() {
  try {
    console.log("🗑️  Deleting existing blog posts...\n");

    const query = `*[_type == "post"]`;
    const posts = await client.fetch(query);

    if (posts.length === 0) {
      console.log("No posts found to delete.");
      return;
    }

    console.log(`Found ${posts.length} posts to delete.`);

    for (const post of posts) {
      await client.delete(post._id);
      console.log(`✅ Deleted: "${post.title}" (ID: ${post._id})`);
    }

    console.log(`\n🎉 Successfully deleted ${posts.length} posts!\n`);
  } catch (error) {
    console.error("❌ Error deleting posts:", error.message);
    process.exit(1);
  }
}

deletePosts();
