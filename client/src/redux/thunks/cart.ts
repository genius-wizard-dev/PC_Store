import { ENDPOINTS } from "@/constants";
import { del, get, post } from "@/services/api.service";
import { CartCountResponse } from "@/types/Cart";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCartCount = createAsyncThunk(
  "cart/getCartCount",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await get<CartCountResponse>(`${ENDPOINTS.CART_COUNT}/items/${userId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Lấy số lượng sản phẩm trong giỏ hàng thất bại");
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({userId, productId}: {userId: string, productId: string}, { rejectWithValue }) => {
    try {
      const response = await post<any>(`${ENDPOINTS.ADD_TO_CART}/${userId}/addCart?productId=${productId}&quantity=1`,{});
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Thêm vào giỏ hàng thất bại");
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({userId, productId}: {userId: string, productId: string}, { rejectWithValue }) => {
    try {
      const response = await del<any>(`${ENDPOINTS.DELETE_CART}?customerId=${userId}&productId=${productId}`, {});
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Xóa sản phẩm trong giỏ hàng thất bại");
    }
  }
)

