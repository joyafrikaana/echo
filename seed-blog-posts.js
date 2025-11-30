import { createClient } from "@sanity/client";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Helper function to generate unique keys
function generateKey() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

// Initialize Sanity client with write token
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || "kuqcfg5r",
  dataset: process.env.SANITY_DATASET || "production",
  useCdn: false, // Must be false for write operations
  apiVersion: process.env.SANITY_API_VERSION || "2025-01-01",
  token: process.env.SANITY_WRITE_TOKEN, // Write token from environment
});

// Dummy blog posts data
const dummyPosts = [
  {
    title: "The Power of Visual Storytelling in Modern Branding",
    slug: "visual-storytelling-modern-branding",
    excerpt:
      "In today's digital landscape, brands that tell compelling visual stories stand out. Learn how to leverage photography, videography, and design to create emotional connections with your audience.",
    body: [
      {
        _type: "block",
        _key: generateKey(),
        children: [
          {
            _type: "span",
            _key: generateKey(),
            text: "In today's digital landscape, brands that tell compelling visual stories stand out. Visual storytelling has become one of the most powerful tools in modern branding, allowing companies to create emotional connections with their audience that go beyond traditional marketing.",
          },
        ],
        style: "normal",
      },
      {
        _type: "block",
        _key: generateKey(),
        children: [
          {
            _type: "span",
            _key: generateKey(),
            text: "The human brain processes images 60,000 times faster than text, making visual content an essential component of any successful brand strategy. From photography to videography, the way you present your brand visually can make or break your connection with your target audience.",
          },
        ],
        style: "normal",
      },
      {
        _type: "block",
        _key: generateKey(),
        children: [
          {
            _type: "span",
            _key: generateKey(),
            text: "Learn how to leverage photography, videography, and design to create emotional connections with your audience and build lasting brand recognition.",
          },
        ],
        style: "normal",
      },
    ],
    mainImageUrl:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200",
    categories: ["Branding"],
    publishedAt: "2025-11-20T10:00:00Z",
  },
  {
    title: "Content Mapping: The Blueprint for Marketing Success",
    slug: "content-mapping-blueprint-marketing-success",
    excerpt:
      "Strategic content mapping transforms marketing efforts by creating a consistent brand narrative across all channels. Discover the essential steps to develop an effective content strategy.",
    body: [
      {
        _type: "block",
        _key: generateKey(),
        children: [
          {
            _type: "span",
            _key: generateKey(),
            text: "Content mapping is the strategic process of planning, creating, and organizing content to align with your audience's journey and business goals. It's the blueprint that ensures every piece of content serves a purpose and moves your audience closer to conversion.",
          },
        ],
        style: "normal",
      },
      {
        _type: "block",
        _key: generateKey(),
        children: [
          {
            _type: "span",
            _key: generateKey(),
            text: "A well-executed content map helps you identify content gaps, avoid duplication, and ensure consistency across all marketing channels. It transforms random content creation into a strategic, goal-oriented process that delivers measurable results.",
          },
        ],
        style: "normal",
      },
    ],
    mainImageUrl:
      "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?w=1200",
    categories: ["Content"],
    publishedAt: "2025-11-15T10:00:00Z",
  },
  {
    title: "Social Media Trends to Watch in 2026",
    slug: "social-media-trends-2026",
    excerpt:
      "Stay ahead of the curve with insights into emerging social media trends that will shape digital marketing in the coming year. From AI-powered content to authentic storytelling.",
    body: [
      {
        _type: "block",
        _key: generateKey(),
        children: [
          {
            _type: "span",
            _key: generateKey(),
            text: "As we approach 2026, the social media landscape continues to evolve at a rapid pace. Staying ahead of these trends is crucial for brands looking to maintain relevance and engagement with their audiences.",
          },
        ],
        style: "normal",
      },
      {
        _type: "block",
        _key: generateKey(),
        children: [
          {
            _type: "span",
            _key: generateKey(),
            text: "From AI-powered content creation to the rise of authentic storytelling, brands need to adapt their strategies to meet changing consumer expectations. Short-form video content continues to dominate, while new platforms emerge to challenge established players.",
          },
        ],
        style: "normal",
      },
      {
        _type: "block",
        _key: generateKey(),
        children: [
          {
            _type: "span",
            _key: generateKey(),
            text: "Understanding these trends and incorporating them into your social media strategy will be key to success in the coming year.",
          },
        ],
        style: "normal",
      },
    ],
    mainImageUrl:
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=1200",
    categories: ["Social Media"],
    publishedAt: "2025-11-12T10:00:00Z",
  },
  {
    title: "5 Photography Tips for Better Brand Content",
    slug: "5-photography-tips-brand-content",
    excerpt:
      "Professional photography doesn't have to be complicated. These simple tips will elevate your visual content immediately and help your brand stand out.",
    body: [
      {
        _type: "block",
        _key: generateKey(),
        children: [
          {
            _type: "span",
            _key: generateKey(),
            text: "Great photography is essential for creating compelling brand content. Whether you're showcasing products, documenting events, or building your brand story, these five essential tips will help you capture stunning images.",
          },
        ],
        style: "normal",
      },
      {
        _type: "block",
        _key: generateKey(),
        children: [
          {
            _type: "span",
            _key: generateKey(),
            text: "1. Master natural lighting - The golden hour provides the most flattering light for photography.",
          },
        ],
        style: "normal",
      },
      {
        _type: "block",
        _key: generateKey(),
        children: [
          {
            _type: "span",
            _key: generateKey(),
            text: "2. Understand composition - Use the rule of thirds to create balanced, engaging images.",
          },
        ],
        style: "normal",
      },
      {
        _type: "block",
        _key: generateKey(),
        children: [
          {
            _type: "span",
            _key: generateKey(),
            text: "3. Focus on details - Close-up shots can tell powerful stories and highlight product features.",
          },
        ],
        style: "normal",
      },
    ],
    mainImageUrl:
      "https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=1200",
    categories: ["Tips & Tricks"],
    publishedAt: "2025-11-10T10:00:00Z",
  },
  {
    title: "Building Brand Trust in the Digital Age",
    slug: "building-brand-trust-digital-age",
    excerpt:
      "Trust is the foundation of lasting customer relationships. Learn strategies to build and maintain brand credibility online through authentic engagement and consistent messaging.",
    body: [
      {
        _type: "block",
        _key: generateKey(),
        children: [
          {
            _type: "span",
            _key: generateKey(),
            text: "In an era of increasing skepticism and information overload, building trust with your audience is more important than ever. Brand trust is the foundation of lasting customer relationships and sustainable business growth.",
          },
        ],
        style: "normal",
      },
      {
        _type: "block",
        _key: generateKey(),
        children: [
          {
            _type: "span",
            _key: generateKey(),
            text: "Transparency, consistency, and authentic engagement are key to establishing credibility in the digital space. Brands that prioritize honest communication and deliver on their promises will win customer loyalty in the long run.",
          },
        ],
        style: "normal",
      },
      {
        _type: "block",
        _key: generateKey(),
        children: [
          {
            _type: "span",
            _key: generateKey(),
            text: "From social proof to customer testimonials, there are many ways to demonstrate your brand's reliability and build trust with your audience.",
          },
        ],
        style: "normal",
      },
    ],
    mainImageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200",
    categories: ["Branding"],
    publishedAt: "2025-11-08T10:00:00Z",
  },
  {
    title: "The Art of Color Psychology in Brand Design",
    slug: "color-psychology-brand-design",
    excerpt:
      "Colors evoke emotions and influence decisions. Discover how to leverage color psychology to create memorable brand identities that resonate with your target audience.",
    body: [
      {
        _type: "block",
        _key: generateKey(),
        children: [
          {
            _type: "span",
            _key: generateKey(),
            text: "Color is one of the most powerful tools in a designer's arsenal. The psychology of color plays a crucial role in how audiences perceive and connect with brands. Each color carries its own emotional weight and cultural significance.",
          },
        ],
        style: "normal",
      },
      {
        _type: "block",
        _key: generateKey(),
        children: [
          {
            _type: "span",
            _key: generateKey(),
            text: "Red evokes passion and urgency, blue builds trust and professionalism, while green represents growth and sustainability. Understanding these associations helps brands communicate their values effectively through visual design.",
          },
        ],
        style: "normal",
      },
      {
        _type: "block",
        _key: generateKey(),
        children: [
          {
            _type: "span",
            _key: generateKey(),
            text: "When choosing your brand colors, consider your industry, target audience, and the emotions you want to evoke. A well-chosen color palette can increase brand recognition by up to 80%.",
          },
        ],
        style: "normal",
      },
    ],
    mainImageUrl:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200",
    categories: ["Branding"],
    publishedAt: "2025-11-05T10:00:00Z",
  },
  {
    title: "Video Marketing: Capturing Attention in 3 Seconds",
    slug: "video-marketing-capturing-attention",
    excerpt:
      "In the age of scrolling, you have just 3 seconds to capture attention. Learn the essential techniques for creating thumb-stopping video content that converts.",
    body: [
      {
        _type: "block",
        _key: generateKey(),
        children: [
          {
            _type: "span",
            _key: generateKey(),
            text: "The average attention span online is now shorter than a goldfish's. This means your video content needs to hook viewers within the first 3 seconds or risk being scrolled past forever.",
          },
        ],
        style: "normal",
      },
      {
        _type: "block",
        _key: generateKey(),
        children: [
          {
            _type: "span",
            _key: generateKey(),
            text: "Start with a visual hook - movement, bright colors, or an intriguing question. Use text overlays for sound-off viewing, which accounts for 85% of video consumption on social media. Keep your message clear and concise.",
          },
        ],
        style: "normal",
      },
      {
        _type: "block",
        _key: generateKey(),
        children: [
          {
            _type: "span",
            _key: generateKey(),
            text: "The best performing videos tell a story in under 60 seconds, feature real people, and include a clear call to action. Remember: it's not about being perfect, it's about being authentic and engaging.",
          },
        ],
        style: "normal",
      },
    ],
    mainImageUrl:
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1200",
    categories: ["Content", "Social Media"],
    publishedAt: "2025-11-03T10:00:00Z",
  },
  {
    title: "Corporate Events: Creating Instagram-Worthy Moments",
    slug: "corporate-events-instagram-worthy-moments",
    excerpt:
      "Transform your corporate events into social media goldmines. Learn how to design experiences that attendees can't help but share online.",
    body: [
      {
        _type: "block",
        _key: generateKey(),
        children: [
          {
            _type: "span",
            _key: generateKey(),
            text: "In today's digital age, the success of a corporate event is often measured by its social media reach. Creating Instagram-worthy moments isn't just about aesthetics - it's about designing experiences that naturally encourage sharing.",
          },
        ],
        style: "normal",
      },
      {
        _type: "block",
        _key: generateKey(),
        children: [
          {
            _type: "span",
            _key: generateKey(),
            text: "Think beyond the standard backdrop. Interactive installations, unique lighting setups, and branded photo opportunities give attendees reasons to pull out their phones. Every shareable moment extends your event's reach exponentially.",
          },
        ],
        style: "normal",
      },
      {
        _type: "block",
        _key: generateKey(),
        children: [
          {
            _type: "span",
            _key: generateKey(),
            text: "Create a custom event hashtag, offer incentives for social sharing, and ensure good lighting in photo areas. The ROI of a well-documented event continues long after the last guest leaves.",
          },
        ],
        style: "normal",
      },
    ],
    mainImageUrl:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200",
    categories: ["Social Media", "Branding"],
    publishedAt: "2025-11-01T10:00:00Z",
  },
  {
    title: "Influencer Partnerships: Finding the Right Fit",
    slug: "influencer-partnerships-finding-right-fit",
    excerpt:
      "Not all influencers are created equal. Discover how to identify and collaborate with creators who truly align with your brand values and audience.",
    body: [
      {
        _type: "block",
        _key: generateKey(),
        children: [
          {
            _type: "span",
            _key: generateKey(),
            text: "Influencer marketing has evolved beyond follower counts. Today's successful partnerships are built on authentic alignment between brand values and creator content. A micro-influencer with 10K engaged followers often delivers better ROI than a celebrity with millions of disengaged ones.",
          },
        ],
        style: "normal",
      },
      {
        _type: "block",
        _key: generateKey(),
        children: [
          {
            _type: "span",
            _key: generateKey(),
            text: "Look beyond vanity metrics. Analyze engagement rates, audience demographics, and content quality. Does their aesthetic match your brand? Do their values align with yours? Are their followers your target customers?",
          },
        ],
        style: "normal",
      },
      {
        _type: "block",
        _key: generateKey(),
        children: [
          {
            _type: "span",
            _key: generateKey(),
            text: "The best influencer partnerships feel natural, not forced. Give creators creative freedom within brand guidelines. Authenticity resonates with audiences and drives real results.",
          },
        ],
        style: "normal",
      },
    ],
    mainImageUrl:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200",
    categories: ["Social Media"],
    publishedAt: "2025-10-28T10:00:00Z",
  },
  {
    title: "Behind the Lens: A Day in Professional Brand Photography",
    slug: "behind-lens-professional-brand-photography",
    excerpt:
      "Ever wondered what goes into a professional brand photoshoot? Take a behind-the-scenes look at the planning, execution, and post-production process.",
    body: [
      {
        _type: "block",
        _key: generateKey(),
        children: [
          {
            _type: "span",
            _key: generateKey(),
            text: "Professional brand photography is more than pointing and shooting. It starts weeks before the actual shoot with mood boards, location scouting, and detailed shot lists. Every element is carefully planned to ensure the final images align perfectly with brand identity.",
          },
        ],
        style: "normal",
      },
      {
        _type: "block",
        _key: generateKey(),
        children: [
          {
            _type: "span",
            _key: generateKey(),
            text: "On shoot day, we coordinate models, stylists, and assistants while managing lighting, composition, and countless technical details. It's a dance between artistic vision and practical execution, all while maintaining the energy and authenticity that makes images compelling.",
          },
        ],
        style: "normal",
      },
      {
        _type: "block",
        _key: generateKey(),
        children: [
          {
            _type: "span",
            _key: generateKey(),
            text: "Post-production is where the magic truly happens. Color grading, retouching, and final selection transform hundreds of shots into a cohesive set of brand assets that will serve businesses for months or even years to come.",
          },
        ],
        style: "normal",
      },
    ],
    mainImageUrl:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200",
    categories: ["Tips & Tricks", "Content"],
    publishedAt: "2025-10-25T10:00:00Z",
  },
];

