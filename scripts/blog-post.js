import { getPostBySlug, urlFor, formatDate } from "./sanity-client.js";

const hero = document.getElementById("blog-post-hero");
const container = document.getElementById("blog-post-container");

function renderBody(blocks) {
  if (!blocks) return "";
  try {
    return blocks
      .map((block, i) => {
        if (block._type === "block" && Array.isArray(block.children)) {
          return `<p>${block.children
            .map((child, j) => {
              if (child && typeof child.text === "string") {
                return child.text;
              } else {
                console.warn(
                  `Missing or invalid child at block ${i}, child ${j}:`,
                  child
                );
                return "";
              }
            })
            .join("")}</p>`;
        } else {
          console.warn(`Unsupported or malformed block at index ${i}:`, block);
          return "";
        }
      })
      .join("");
  } catch (err) {
    console.error("Error rendering post body:", err);
    return '<div class="error">Error rendering post content.</div>';
  }
}

function getSlugFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("slug");

  function renderBody(blocks) {
    if (!blocks) return "";
    try {
      return blocks
        .map((block, i) => {
          if (block._type === "block" && Array.isArray(block.children)) {
            return `<p>${block.children
              .map((child, j) => {
                if (child && typeof child.text === "string") {
                  return child.text;
                } else {
                  console.warn(
                    `Missing or invalid child at block ${i}, child ${j}:`,
                    child
                  );
                  return "";
                }
              })
              .join("")}</p>`;
          } else {
            console.warn(
              `Unsupported or malformed block at index ${i}:`,
              block
            );
            return "";
          }
        })
        .join("");
    } catch (err) {
      console.error("Error rendering post body:", err);
      return '<div class="error">Error rendering post content.</div>';
    }
  }
}

function renderPost(post) {
  if (!post) {
    container.innerHTML = '<div class="error">Post not found.</div>';
    return;
  }

  // Compose meta (author left, date right)
  const authorMeta = post.author
    ? `<span class="author">${
        post.authorImage
          ? `<img src="${post.authorImage}" alt="${post.author}">`
          : ""
      }${post.author}</span>`
    : "";
  const dateMeta = post.publishedAt
    ? `<span class="modern-date" style="display:inline-flex;align-items:center;gap:6px;margin-left:12px;">
        <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='none' viewBox='0 0 24 24' stroke='currentColor' style='vertical-align:middle;opacity:0.7;'><rect x='3' y='5' width='18' height='16' rx='2' fill='#e0e7ff' stroke='#8b949e' stroke-width='1.5'/><path d='M8 3v4M16 3v4' stroke='#8b949e' stroke-width='1.5' stroke-linecap='round'/><rect x='7' y='9' width='2' height='2' rx='0.5' fill='#8b949e'/><rect x='11' y='9' width='2' height='2' rx='0.5' fill='#8b949e'/><rect x='15' y='9' width='2' height='2' rx='0.5' fill='#8b949e'/></svg>
        ${formatDate(post.publishedAt)}
      </span>`
    : "";

  // Compose categories
  const categories =
    post.categories && post.categories.length
      ? `<div class="modern-categories">${post.categories
          .map((cat) => `<span>${cat}</span>`)
          .join("")}</div>`
      : "";

  // Compose meta description (fallback to first 160 chars of body if missing)
  let metaDescription = "";
  if (post.metaDescription && post.metaDescription.trim()) {
    metaDescription = `<div class="modern-description">${post.metaDescription}</div>`;
  } else if (post.body && Array.isArray(post.body) && post.body.length > 0) {
    // Try to extract text from the first block(s)
    let text = "";
    for (const block of post.body) {
      if (block._type === "block" && Array.isArray(block.children)) {
        text += block.children.map((child) => child.text || "").join("");
      }
      if (text.length > 160) break;
    }
    if (text.trim()) {
      metaDescription = `<div class="modern-description">${text.substring(
        0,
        160
      )}${text.length > 160 ? "..." : ""}</div>`;
    }
  }

  // Compose main image
  const mainImage =
    post.mainImage && post.mainImage.asset && post.mainImage.asset._ref
      ? `<img class="modern-cover" src="${urlFor(post.mainImage)
          .width(900)
          .height(340)
          .url()}" alt="${post.title}">`
      : "";

  // Render new structure
  hero.innerHTML = `
    ${categories}
    <h1 class="modern-title">${post.title}</h1>
    <div class="modern-meta" style="gap: 18px;">
      <div style="flex:unset;min-width:0;display:flex;align-items:center;">${authorMeta}</div>
      <div style="flex:unset;min-width:0;text-align:right;padding-right:32px;">${dateMeta}</div>
    </div>
    ${metaDescription}
    ${mainImage}
  `;

  container.innerHTML = `
    <div class="modern-body">${renderBody(post.body)}</div>
    <div id="related-posts" class="related-posts-section"></div>
  `;
  renderRelatedPosts(post);
}

// Render related posts based on shared categories
async function renderRelatedPosts(currentPost) {
  const relatedContainer = document.getElementById("related-posts");
  if (
    !relatedContainer ||
    !currentPost.categories ||
    !currentPost.categories.length
  )
    return;
  let related = [];
  const sanity = await import("./sanity-client.js");
  for (const cat of currentPost.categories) {
    const posts = await sanity.getPostsByCategory(cat);
    related = related.concat(
      posts.filter((p) => p.slug.current !== currentPost.slug.current)
    );
  }
  // Remove duplicates by slug
  const seen = new Set();
  related = related.filter((p) => {
    if (seen.has(p.slug.current)) return false;
    seen.add(p.slug.current);
    return true;
  });
  if (!related.length) {
    relatedContainer.innerHTML = "";
    return;
  }
  // Build cards with awaited image URLs
  const cards = await Promise.all(
    related.slice(0, 3).map(async (post) => {
      let imgHtml = "";
      if (post.mainImage) {
        const imgUrl = sanity
          .urlFor(post.mainImage)
          .width(400)
          .height(180)
          .url();
        imgHtml = `<img src="${imgUrl}" alt="${post.title}" style="width:100%;height:120px;object-fit:cover;border-radius:8px;margin-bottom:10px;">`;
      }
      return `
      <a href="blog-post.html?slug=${
        post.slug.current
      }" class="related-post-card" style="display:block;text-decoration:none;background:#f8f9fa;border-radius:12px;box-shadow:0 2px 8px 0 rgba(10,46,92,0.06);padding:18px 14px;transition:box-shadow .2s;">
        ${imgHtml}
        <div style="font-weight:700;color:#0a2e5c;font-size:1.08rem;margin-bottom:6px;">${
          post.title
        }</div>
        <div style="color:#6b7280;font-size:0.98rem;">${sanity.formatDate(
          post.publishedAt
        )}</div>
      </a>
    `;
    })
  );
  relatedContainer.innerHTML = `
    <h3 style="margin-top:40px;margin-bottom:18px;font-size:1.3rem;color:#0a2e5c;">Related Posts</h3>
    <div class="related-posts-list" style="display:grid;gap:24px;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));">
      ${cards.join("")}
    </div>
  `;
}

async function init() {
  const slug = getSlugFromUrl();
  if (!slug) {
    container.innerHTML = '<div class="error">No post specified.</div>';
    return;
  }
  try {
    const post = await getPostBySlug(slug);
    renderPost(post);
  } catch (err) {
    container.innerHTML = `<div class="error">Error loading post.<br>${err.message}</div>`;
  }
}

init();
