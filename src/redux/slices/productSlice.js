import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getProducts,
  searchProducts,
  getProductsByCategory,
} from "../../api/productApi";

// Fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getProducts();

      return data.products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Search products
export const searchProduct = createAsyncThunk(
  "products/searchProduct",
  async (query, { rejectWithValue }) => {
    try {
      const data = await searchProducts(query);

      return data.products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async (category, { rejectWithValue }) => {
    try {
      const data = await getProductsByCategory(category);

      return data.products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
  builder

    // Fetch all products
    .addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    })

    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    })

    .addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Search products
    .addCase(searchProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    })

    .addCase(searchProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    })

    .addCase(searchProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Category products
    .addCase(fetchProductsByCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    })

    .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    })

    .addCase(fetchProductsByCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
},
});

export default productSlice.reducer;