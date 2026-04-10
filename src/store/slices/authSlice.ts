import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type AuthUser = Omit<Login.Data, 'token'>;

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: AuthState['user'] }>) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    setUser: (state, action: PayloadAction<{ user: AuthState['user'] }>) => {
      state.user = action.payload.user;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
