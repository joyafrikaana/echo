# Seed Blog Posts Script

This script creates 5 dummy blog posts in your Sanity CMS with proper categories and content.

## Prerequisites

1. **Sanity Studio Running**: Make sure your Sanity Studio is set up
2. **Categories Created**: You need at least these categories in Sanity:
   - Branding
   - Content
   - Social Media
   - Tips & Tricks

## Setup Instructions

### Step 1: Get Your Write Token

1. Go to [Sanity.io Manage](https://www.sanity.io/manage)
2. Select your project: **Echo Media HQ** (kuqcfg5r)
3. Navigate to **Settings** → **API** → **Tokens**
4. Click **Add API token**
5. Give it a name (e.g., "Blog Seeder")
6. Set permissions to **Editor** or **Administrator**
7. Copy the token

### Step 2: Add Token to .env File

Open the `.env` file and replace `your_write_token_here` with your actual token:

```env
SANITY_PROJECT_ID=kuqcfg5r
SANITY_DATASET=production
SANITY_API_VERSION=2025-01-01
SANITY_WRITE_TOKEN=skAbCdEf1234567890xYzAbCdEf1234567890xYz
```

⚠️ **Important**: Never commit the `.env` file with your token to git!

### Step 3: Create Categories (If Not Already Done)

Before running the seed script, make sure you have categories in Sanity:

1. Open Sanity Studio: http://localhost:3333
2. Go to **Categories**
3. Create these categories:
   - **Branding** - "Everything about brand identity and strategy"
   - **Content** - "Content creation and strategy"
   - **Social Media** - "Social media marketing and trends"
   - **Tips & Tricks** - "Practical tips and how-to guides"

### Step 4: Run the Seed Script

```bash
npm run seed
```

## What the Script Does

✅ Connects to Sanity with write permissions
✅ Fetches existing categories from your Sanity project
✅ Creates a default author if none exists
✅ Creates 5 blog posts with:

- Title
- Slug (URL-friendly)
- Excerpt
- Full body content (multiple paragraphs)
- Category references
- Published date

✅ Skips posts that already exist (checks by slug)
✅ Provides detailed console output

## The 5 Dummy Posts

1. **The Power of Visual Storytelling in Modern Branding** (Branding)
2. **Content Mapping: The Blueprint for Marketing Success** (Content)
3. **Social Media Trends to Watch in 2026** (Social Media)
4. **5 Photography Tips for Better Brand Content** (Tips & Tricks)
5. **Building Brand Trust in the Digital Age** (Branding)

## After Running the Script

1. Open Sanity Studio
2. Go to **Posts**
3. You'll see 5 new posts
4. Add featured images to make them look better
5. Publish them if they're in draft state
6. Visit your blog page to see them live!

## Troubleshooting

### Error: "SANITY_WRITE_TOKEN not found"

- Make sure you've added the token to `.env`
- Check that there are no typos in the variable name

### Error: "No categories found"

- Create the categories in Sanity Studio first
- Run the script again after creating categories

### Error: "Unauthorized" or "Permission denied"

- Make sure your token has Editor or Administrator permissions
- Try creating a new token with the correct permissions

### Posts created but not showing on blog

- Check if posts are published (not drafts)
- Make sure categories are assigned
- Add featured images in Sanity Studio

## Script Features

- **Safe**: Only creates posts that don't already exist
- **Smart**: Automatically finds and uses existing categories
- **Flexible**: Easy to modify post content in the script
- **Detailed**: Provides clear console output of all operations

## Customizing Posts

To customize the dummy posts, edit `seed-blog-posts.js` and modify the `dummyPosts` array. Each post object has:

```javascript
{
  title: 'Your Post Title',
  slug: 'your-post-slug',
  excerpt: 'Short description',
  body: [...], // Array of content blocks
  mainImageUrl: 'https://...', // For reference
  categories: ['Category Name'],
  publishedAt: '2025-11-20T10:00:00Z',
}
```

## Need Help?

Check the console output - it provides detailed information about:

- Categories found
- Author creation
- Each post created or skipped
- Any errors encountered

---

**Note**: Images are not automatically uploaded by this script. Add them manually in Sanity Studio for the best visual experience.
