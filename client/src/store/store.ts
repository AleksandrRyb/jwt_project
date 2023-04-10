import { makeAutoObservable } from "mobx";
import axios from "axios";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";

export default class Store {
  user = {} as IUser;
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);

      localStorage.setItem("accessToken", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);

      localStorage.setItem("accessToken", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem("accessToken");
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  async checkAuth() {
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });

      localStorage.setItem("accessToken", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
}
