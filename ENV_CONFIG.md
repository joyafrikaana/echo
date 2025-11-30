# Environment Variables Configuration

## Overview

Your Sanity CMS credentials are now managed through environment variables and meta tags for better security and flexibility.

## Configuration Files

### 1. `.env` (Local Development)

Contains your Sanity credentials:

```env
SANITY_PROJECT_ID=kuqcfg5r
SANITY_DATASET=production
SANITY_API_VERSION=2025-01-01
```

**Note:** This file is not committed to git for security.

### 2. `scripts/config.js`

Loads configuration from HTML meta tags:

```javascript
const config = {
  sanity: {
    projectId: "kuqcfg5r",
    dataset: "production",
    apiVersion: "2025-01-01",
  },
};
```

### 3. HTML Meta Tags

Configuration is embedded in `blog.html` and `test-sanity.html`:

```html
<meta name="sanity-project-id" content="kuqcfg5r" />
<meta name="sanity-dataset" content="production" />
<meta name="sanity-api-version" content="2025-01-01" />
```

## How to Update Configuration

### Option 1: Update Meta Tags (Recommended for Production)

Edit the meta tags in your HTML files:

**blog.html:**

```html
<meta name="sanity-project-id" content="YOUR_NEW_PROJECT_ID" />
<meta name="sanity-dataset" content="YOUR_DATASET" />
```

### Option 2: Update .env File (Development Only)

Edit `.env` file:

```env
SANITY_PROJECT_ID=your_new_project_id
SANITY_DATASET=your_dataset
SANITY_API_VERSION=2025-01-01
```

## Files Using Configuration

1. **scripts/sanity-client.js** - Main Sanity client
2. **scripts/blog.js** - Blog page functionality
3. **test-sanity.html** - Connection test page

## Security Best Practices

✅ **DO:**

- Keep `.env` in `.gitignore`
- Use meta tags for public frontend apps
- Use environment variables for server-side code

❌ **DON'T:**

- Commit `.env` to git
- Expose API tokens in frontend code
- Hardcode credentials

## Testing Configuration

Run the test page to verify your configuration:

```
Open: test-sanity.html
```

It will show:

- Current configuration values
- Connection status
- Available posts
- Troubleshooting tips

## Deployment

When deploying, make sure to:

1. Update meta tags in HTML files with production values
2. Configure CORS in Sanity for your domain:
   ```bash
   cd echo-by-octography/echo-by-octography
   sanity cors add https://yourdomain.com --credentials
   ```

## Current Configuration

- **Project ID:** kuqcfg5r
- **Dataset:** production
- **API Version:** 2025-01-01
