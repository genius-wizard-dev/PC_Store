import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CheckTokenValidResponse, LoginResponse, LogoutResponse } from '../../types/Auth';
import { checkTokenValid, login, logout } from '../thunks/auth';

interface AuthState {
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  isLogin: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  status: 'idle',
  isLogin: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.status = 'idle';
      state.isLogin = false;
      state.error = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.status = 'succeeded';
        state.token = action.payload.result.token;
        state.isLogin = true;
        state.error = null;
        localStorage.setItem('token', action.payload.result.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        state.isLogin = false;
        state.token = null;
        localStorage.removeItem('token');
      })
      .addCase(checkTokenValid.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkTokenValid.fulfilled, (state, action: PayloadAction<CheckTokenValidResponse>) => {
        state.status = 'succeeded';
        if (action.payload.result.valid) {
          state.isLogin = true;
        } else {
          state.isLogin = false;
          state.token = null;
          localStorage.removeItem('token');
        }
      })
      .addCase(checkTokenValid.rejected, (state) => {
        state.status = 'failed';
        state.isLogin = false;
        state.token = null;
        localStorage.removeItem('token');
      })
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, (state, action: PayloadAction<LogoutResponse>) => {
        // console.log("logout", action.payload);
        if (action.payload.code === 1000) {
          state.status = 'succeeded';
          state.isLogin = false;
          state.token = null;
          localStorage.removeItem('token');
        }
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

// export const { logout } = authSlice.actions;
export default authSlice.reducer;
