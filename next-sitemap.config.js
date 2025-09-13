/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://brokerleadengine.vercel.app",
  generateRobotsTxt: true,
  exclude: ["/studio/*"],
  transform: async (config, path) => ({
    loc: path,
    changefreq: "monthly",
    priority: 0.7,
  }),
};