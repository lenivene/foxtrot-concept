import { useContext } from "react";
import { ProductContext } from "@contexts/products";

export const useProduct = () => {
  const context = useContext(ProductContext);

  return context;
};