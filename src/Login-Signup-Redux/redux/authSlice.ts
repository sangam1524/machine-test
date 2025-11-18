import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

interface AuthState {
  users: User[];
  currentUser: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  users: [],
  currentUser: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (
      state,
      action: PayloadAction<{ name: string; email: string; password: string }>,
    ) => {
      const newUser: User = {
        id: Date.now().toString(),
        ...action.payload,
      };
      state.users.push(newUser);
    },
    login: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;

