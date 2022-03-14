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
    static async likePost(postid) {
        return await $api.post(
            `posts/${postid}/like`,
            {
                withCredentials: true,
            }
        );
    }
}
