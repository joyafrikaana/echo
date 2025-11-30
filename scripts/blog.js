// Blog page functionality
import {
  getAllPosts,
  getFeaturedPost,
  getPostsByCategory,
  urlFor,
  formatDate,
  getExcerpt,
} from "./sanity-client.js";

let allPosts = [];
let currentFilter = "all";
let currentPage = 1;
const POSTS_PER_PAGE = 6;

// Initialize blog page
async function initBlog() {
  console.log("Initializing blog...");

  try {
    // Fetch all posts
    console.log("Fetching posts from Sanity...");
    allPosts = await getAllPosts();
    console.log("Fetched posts:", allPosts);

    if (!allPosts || allPosts.length === 0) {
      console.warn("No posts found in Sanity");
      showNoPostsMessage();
      return;
    }

    // Render featured post
    await renderFeaturedPost();

    // Render blog grid
    renderBlogGrid(allPosts, 1);

    // Setup filter functionality
    setupFilters();

    console.log("Blog loaded successfully!");
  } catch (error) {
    console.error("Error loading blog:", error);
    console.error("Error details:", error.message);
    showError(error.message);
  }
}

// Render featured post
async function renderFeaturedPost() {
  const featuredPost = await getFeaturedPost();
  if (!featuredPost) return;

  const featuredSection = document.querySelector(".featured-post");
  if (!featuredSection) return;

  let imageUrl =
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200";

  try {
    if (featuredPost.mainImage) {
      const urlBuilder = urlFor(featuredPost.mainImage);
      if (urlBuilder) {
        imageUrl = urlBuilder.width(1200).height(800).url();
      }
    }
  } catch (err) {
    console.warn("Error generating image URL:", err);
  }

  const category =
    featuredPost.categories && featuredPost.categories.length > 0
      ? featuredPost.categories[0]
      : "Uncategorized";

  featuredSection.innerHTML = `
    <div class="featured-post-image">
      <img src="${imageUrl}" alt="${featuredPost.title || "Blog post"}" />
      <span class="post-badge">Featured</span>
    </div>
    <div class="featured-post-content">
      <div class="post-meta">
        <span class="post-category">${category}</span>
        <span class="post-date">${formatDate(featuredPost.publishedAt)}</span>
      </div>
      <h2>${featuredPost.title || "Untitled Post"}</h2>
      <p>${getExcerpt(featuredPost.body, 200)}</p>
      <a href="blog-post.html?slug=${
        featuredPost.slug?.current || ""
      }" class="btn btn-primary">Read More</a>
    </div>
  `;
}

