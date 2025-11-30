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

const categories = [
  {
    title: "Branding",
    description:
      "Articles about brand identity, design, and visual storytelling that help businesses stand out in their market.",
  },
  {
    title: "Content",
    description:
      "Content strategy, content mapping, and creating compelling narratives that resonate with your audience.",
  },
  {
    title: "Social Media",
    description:
      "Social media marketing strategies, trends, and best practices for growing your online presence.",
  },
  {
    title: "Tips & Tricks",
    description:
      "Practical tips and professional advice for improving your marketing, photography, and brand content.",
  },
];

async function seedCategories() {
  try {
    console.log("📁 Checking existing categories...\n");

    // Get existing categories
    const existingCategories = await client.fetch(`*[_type == "category"]`);

    console.log(`Found ${existingCategories.length} existing categories.\n`);

    // Update or create categories
    for (const category of categories) {
      const existing = existingCategories.find(
        (c) => c.title === category.title
      );

      if (existing) {
        // Update existing category
        const updated = await client
          .patch(existing._id)
          .set({ description: category.description })
          .commit();
        console.log(`✅ Updated: "${updated.title}" (ID: ${updated._id})`);
      } else {
        // Create new category
        const newCategory = await client.create({
          _type: "category",
          title: category.title,
          description: category.description,
        });
        console.log(
          `✅ Created: "${newCategory.title}" (ID: ${newCategory._id})`
        );
      }
    }

    console.log("\n🎉 Categories updated successfully!\n");
  } catch (error) {
    console.error("❌ Error seeding categories:", error.message);
    process.exit(1);
  }
}

seedCategories();
