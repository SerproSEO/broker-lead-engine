export default {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    { name: "siteName", type: "string", title: "Site Name", initialValue: "Broker Lead Engine" },
    {
      name: "nav",
      title: "Navigation",
      type: "array",
      of: [{ type: "object", fields: [
        { name: "label", type: "string", validation: (Rule: any) => Rule.required() },
        { name: "href",  type: "string", validation: (Rule: any) => Rule.required() },
      ]}],
      initialValue: [
        { _key: "home", label: "Home", href: "/" },
        { _key: "svc",  label: "Lead Generation", href: "/services/lead-generation" }
      ]
    }
  ],
};