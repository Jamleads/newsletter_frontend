import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StatusCode from "../utilities/StatusCose";

const BASE_URL = "http://85.159.213.40:5400/api";
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  status: StatusCode.IDLE,
  userToken,
  userInfo: null,
  error: null,
};

export const userlogin = createAsyncThunk(
  "login",
  async (data, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(`${BASE_URL}/auth/login`, data, config);
      const userToken = response.data.data.accessToken;
      localStorage.setItem("userToken", userToken);
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  //   reducers: {
  //     logout: (state) => {
  //       localStorage.removeItem("userToken");
  //       localStorage.removeItem("currentPage");
  //       localStorage.removeItem("initialPage");
  //       state.status = false;
  //       state.userInfo = null;
  //       state.userToken = null;
  //       state.error = null;
  //     },
  //   },
  extraReducers: (builder) => {
    builder
      .addCase(userlogin.pending, (state) => {
        state.status = StatusCode.LOADING;
      })
      .addCase(userlogin.fulfilled, (state, { payload }) => {
        state.status = StatusCode.IDLE;
        state.userInfo = payload;
        state.userToken = payload;
      })
      .addCase(userlogin.rejected, (state, { payload }) => {
        state.error = payload;
        state.status = StatusCode.IDLE;
      });
  },
});
export default authSlice.reducer;
