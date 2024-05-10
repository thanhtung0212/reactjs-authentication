import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";
import { RoutesNavigation } from "../navigations";
import AppServices from "../services/index";
import { SignUpRequest, User } from "../services/types";
import Storage, { StorageKeys } from "../utils/localStorage";

interface InitialState {
  user: null | User;
  loading: boolean;
  error?: string;
}
const initialState: InitialState = {
  user: null,
  loading: false,
  error: undefined
};

export const postLogin = createAsyncThunk(
  "app/login",
  async ({ email, password }: { email: string; password: string }) => {
    const response = await AppServices.login({ email, password });
    return response.data as {
      user: User;
      accessToken: string;
      refreshToken: string;
    };
  }
);

export const postSignUp = createAsyncThunk(
  "app/signup",
  async ({ email, password, firstName, lastName }: SignUpRequest) => {
    try {
      const response = await AppServices.singUp({
        email,
        password,
        firstName,
        lastName
      });
      return response.data as User;
    } catch (error_) {
      return error_;
    }
  }
);

export const postLogout = createAsyncThunk("app/logout", async () => {
  try {
    const response = await AppServices.logout();
    return response;
  } catch (error_) {
    return error_;
  }
});

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    /* Login  */
    builder.addCase(postLogin.fulfilled, (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      Storage.setItem(StorageKeys.AccessToken, accessToken);
      Storage.setItem(StorageKeys.RefreshToken, refreshToken);
    });

    /* Logout */
    builder.addCase(postLogout.fulfilled, (state) => {
      Storage.removeItems([StorageKeys.AccessToken, StorageKeys.RefreshToken]);
      state.user = null;
      redirect(RoutesNavigation.Login);
    });
  }
});

export default slice.reducer;
