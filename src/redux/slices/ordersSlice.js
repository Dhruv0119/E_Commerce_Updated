import { createSlice } from "@reduxjs/toolkit";
import { getStorageItem, setStorageItem, removeStorageItem } from "../../utils";

const initialState = {
  userId: null,
  orders: [],
};

const ordersSlice = createSlice({
  name: "orders",

  initialState,

  reducers: {
    setOrdersUser: (state, action) => {
      const userId = action.payload;

      state.userId = userId;

      if (!userId) {
        state.orders = [];
        return;
      }

      state.orders = getStorageItem(`orders_${userId}`, []);
    },

    createOrder: (state, action) => {
      const order = {
        id: Date.now(),
        ...action.payload,
        createdAt: new Date().toISOString(),
      };

      state.orders.push(order);

      if (state.userId) {
        setStorageItem(
          `orders_${state.userId}`,
          state.orders
        );
      }
    },

    clearOrders: (state) => {
      state.orders = [];

      if (state.userId) {
        removeStorageItem(
          `orders_${state.userId}`
        );
      }
    },
  },
});

export const {
  setOrdersUser,
  createOrder,
  clearOrders,
} = ordersSlice.actions;

export default ordersSlice.reducer;