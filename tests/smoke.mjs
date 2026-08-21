const baseUrl = (process.env.SMOKE_BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const languages = ["nl", "en", "fr"];
const pageSlugs = ["", "over-mij", "boek", "transformatie", "spreken", "diensten", "contact", "privacy", "cookies"];
const paths = [
  ...languages.flatMap((lang) => pageSlugs.map((slug) => `/${lang}${slug ? `/${slug}` : ""}`)),
  "/robots.txt",
  "/sitemap.xml",
  "/manifest.webmanifest",
  "/favicon.ico",
  "/icon",
  "/apple-icon",
];

const failures = [];

for (const path of paths) {
  try {
    const response = await fetch(`${baseUrl}${path}`, { redirect: "manual" });
    if (response.status < 200 || response.status >= 400) {
      failures.push(`${path}: HTTP ${response.status}`);
    }
  } catch (error) {
    failures.push(`${path}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

if (failures.length > 0) {
  console.error(`Smoke test failed:\n${failures.map((failure) => `- ${failure}`).join("\n")}`);
  process.exit(1);
}

console.log(`Smoke test passed for ${paths.length} local routes at ${baseUrl}.`);
