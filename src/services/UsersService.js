import $api from "../http";

export default class UsersService {
    static async getUsers() {
        return $api.get("users", {
            withCredentials: true,
        });
    }
    static async getUser(id) {
        return $api.get(`users/${id}`, {
            withCredentials: true,
        });
    }

    static async updateProfile(location, occupation , bio) {
        return $api.put(
            `users/current/profile`,  
            {
                location,
                bio,
                occupation,
            },
            {
                withCredentials: true,
            }
        );
    }
}
