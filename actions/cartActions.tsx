import { ADD_TO_CART, REMOVE_FROM_CART, EMPTY_CART, ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES, CartItem } from "../types/cartTypes";

export const addToCart = (item: CartItem) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const removeFromCart = (item: CartItem) => ({
  type: REMOVE_FROM_CART,
  payload: item,
});

export const emptyCart = () => ({
  type: EMPTY_CART,
});

export const addToFavorites = (item: CartItem) => ({
  type: ADD_TO_FAVORITES,
  payload: item,
});

export const removeFromFavorites = (item: CartItem) => ({
  type: REMOVE_FROM_FAVORITES,
  payload: item,
});