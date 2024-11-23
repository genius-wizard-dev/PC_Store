import { ENDPOINTS } from "@/constants";
import { get, post } from "@/services/api.service";
import { ListCustomerResponse } from "@/types/Admin";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCustomer = createAsyncThunk(
  "admin/getCustomer",
  async (token:string, { rejectWithValue }) => {
    try {
      const response = await get<ListCustomerResponse>(
        ENDPOINTS.ADMIN + "/customers",
        token
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const setIsAdmin = createAsyncThunk(
  "admin/setIsAdmin",
  async ({token, userName} : {token: string, userName: string}, { rejectWithValue }) => {
    try {
      const response = await post<{code: number}>(
        ENDPOINTS.ADMIN + `/update-role/${userName}`, {},
        token
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
