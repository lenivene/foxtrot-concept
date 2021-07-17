import Cookies from 'js-cookie';

const addProductToCart = (product, state) => {
  const cart = [...state.cart];
  const cartItemIndex = cart.findIndex(item => item.slug === product.slug);

  if (cartItemIndex < 0) {
    cart.push({ ...product, quantity: 1 });
  }
  else {
    const cartItem = {...cart[cartItemIndex]};

    cartItem.quantity++;
    cart[cartItemIndex] = cartItem;
  }

  Cookies.set('cart', JSON.stringify(cart));

  return { ...state, cart };
};

const removeProductFromCart = (productSlug, state) => {
  const cart = [...state.cart];
  const cartItemIndex = cart.findIndex(item => item.slug === productSlug);

  const cartItem = {
    ...cart[cartItemIndex]
  };

  cartItem.quantity--;

  if (cartItem.quantity <= 0) {
    cart.splice(cartItemIndex, 1);
  }
  else {
    cart[cartItemIndex] = cartItem;
  }

  Cookies.set('cart', JSON.stringify(cart));

  return {...state, cart };
};

const resetCart = (state) => {
  Cookies.set('cart', JSON.stringify([]));

  return {...state, cart: [] };
}

export const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return addProductToCart(action.product, state);
    case 'REMOVE_PRODUCT':
      return removeProductFromCart(action.productSlug, state);
    case 'RESET_CART':
      return resetCart(state);
    default:
      return state;
  }
};
