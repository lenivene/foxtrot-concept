export type CategoryType = {
  id: number;
  name: string;
  slug: string;
  parent: number;
}

export type VariableProductType = {
  name: string;
  values: Array<{
    price: number;
    value: string;
    thumbnail: string;
  }>
}

export type ProductType = {
  thumbnail: string;
  title: string;
  slug: string,
  description: string;
  price: number,
  quantityInStock: number,
  category: number,
  variables: VariableProductType[];
  technicalInformation: string[];
};