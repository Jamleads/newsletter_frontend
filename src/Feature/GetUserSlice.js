import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StatusCode from "../utilities/StatusCose";

const BASE_URL = "http://85.159.213.40:5400/api";
const token = localStorage.getItem("userToken");

const initialState = {
  status: StatusCode.IDLE,
  error: null,
  allUsers: [],
};

export const getAllUsers = createAsyncThunk("login", async () => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${BASE_URL}/users/list`, config);
    console.log("the response all users", response);
    return response;
  } catch (error) {
    console.log("error", error);
  }
});
const getAllUserSlice = createSlice({
  name: "allUsers",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.status = StatusCode.LOADING;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.status = StatusCode.IDLE;
        state.allUsers = payload.data.data;
      })
      .addCase(getAllUsers.rejected, (state, { payload }) => {
        state.status = StatusCode.IDLE;
        state.error = payload;
      });
  },
});
export default getAllUserSlice.reducer;
