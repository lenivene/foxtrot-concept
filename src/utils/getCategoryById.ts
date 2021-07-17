import data from "@mock/data.json";

export const getCategoryById = (id: number) => {
  return data.categories.find(category => category.id == id);
}