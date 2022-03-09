import axios from "axios";
import { makeAutoObservable } from "mobx";
import $api, { API_URL } from "../http";
import AuthService from "../services/AuthService";
import Cookies from "js-cookie";

export default class Store {
    user = {};
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

   setAuth(bool) {
        this.isAuth = bool;
    }

    setLoading(bool) {
        this.isLoading = bool;
    }

    setUser(user) {
        this.user = user;
    }

    async login(username, password) {
        this.setLoading(true);
        try {
            let response;

            response = await AuthService.login(username, password);

            Cookies.set("refreshToken", response.data.refreshToken, {
                expires: 15,
            });
            localStorage.setItem("token", response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            console.log(error);
            return error;
        } finally {
            this.setLoading(false);
        }
    }
    async loginSample() {
        //this.isLoading = true;
         this.setLoading(true);
        try {
            let response;
            //setIsAuth(false);
            response = await AuthService.loginAsGuest();

            // console.log(response);
            Cookies.set("refreshToken", response.data.refreshToken, {
                expires: 15,
            });
            localStorage.setItem("token", response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            console.log(error);
            return new Error("login");
        } finally {
            this.setLoading(false);
        }
    }
    async logout() {
        this.setLoading(true);
        try {
            const response = await AuthService.logout();
            // console.log(response);
            Cookies.remove("refreshToken");
            localStorage.removeItem("token");
            this.setAuth(false);
            this.setUser({});
        } catch (error) {
            // console.log(error);
            return error;
        } finally {
            this.setLoading(false);
            //this.setLoading(false);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            // console.log("strat");
            //const response = await $api.get('refresh')
            const response = await axios.get(`${API_URL}/auth/refresh`, {
                withCredentials: true,
            });
            Cookies.set("refreshToken", response.data.refreshToken, {
                expires: 15,
            });
            //console.log(response.data)
            localStorage.setItem("token", response.data.accessToken);
            console.log(response.data.user);
            this.setAuth(true);
            //console.log(this.isAuth);
            this.setUser(response.data.user);
        } catch (error) {
            return error;
        } finally {
            this.setLoading(false);
        }
    }
}
