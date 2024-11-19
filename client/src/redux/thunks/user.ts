import { ENDPOINTS } from "@/constants";
import { get } from "@/services/api.service";
import { UserInfoResponse } from "@/types/User";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async ({token}: {token: string}, { rejectWithValue }) => {
    try {
      const response = await get<UserInfoResponse>(
        ENDPOINTS.USER_INFO,
        token
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
