import data from "@mock/data.json";

export const getProductBySlug = (slug: string) => {
  return data.products.find(product => product.slug == slug);
}