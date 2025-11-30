// Environment configuration
const config = {
  sanity: {
    projectId: "kuqcfg5r",
    dataset: "production",
    apiVersion: "2025-01-01",
  },
};

// Try to load from meta tags if available
if (typeof document !== "undefined") {
  const projectIdMeta = document.querySelector(
    'meta[name="sanity-project-id"]'
  );
  const datasetMeta = document.querySelector('meta[name="sanity-dataset"]');
  const apiVersionMeta = document.querySelector(
    'meta[name="sanity-api-version"]'
  );

  if (projectIdMeta) config.sanity.projectId = projectIdMeta.content;
  if (datasetMeta) config.sanity.dataset = datasetMeta.content;
  if (apiVersionMeta) config.sanity.apiVersion = apiVersionMeta.content;
}

export default config;
