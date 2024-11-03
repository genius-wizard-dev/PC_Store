import { UserInfo, UserInfoResponse } from '@/types/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserInfo } from '../thunks/user';
import { BaseState } from '@/types/store';

interface UserState extends BaseState {
  user: UserInfo | null;
}

const initialState: UserState = {
  user: null,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
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
        state.user = action.payload.result;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