// Fetch existing categories from Sanity
async function getCategories() {
  const query = `*[_type == "category"] { _id, title }`;
  const categories = await client.fetch(query);
  console.log("📁 Found categories:", categories);
  return categories;
}

// Check if a post with the same slug already exists
async function postExists(slug) {
  const query = `*[_type == "post" && slug.current == $slug][0]`;
  const post = await client.fetch(query, { slug });
  return !!post;
}

// Create or fetch author
async function getOrCreateAuthor() {
  const query = `*[_type == "author"][0]`;
  let author = await client.fetch(query);

  if (!author) {
    console.log("👤 Creating default author...");
    author = await client.create({
      _type: "author",
      name: "Echo Team",
      slug: { _type: "slug", current: "echo-team" },
      bio: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "The creative team at Echo by Octography, dedicated to helping brands stand out.",
            },
          ],
        },
      ],
    });
    console.log("✅ Author created:", author._id);
  }

  return author;
}

// Create a blog post in Sanity
async function createPost(postData, categories, author) {
  // Find category references
  const categoryRefs = postData.categories
    .map((catTitle) => {
      const cat = categories.find((c) => c.title === catTitle);
      if (cat) {
        return { _type: "reference", _ref: cat._id };
      }
      return null;
    })
    .filter(Boolean);

  // Create the post document
  const post = {
    _type: "post",
    title: postData.title,
    slug: {
      _type: "slug",
      current: postData.slug,
    },
    author: {
      _type: "reference",
      _ref: author._id,
    },
    categories: categoryRefs,
    publishedAt: postData.publishedAt,
    body: postData.body,
    // Note: mainImage would need to be uploaded as an asset
    // For now, we'll skip the image and you can add it manually in the studio
  };

  return await client.create(post);
}

