# Sanity Blog Integration Guide

## Your Sanity Configuration

- **Project ID**: kuqcfg5r
- **Dataset**: production
- **Project Name**: Echo by Octography

## Files Created

1. `scripts/sanity-client.js` - Sanity client configuration and helper functions
2. `scripts/blog.js` - Blog page JavaScript to fetch and display posts from Sanity

## How It Works

The blog page now dynamically loads content from your Sanity CMS:

- Featured post section displays the most recent post
- Blog grid shows all posts with category filtering
- Images are automatically optimized using Sanity's image URL builder

## To Add Blog Posts

1. Go to your Sanity Studio: http://localhost:3333 (or your deployed studio URL)
2. Navigate to the echo-by-octography folder:
   ```
   cd "echo-by-octography/echo-by-octography"
   ```
3. Start Sanity Studio:
   ```
   npm run dev
   ```
4. Create new posts in the studio with:
   - Title
   - Slug (auto-generated from title)
   - Main Image
   - Categories
   - Published Date
   - Body content

## Deployment

To make your blog live, you'll need to:

1. Deploy your Sanity Studio (optional but recommended):
   ```
   cd "echo-by-octography/echo-by-octography"
   sanity deploy
   ```
2. Your frontend will automatically fetch from the production dataset

## Categories in Sanity

Create these categories in your Sanity Studio to match the blog filters:

- Branding
- Content
- Social Media
- Tips & Tricks

## Testing

1. Add a few blog posts in Sanity Studio
2. Open blog.html in your browser
3. Posts should load automatically
4. Try filtering by category

## Troubleshooting

- Check browser console for errors
- Verify Sanity Studio is running
- Ensure posts have all required fields (title, slug, publishedAt)
- Check that your projectId and dataset match in sanity-client.js
