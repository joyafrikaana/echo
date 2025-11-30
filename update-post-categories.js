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

const postCategories = [
  { slug: "visual-storytelling-modern-branding", categories: ["Branding"] },
  {
    slug: "content-mapping-blueprint-marketing-success",
    categories: ["Content"],
  },
  { slug: "social-media-trends-2026", categories: ["Social Media"] },
  { slug: "5-photography-tips-brand-content", categories: ["Tips & Tricks"] },
  { slug: "building-brand-trust-digital-age", categories: ["Branding"] },
  { slug: "color-psychology-brand-design", categories: ["Branding"] },
  {
    slug: "video-marketing-capturing-attention",
    categories: ["Content", "Social Media"],
  },
  {
    slug: "corporate-events-instagram-worthy-moments",
    categories: ["Social Media", "Branding"],
  },
  {
    slug: "influencer-partnerships-finding-right-fit",
    categories: ["Social Media"],
  },
  {
    slug: "behind-lens-professional-brand-photography",
    categories: ["Tips & Tricks", "Content"],
  },
];

async function updatePostCategories() {
  try {
    console.log("📝 Updating post categories...\n");

    // Get all categories
    const categories = await client.fetch(
      `*[_type == "category"] { _id, title }`
    );
    console.log(`Found ${categories.length} categories.\n`);

    let updated = 0;

    for (const postData of postCategories) {
      // Find the post by slug
      const post = await client.fetch(
        `*[_type == "post" && slug.current == $slug][0]`,
        { slug: postData.slug }
      );

      if (!post) {
        console.log(`⚠️  Post not found: ${postData.slug}`);
        continue;
      }

      // Find category references
      const categoryRefs = postData.categories
        .map((catTitle) => {
          const cat = categories.find((c) => c.title === catTitle);
          if (cat) {
            return {
              _type: "reference",
              _ref: cat._id,
              _key: Math.random().toString(36).substring(2, 15),
            };
          }
          return null;
        })
        .filter(Boolean);

      // Update the post with categories
      await client.patch(post._id).set({ categories: categoryRefs }).commit();

      console.log(
        `✅ Updated: "${
          post.title
        }" with categories: ${postData.categories.join(", ")}`
      );
      updated++;
    }

    console.log(`\n🎉 Successfully updated ${updated} posts!\n`);
  } catch (error) {
    console.error("❌ Error updating posts:", error.message);
    process.exit(1);
  }
}

updatePostCategories();
