import $api from "../http";

export default class UsersService {
    static async getUsers() {
        return $api.get(
            "users",
            {
                withCredentials: true,
            }
        );
    }
   
}
