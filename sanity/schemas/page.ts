export default {
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    { name: "title", type: "string" },
    { name: "slug",  type: "slug", options: { source: "title", slugify: (v: string) => v === "Home" ? "/" : v.toLowerCase().replace(/\s+/g,"-") } },
    { name: "content", type: "array", of: [{ type: "block" }] },
  ],
};