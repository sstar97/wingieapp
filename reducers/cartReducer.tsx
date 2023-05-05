import { CartActionTypes, CartItem, ADD_TO_CART, REMOVE_FROM_CART, EMPTY_CART, ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "../types/cartTypes";

const INITIAL_STATE = {
  products: [],
  cart: [],
  favorites: []
}

const cartReducer = (state = INITIAL_STATE, action: CartActionTypes) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {...state, cart: [...state.cart, action.payload]};
    case REMOVE_FROM_CART:
      const idToRemove = action.payload.item.id;

      // Find the index of the item to remove
      const indexToRemove = state.cart.findIndex((item) => item.id === idToRemove);
      console.log(action.payload.item.id)
      if (indexToRemove === -1) {
        // If the item is not found, return the current state unchanged
        return state;
      }

      // Create a new array without the item to remove using the spread operator
      const newItems = [
        ...state.cart.slice(0, indexToRemove),
        ...state.cart.slice(indexToRemove + 1),
      ];
      console.log(newItems)
      // Return a new state object with the new array of items
      return {
        ...state,
        cart: newItems,
      };
    case EMPTY_CART:
      return [];
    case ADD_TO_FAVORITES:
      return {...state, favorites: [...state.favorites, action.payload]};
    case REMOVE_FROM_FAVORITES:
      const idToRemoved = action.payload.id || action.payload.item.id;
      console.log('payload',action.payload)

      // Find the index of the item to remove
      const indexToRemoved = state.favorites.findIndex((item) => item.id === idToRemoved);
      if (indexToRemoved === -1) {
        // If the item is not found, return the current state unchanged
        return state;
      }

      // Create a new array without the item to remove using the spread operator
      const newItemss = [
        ...state.cart.slice(0, indexToRemoved),
        ...state.cart.slice(indexToRemoved + 1),
      ];
      console.log('newItemsss',newItemss)
      // Return a new state object with the new array of items
      return {
        ...state,
        favorites: newItemss,
      };
    default:
      return state;
  }
};

export default cartReducer;