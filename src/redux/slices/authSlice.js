import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  getCurrentUser,
} from "../../api/authApi";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginUser(credentials);

      localStorage.setItem("accessToken", data.accessToken);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const restoreSession = createAsyncThunk(
  "auth/restoreSession",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        return rejectWithValue("No session found");
      }

      const user = await getCurrentUser(token);

      return {
        user,
        token,
      };
    } catch (error) {
      localStorage.removeItem("accessToken");
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  restoring: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;

      localStorage.removeItem("accessToken");
    },
  },

  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.accessToken;
        state.isAuthenticated = true;
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      // RESTORE SESSION
      .addCase(restoreSession.pending, (state) => {
  state.restoring = true;
  state.error = null;
})

      .addCase(restoreSession.fulfilled, (state, action) => {
        state.restoring = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })

      .addCase(restoreSession.rejected, (state) => {
  state.restoring = false;
  state.user = null;
  state.token = null;
  state.isAuthenticated = false;
});
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;