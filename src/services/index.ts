import Storage, { StorageKeys } from "../utils/localStorage";
import HttpClient from "./httpClient";
import { LoginRequest, SignUpRequest } from "./types";

export default class AppServices {
  public static readonly LOGIN = "/auth/signin";
  public static readonly SIGNUP = "/auth/signup";
  public static readonly LOGOUT = "/auth/signout";

  public static async login({ email, password }: LoginRequest) {
    return await HttpClient.post<LoginRequest>(`${this.LOGIN}`, {
      email,
      password
    });
  }

  public static async singUp({
    firstName,
    lastName,
    email,
    password
  }: SignUpRequest) {
    return await HttpClient.post<SignUpRequest>(`${this.SIGNUP}`, {
      firstName,
      lastName,
      email,
      password
    });
  }
  public static async logout() {
    return await HttpClient.post(
      `${this.LOGOUT}`,
      { refreshToken: Storage.getItem(StorageKeys.RefreshToken) },
      {
        headers: {
          Authorization: `Bearer ${Storage.getItem(StorageKeys.AccessToken)}`
        }
      }
    );
  }
}
