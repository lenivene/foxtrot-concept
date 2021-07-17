import { getProductBySlug } from "./getProductBySlug";
import { getCategoryById } from "./getCategoryById";

// @ts-ignore-next-line
import { CategoryType } from "@types/product";

export const getCategoriesBySlug = (slug: string) => {
  const product = getProductBySlug(slug);
  let categories: CategoryType[] = [];

  if(product){
    const currentCategory = getCategoryById(product.category);

    if(currentCategory?.parent){
      let loopCurrentId = currentCategory.parent;
      while(true){
        if(loopCurrentId == null){
          break;
        }

        const category = getCategoryById(loopCurrentId);
        loopCurrentId = category.parent;

        categories = [category,...categories];
      }
    }

    return [...categories, currentCategory];
  }

  return categories;
}