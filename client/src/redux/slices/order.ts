import { ListOrderRespone, Result } from "@/types/Order";
import { BaseState } from "@/types/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { viewOrder } from "../thunks/order";

interface OrderState extends BaseState {
  orders: Result[]
}

const initialState: OrderState = {
  orders: [],
  error: null,
  status: "idle"
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(viewOrder.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(viewOrder.fulfilled, (state, action: PayloadAction<ListOrderRespone> ) => {
        state.status = "succeeded"
        state.orders = action.payload.result
      })
      .addCase(viewOrder.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload as string
      })
  }
})

export const { clearOrder } = orderSlice.actions
export default orderSlice.reducer

