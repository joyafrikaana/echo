import {
  getAllPosts,
  urlFor,
  formatDate,
  getExcerpt,
} from "./sanity-client.js";

async function renderHomeBlogSnippets() {
  console.log("renderHomeBlogSnippets running");
  const grid = document.getElementById("blog-snippets-grid");
  if (!grid) return;
  try {
    const posts = await getAllPosts();
    console.log("Fetched posts:", posts);
    if (!posts || posts.length === 0) {
      grid.innerHTML = "<p>No blog posts found.</p>";
      return;
    }
    // Show only the 3 most recent
    const latest = posts.slice(0, 3);
    // Show only the 4 most recent
    const latestFour = posts.slice(0, 4);
    const html = latestFour
      .map(
        (post) => `
        <article class="blog-card">
          <a href="blog-post.html?slug=${
            post.slug?.current || ""
          }" class="blog-card-image">
            <img src="${
              post.mainImage
                ? urlFor(post.mainImage).width(480).height(300).url()
                : "./assets/images/graph-100000.png"
            }" alt="${post.title}" loading="lazy" />
          </a>
          <div class="blog-card-content">
            <div class="post-meta">
              <span class="post-category">${
                (post.categories && post.categories[0]) || "General"
              }</span>
              <span class="post-date">${formatDate(post.publishedAt)}</span>
            </div>
            <h3><a href="blog-post.html?slug=${post.slug?.current || ""}">${
          post.title
        }</a></h3>
            <a href="blog-post.html?slug=${
              post.slug?.current || ""
            }" class="read-more">Read More →</a>
          </div>
        </article>
      `
      )
      .join("");
    console.log("Generated blog cards HTML:", html);
    grid.innerHTML = html;
  } catch (err) {
    grid.innerHTML = "<p>Could not load blog posts.</p>";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderHomeBlogSnippets();

  // Add scroll navigation for blog grid
  const grid = document.getElementById("blog-snippets-grid");
  const leftBtn = document.querySelector(".blog-grid-nav.left");
  const rightBtn = document.querySelector(".blog-grid-nav.right");
  if (grid && leftBtn && rightBtn) {
    leftBtn.addEventListener("click", () => {
      grid.scrollBy({ left: -320, behavior: "smooth" });
    });
    rightBtn.addEventListener("click", () => {
      grid.scrollBy({ left: 320, behavior: "smooth" });
    });
  }

  // Enable drag-to-scroll on touch devices for the blog grid
  if (grid) {
    let isDown = false;
    let startX = 0;
    let startScrollLeft = 0;

    grid.addEventListener("pointerdown", (e) => {
      isDown = true;
      startX = e.clientX;
      startScrollLeft = grid.scrollLeft;
      grid.style.scrollBehavior = "auto";
      if (grid.setPointerCapture) grid.setPointerCapture(e.pointerId);
    });

    grid.addEventListener("pointermove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.clientX;
      const walk = startX - x;
      grid.scrollLeft = startScrollLeft + walk;
    });

    function stopGridDrag(e) {
      if (!isDown) return;
      isDown = false;
      grid.style.scrollBehavior = "";
      if (grid.releasePointerCapture)
        try {
          grid.releasePointerCapture(e.pointerId);
        } catch (err) {}
    }

    grid.addEventListener("pointerup", stopGridDrag);
    grid.addEventListener("pointercancel", stopGridDrag);
    grid.addEventListener("pointerleave", stopGridDrag);
  }
});
