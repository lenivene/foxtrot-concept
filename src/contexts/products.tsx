import Cookies from 'js-cookie';
import { createContext, ReactNode, useReducer } from "react";
import { cartReducer } from "./cartReducers";

// Types
// @ts-ignore-next-line
import { ProductType } from "@types/product";

interface ProductProviderProps {
  children: ReactNode;
}

interface CartItem extends ProductType {
  quantity: number;
}

interface ProductContextData {
  cart: CartItem[];
  totalInCart: () => number;
  sumTotalPrice: () => number;
  resetCart: () => void;
  addProductToCart: (product: ProductType) => void;
  removeProductFromCart: (productSlug: ProductType['slug']) => void;
}

export const ProductContext = createContext({} as ProductContextData);

export const ProductProvider = ({ children }: ProductProviderProps) => {
  let cart = [];

  try {
    cart = JSON.parse(Cookies.get('cart'));
  } catch {
    cart = [];
  }

  const [state, dispatch] = useReducer(cartReducer, { cart: cart ?? [] });

  const addProductToCart = (product: ProductType) => {
    dispatch({
      type: 'ADD_PRODUCT',
      product
    });
  };

  const removeProductFromCart = (productSlug: ProductType['slug']) => {
    dispatch({
      type: 'REMOVE_PRODUCT',
      productSlug
    });
  };

  const resetCart = () => {
    dispatch({
      type: 'RESET_CART'
    });
  }

  const totalInCart = () => {
    return state.cart.reduce((count, currentItem) => {
      return count + currentItem.quantity;
    }, 0) as number;
  }

  const sumTotalPrice = () => {
    return state.cart.reduce((count, currentItem) => {
      const price = currentItem.quantity > 0 ? currentItem.price * currentItem.quantity : currentItem.price;

      return count + price;
    }, 0) as number;
  }

  return (
    <ProductContext.Provider
      value={{
        cart: state.cart,
        resetCart,
        totalInCart,
        sumTotalPrice,
        addProductToCart,
        removeProductFromCart
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}