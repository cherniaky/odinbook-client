import $api from "../http";

export default class AuthService {
    static async login(email, password) {
        return $api.post(
            "auth/login",
            { email, password },
            {
                withCredentials: true,
            }
        );
    }
    static async loginAsGuest() {
        return $api.post(
            "auth/login",
            { email: "test.first@gmail.com", password: "123456" },
            {
                withCredentials: true,
            }
        );
    }

    static async logout() {
        return $api.get("logout");
    }
}
