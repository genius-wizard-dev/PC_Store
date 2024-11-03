import { UserInfo, UserInfoResponse } from '@/types/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserInfo } from '../thunks/user';

interface UserState {
  user: UserInfo | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
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
    logout: (state) => {
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
        console.log(action.payload.result);
        state.user = action.payload.result;
        state.error = null;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
  },
});

// export const { logout } = userSlice.actions;
export default userSlice.reducer;
