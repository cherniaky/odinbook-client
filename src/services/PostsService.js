import $api from "../http";

export default class PostsService {
    static async getPosts() {
        return $api.get(
            "posts/feed",
           
            {
                withCredentials: true,
            }
        );
    }
    
}