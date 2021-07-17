import data from "@mock/data.json";

export const getCategories = () => {
  return data.categories.filter(category => category.parent == null);
}