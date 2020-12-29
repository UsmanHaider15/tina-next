const fs = require("fs");
export default async function getAllPosts() {
  const files = fs.readdirSync("././content/posts").map((file) => ({
    slug: file.replace(".json", ""),
    data: JSON.parse(fs.readFileSync(`././content/posts/${file}`, "utf8")),
  }));
  return files;
}

export async function getPostBySlug(slug) {
  const fileContent = JSON.parse(
    fs.readFileSync(`././content/posts/${slug}.json`, "utf8")
  );
  return fileContent;
}
