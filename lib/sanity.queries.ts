import groq from "groq";
import { client } from "./sanity.client";

export const getNav = async () => {
  try {
    return await client.fetch(groq`*[_type=="siteSettings"][0].nav[]{_key, label, href}`);
  } catch (error) {
    console.warn('Failed to fetch navigation, using fallback');
    return [
      { _key: "home", label: "Home", href: "/" },
      { _key: "svc", label: "Lead Generation", href: "/services/lead-generation" }
    ];
  }
};

export const getHome = async () => {
  try {
    return await client.fetch(groq`*[_type=="page" && slug.current=="/"][0]{title,content}`);
  } catch (error) {
    console.warn('Failed to fetch home page data');
    return null;
  }
};

export const getServiceBySlug = async (slug: string) => {
  try {
    return await client.fetch(groq`*[_type=="service" && slug.current==$slug][0]{title,content}`, { slug });
  } catch (error) {
    console.warn(`Failed to fetch service data for slug: ${slug}`);
    return null;
  }
};