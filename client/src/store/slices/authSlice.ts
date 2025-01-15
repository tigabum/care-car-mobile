import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {AuthService} from '../../services/auth';

interface AuthState {
  user: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const signUp = createAsyncThunk('auth/signUp', async (userData: any) => {
  const user = await AuthService.signUp(userData);
  return user;
});

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({email, password}: {email: string; password: string}) => {
    const user = await AuthService.signIn(email, password);
    return user;
  },
);

export const signOut = createAsyncThunk('auth/signOut', async () => {
  await AuthService.signOut();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state: AuthState, action: any) => {
      state.user = action.payload;
    },
    clearError: (state: AuthState) => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Sign Up
      .addCase(signUp.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state: AuthState, action: any) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state: AuthState, action: any) => {
        state.loading = false;
        state.error = action.error.message || 'Sign up failed';
      })
      // Sign In
      .addCase(signIn.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state: AuthState, action: any) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state: AuthState, action: any) => {
        state.loading = false;
        state.error = action.error.message || 'Sign in failed';
      })
      // Sign Out
      .addCase(signOut.fulfilled, (state: AuthState) => {
        state.user = null;
      });
  },
});

export const {setUser, clearError} = authSlice.actions;
export default authSlice.reducer;