// Main seeding function
async function seedBlogPosts() {
  try {
    console.log("🚀 Starting blog post seeding...\n");

    // Check if write token is provided
    if (!process.env.SANITY_WRITE_TOKEN) {
      throw new Error(
        "❌ SANITY_WRITE_TOKEN not found in environment variables.\n" +
          "Please add your write token to the .env file:\n" +
          "SANITY_WRITE_TOKEN=your_token_here"
      );
    }

    console.log("📋 Configuration:");
    console.log(`   Project ID: ${process.env.SANITY_PROJECT_ID}`);
    console.log(`   Dataset: ${process.env.SANITY_DATASET}`);
    console.log(`   API Version: ${process.env.SANITY_API_VERSION}`);
    console.log(
      `   Token: ${process.env.SANITY_WRITE_TOKEN.substring(0, 10)}...`
    );
    console.log("");

    // Test the connection first
    console.log("🔌 Testing Sanity connection...");
    try {
      const testQuery = `*[_type == "category"][0]`;
      await client.fetch(testQuery);
      console.log("✅ Connection successful!\n");
    } catch (connError) {
      console.error("❌ Connection failed!");
      console.error("\n📝 Possible solutions:");
      console.error("1. Check that your token is valid and not expired");
      console.error("2. Generate a NEW token at: https://www.sanity.io/manage");
      console.error("   - Go to your project > Settings > API > Tokens");
      console.error('   - Click "Add API token"');
      console.error("   - Give it Editor or Administrator permissions");
      console.error("   - Copy the NEW token to your .env file");
      console.error("3. Make sure the token has access to project: kuqcfg5r");
      console.error("4. Try deleting the old token and creating a fresh one\n");
      throw connError;
    }

    // Fetch categories
    const categories = await getCategories();
    if (categories.length === 0) {
      console.log(
        "⚠️  No categories found. Please create categories in Sanity Studio first."
      );
      console.log("\n📝 Create these categories in Sanity Studio:");
      console.log("   - Branding");
      console.log("   - Content");
      console.log("   - Social Media");
      console.log("   - Tips & Tricks\n");
      return;
    }

    // Get or create author
    const author = await getOrCreateAuthor();

    console.log("\n📝 Processing blog posts...\n");

    let created = 0;
    let skipped = 0;

    for (const postData of dummyPosts) {
      // Check if post already exists
      const exists = await postExists(postData.slug);

      if (exists) {
        console.log(`⏭️  Skipped: "${postData.title}" (already exists)`);
        skipped++;
      } else {
        const newPost = await createPost(postData, categories, author);
        console.log(`✅ Created: "${postData.title}" (ID: ${newPost._id})`);
        created++;
      }
    }

    console.log(`\n🎉 Seeding complete!`);
    console.log(`   Created: ${created} posts`);
    console.log(`   Skipped: ${skipped} posts`);
    console.log(
      "\n💡 Tip: Add images to your posts in Sanity Studio for better visuals!\n"
    );
  } catch (error) {
    console.error("❌ Error seeding blog posts:", error.message);
    if (error.details) {
      console.error("Details:", error.details);
    }
    process.exit(1);
  }
}

// Run the seeding script
seedBlogPosts();
