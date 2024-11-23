import { BaseState } from '@/types/store';
import { UserInfo, UserInfoResponse } from '@/types/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserInfo } from '../thunks/user';

interface UserState extends BaseState {
  info: UserInfo | null;
}

const initialState: UserState = {
  info: null,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.info = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action: PayloadAction<UserInfoResponse>) => {
        state.status = 'succeeded';
        state.info = action.payload.result;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
