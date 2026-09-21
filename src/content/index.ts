import { authors, getAuthor } from "./authors";
import { industries } from "./industries";
import { products } from "./products";
import { menuServices, services } from "./services";
import { solutions } from "./solutions";
import type { CatalogItem, HubKey } from "./types";
import { work } from "./work";
import { posts } from "./blog";

export { industries, products, services, menuServices, solutions, work, posts, authors, getAuthor };

export const hubs: Record<HubKey, CatalogItem[]> = {
  services,
  industries,
  solutions,
};

export function getHubItems(hub: HubKey): CatalogItem[] {
  return hubs[hub];
}

export function getHubItem(hub: HubKey, slug: string): CatalogItem | undefined {
  return hubs[hub].find((item) => item.slug === slug);
}

export function getProduct(slug: string) {
  return products.find((item) => item.slug === slug);
}

export function getWork(slug: string) {
  return work.find((item) => item.slug === slug);
}

export function getPost(slug: string) {
  return posts.find((item) => item.slug === slug);
}

export const hubPaths: Record<HubKey, string> = {
  services: "/services",
  industries: "/industries",
  solutions: "/solutions",
};
