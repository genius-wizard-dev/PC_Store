import { ENDPOINTS } from "@/constants";
import { get } from "@/services/api.service";
import { UserInfoResponse } from "@/types/User";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await get<UserInfoResponse>(
        ENDPOINTS.USER_INFO,
      );
      // console.log(response.data.result);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
