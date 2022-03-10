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
    static async signUp(email, firstName, familyName, password ,password2) {
        return $api.post(
            "auth/sign-up",
            { email, firstName, familyName, password ,password2 },
            {
                withCredentials: true,
            }
        );
    }
    static async loginFacebook(
        facebookId,
        email,
        profilePic,
        firstName,
        familyName
    ) {
        return $api.post(
            "auth/login/facebook",
            { facebookId, email, profilePic, firstName, familyName },
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