// Render blog grid
function renderBlogGrid(posts) {
  const blogGrid = document.querySelector(".blog-grid");
  if (!blogGrid) return;

  if (posts.length === 0) {
    blogGrid.innerHTML =
      '<p style="text-align: center; grid-column: 1/-1; padding: 40px;">No posts found.</p>';
    return;
  }

  // Pagination logic
  let page = 1;
  if (typeof arguments[1] === "number") page = arguments[1];
  currentPage = page;
  const startIdx = (page - 1) * POSTS_PER_PAGE;
  const endIdx = startIdx + POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(startIdx, endIdx);

  // Determine number of slots in the grid (2 rows x 3 columns = 6 for desktop)
  let gridSlots = POSTS_PER_PAGE;
  if (window.innerWidth < 700) {
    gridSlots = paginatedPosts.length; // On mobile, just show all
  }
  const cards = paginatedPosts.map((post) => {
    let imageUrl =
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600";

    try {
      if (post.mainImage) {
        const urlBuilder = urlFor(post.mainImage);
        if (urlBuilder) {
          imageUrl = urlBuilder.width(600).height(400).url();
        }
      }
    } catch (err) {
      console.warn("Error generating image URL for post:", post.title, err);
    }

    const category =
      post.categories && post.categories.length > 0
        ? post.categories[0]
        : "Uncategorized";

    return `
      <a class="blog-card reveal" data-category="${category.toLowerCase()}" href="blog-post.html?slug=${
      post.slug?.current || ""
    }">
        <div class="blog-card-image">
          <img src="${imageUrl}" alt="${post.title || "Blog post"}" />
        </div>
        <div class="blog-card-content">
          <div class="post-meta">
            <span class="post-category">${category}</span>
            <span class="post-date">${formatDate(post.publishedAt)}</span>
          </div>
          <h3>${post.title || "Untitled Post"}</h3>
          <p>${getExcerpt(post.body, 120)}</p>
          <span class="read-more">Read More →</span>
        </div>
      </a>
    `;
  });

  // Do not add placeholder cards; leave empty slots blank

  blogGrid.innerHTML = cards.join("");

  // Cards are now semantic links (<a>), no JS click handlers required.

  // Render pagination
  renderPagination(posts.length, page);

  // Trigger reveal animations
  setTimeout(() => {
    const cards = document.querySelectorAll(".blog-card");
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("revealed");
      }, index * 100);
    });
  }, 100);
  // Render pagination controls
  function renderPagination(totalPosts, currentPage) {
    const pagination = document.querySelector(".pagination");
    if (!pagination) return;
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
    if (totalPages <= 1) {
      pagination.style.display = "none";
      return;
    }
    pagination.style.display = "";
    let html = "";
    html += `<a href="#" class="pagination-btn${
      currentPage === 1 ? " disabled" : ""
    }" data-page="prev">← Previous</a>`;
    html += '<div class="pagination-numbers">';
    for (let i = 1; i <= totalPages; i++) {
      html += `<a href="#" class="pagination-number${
        i === currentPage ? " active" : ""
      }" data-page="${i}">${i}</a>`;
    }
    html += "</div>";
    html += `<a href="#" class="pagination-btn${
      currentPage === totalPages ? " disabled" : ""
    }" data-page="next">Next →</a>`;
    pagination.innerHTML = html;

    // Add event listeners
    pagination.querySelectorAll("a[data-page]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        let page = link.getAttribute("data-page");
        if (page === "prev") {
          if (currentPage > 1) renderBlogGrid(allPosts, currentPage - 1);
        } else if (page === "next") {
          if (currentPage < totalPages)
            renderBlogGrid(allPosts, currentPage + 1);
        } else {
          renderBlogGrid(allPosts, parseInt(page));
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }
}

// Setup filter functionality
function setupFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const filter = button.dataset.filter;

      // Update active state
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      currentFilter = filter;

      // Filter posts and paginate
      let postsToShow;
      if (filter === "all") {
        postsToShow = allPosts;
      } else {
        postsToShow = allPosts.filter((post) => {
          return (
            post.categories &&
            post.categories.some(
              (cat) => cat.toLowerCase() === filter.toLowerCase()
            )
          );
        });
      }
      renderBlogGrid(postsToShow, 1);
    });
  });
}

// Show error message
function showError(errorMessage = "") {
  const featuredSection = document.querySelector(".featured-post");
  const blogGrid = document.querySelector(".blog-grid");

  const detailMsg = errorMessage
    ? `<br><small style="color: #999;">Details: ${errorMessage}</small>`
    : "";

  if (featuredSection) {
    featuredSection.innerHTML = `<div style="text-align: center; padding: 40px;">
        <p>Error loading featured post. Please try again later.</p>
        ${detailMsg}
        <p style="margin-top: 20px; font-size: 14px;">Make sure you have posts published in your Sanity Studio.</p>
      </div>`;
  }

  if (blogGrid) {
    blogGrid.innerHTML = `<div style="text-align: center; grid-column: 1/-1; padding: 40px;">
        <p>Error loading blog posts. Please try again later.</p>
        ${detailMsg}
        <p style="margin-top: 20px; font-size: 14px;">Make sure you have posts published in your Sanity Studio.</p>
      </div>`;
  }
}

// Show no posts message
function showNoPostsMessage() {
  const featuredSection = document.querySelector(".featured-post");
  const blogGrid = document.querySelector(".blog-grid");

  if (featuredSection) {
    featuredSection.innerHTML = `<div style="text-align: center; padding: 60px 20px; background: white; border-radius: 12px;">
        <h3 style="margin-bottom: 16px;">No Blog Posts Yet</h3>
        <p style="color: #6b7280; margin-bottom: 20px;">Start creating posts in your Sanity Studio to see them here.</p>
        <a href="http://localhost:3333" target="_blank" class="btn btn-primary">Open Sanity Studio</a>
      </div>`;
  }

  if (blogGrid) {
    blogGrid.innerHTML = `<div style="text-align: center; grid-column: 1/-1; padding: 40px;">
        <p style="color: #6b7280;">Create your first blog post in Sanity Studio to get started!</p>
      </div>`;
  }
}

// Newsletter form submission
function setupNewsletter() {
  const form = document.querySelector(".newsletter-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value;

    // Here you would typically send this to your backend or email service
    alert(`Thank you for subscribing with email: ${email}`);
    form.reset();
  });
}

// Initialize when DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initBlog();
    setupNewsletter();
  });
} else {
  initBlog();
  setupNewsletter();
}
