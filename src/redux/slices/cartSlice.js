import { createSlice } from "@reduxjs/toolkit";
import { getStorageItem, setStorageItem, removeStorageItem } from "../../utils";

const initialState = {
  userId: null,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    // Load the cart belonging to a particular user
    setCartUser: (state, action) => {
      const userId = action.payload;

      state.userId = userId;

      if (!userId) {
        state.items = [];
        return;
      }

      state.items = getStorageItem(`cartItems_${userId}`, []);
    },

    addToCart: (state, action) => {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }

      if (state.userId) {
        setStorageItem(
          `cartItems_${state.userId}`,
          state.items
        );
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );

      if (state.userId) {
        setStorageItem(
          `cartItems_${state.userId}`,
          state.items
        );
      }
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item) {
        item.quantity += 1;
      }

      if (state.userId) {
        setStorageItem(
          `cartItems_${state.userId}`,
          state.items
        );
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

      if (state.userId) {
        setStorageItem(
          `cartItems_${state.userId}`,
          state.items
        );
      }
    },

    clearCart: (state) => {
      state.items = [];

      if (state.userId) {
        removeStorageItem(
          `cartItems_${state.userId}`
        );
      }
    },
  },
});

export const {
  setCartUser,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;