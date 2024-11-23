
import { BaseState } from "@/types/store";
import { UserInfo } from "@/types/User";
import { createSlice } from "@reduxjs/toolkit";
import { getCustomer, setIsAdmin } from "../thunks/admin";
interface AdminState extends BaseState {
  customers: UserInfo[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  }
  first: boolean;
  numberOfElements: number;
  empty: boolean;
  loading: boolean;
  error: string | null;
}





const initialState: AdminState = {
  customers: [],
  pageable: {
    pageNumber: 0,
    pageSize: 0,
    sort: {
      empty: false,
      sorted: false,
      unsorted: false,
    },
    offset: 0,
    paged: false,
    unpaged: false,
  },
  last: false,
  totalPages: 0,
  totalElements: 0,
  size: 0,
  number: 0,
  sort: {
    empty: false,
    sorted: false,
    unsorted: false,
  },
  first: false,
  numberOfElements: 0,
  empty: false,
  loading: false,
  error: null,
  status: "idle",
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomer.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.customers = action.payload.result.content;
        state.pageable = action.payload.result.pageable;
        state.last = action.payload.result.last;
        state.totalPages = action.payload.result.totalPages;
        state.totalElements = action.payload.result.totalElements;
        state.size = action.payload.result.size;
        state.number = action.payload.result.number;
        state.sort = action.payload.result.sort;
        state.first = action.payload.result.first;
        state.numberOfElements = action.payload.result.numberOfElements;
        state.empty = action.payload.result.empty;
      })
      .addCase(getCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(setIsAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setIsAdmin.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(setIsAdmin.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default adminSlice.reducer;
