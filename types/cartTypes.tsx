export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const EMPTY_CART = 'EMPTY_CART';

export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';

interface AddToCartAction {
  type: typeof ADD_TO_CART,
  payload: CartItem
}

interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART,
  payload: CartItem
}

interface AddToFavoritesAction {
  type: typeof ADD_TO_FAVORITES,
  payload: CartItem
}

interface RemoveFromFavoritesAction {
  type: typeof REMOVE_FROM_FAVORITES,
  payload: CartItem
}

interface EmptyCartAction {
  type: typeof EMPTY_CART
}

export type CartActionTypes = AddToCartAction | RemoveFromCartAction | EmptyCartAction | AddToFavoritesAction | RemoveFromFavoritesAction;

export interface CartItem {
    id: number;
    description: string;
    discountPercentage: number;
    name: string;
    price: number;
    thumbnail: string;
    title: string;
}