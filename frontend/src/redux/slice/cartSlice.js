import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  restaurant: {
    restaurantId: '',
    details: {},
  },
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIdx = state.items.findIndex(
        el => el.info.id === action.payload.info.id
      );
      if (itemIdx < 0) {
        state.items.push(action.payload);
      } else {
        state.items[itemIdx].quantity = state.items[itemIdx].quantity + 1;
      }
      state.restaurant = action.payload.restaurant;
    },
    clearCart: state => {
      state.items = [];
      state.restaurant = {
        restaurantId: '',
        details: {},
      };
    },
    updateCart: (state, action) => {
      state.items = action.payload;
    },
    updateRest: (state, action) => {
      state.restaurant = action.payload;
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(el => el.info.id !== action.payload);
      if (state.items.length === 0) {
        state.restaurant = {
          restaurantId: '',
          details: {},
        };
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(el => el.info.id === action.payload);
      item.quantity = item.quantity + 1;
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(el => el.info.id === action.payload);
      item.quantity = item.quantity - 1;
    },
  },
});

export const {
  addToCart,
  clearCart,
  updateCart,
  updateRest,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
