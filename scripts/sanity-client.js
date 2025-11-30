// Sanity Client Configuration
import * as SanityClient from "https://esm.sh/@sanity/client";
import * as imageUrlBuilderModule from "https://esm.sh/@sanity/image-url";
// Support both default and named export shapes from esm.sh
const imageUrlBuilder = imageUrlBuilderModule.default || imageUrlBuilderModule;
import config from "./config.js";

// Initialize Sanity client with environment variables
const client = SanityClient.createClient({
  projectId: config.sanity.projectId,
  dataset: config.sanity.dataset,
  useCdn: true,
  apiVersion: config.sanity.apiVersion,
});

console.log(
  "Sanity client initialized with:",
  JSON.stringify({
    projectId: config.sanity.projectId,
    dataset: config.sanity.dataset,
    apiVersion: config.sanity.apiVersion,
  })
);

// Initialize image URL builder (detect export shape and provide fallback)
let builder;
const builderFactory =
  imageUrlBuilderModule.default ||
  imageUrlBuilderModule.imageUrlBuilder ||
  imageUrlBuilderModule.createImageUrlBuilder ||
  (typeof imageUrlBuilderModule === "function" ? imageUrlBuilderModule : null);

function createFallbackBuilder() {
  console.warn("Using fallback image URL builder — image URLs will be empty.");
  return {
    image: () => ({
      width: () => ({
        height: () => ({
          url: () => "",
        }),
      }),
    }),
  };
}

if (builderFactory && typeof builderFactory === "function") {
  try {
    builder = builderFactory(client);
  } catch (err) {
    console.warn("Error initializing image url builder:", err);
    builder = createFallbackBuilder();
  }
} else {
  console.warn(
    "image-url module did not expose a usable factory:",
    imageUrlBuilderModule
  );
  builder = createFallbackBuilder();
}

// Helper function to generate image URLs
export function urlFor(source) {
  if (!source) return null;
  return builder.image(source);
}

// Fetch all blog posts
export async function getAllPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    "author": author->name,
    "categories": categories[]->title,
    body
  }`;

  return await client.fetch(query);
}

// Fetch featured post (most recent)
export async function getFeaturedPost() {
  const query = `*[_type == "post"] | order(publishedAt desc)[0] {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    "author": author->name,
    "categories": categories[]->title,
    body
  }`;

  return await client.fetch(query);
}

// Fetch posts by category
export async function getPostsByCategory(category) {
  const query = `*[_type == "post" && "${category}" in categories[]->title] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    "author": author->name,
    "categories": categories[]->title,
    body
  }`;

  return await client.fetch(query);
}

// Fetch single post by slug
export async function getPostBySlug(slug) {
  const query = `*[_type == "post" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    "author": author->name,
    "categories": categories[]->title,
    body
  }`;

  return await client.fetch(query);
}

// Format date
export function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

// Get excerpt from body
export function getExcerpt(body, length = 150) {
  if (!body || !Array.isArray(body)) return "";

  const text = body
    .filter((block) => block._type === "block")
    .map((block) => {
      return block.children
        .filter((child) => child._type === "span")
        .map((child) => child.text)
        .join("");
    })
    .join(" ");

  return text.length > length ? text.substring(0, length) + "..." : text;
}

export default client;
