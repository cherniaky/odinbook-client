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
    static async getPostsReciever(userid) {
        return $api.get(
            `posts/users/${userid}/wall`,

            {
                withCredentials: true,
            }
        );
    }
    static async makePost(text) {
        return $api.post(
            "posts",
            {
                text,
            },
            {
                withCredentials: true,
            }
        );
    }
    static async makePostOnWall(text, recipientId) {
        return $api.post(
            `posts/users/${recipientId}`,
            {
                text,
            },
            {
                withCredentials: true,
            }
        );
    }
    static async deletePost(id) {
        return $api.delete(`posts/${id}`, {
            withCredentials: true,
        });
    }
    static async makePostComment(postid, text) {
        return $api.post(
            `posts/${postid}/comments`,
            {
                text,
            },
            {
                withCredentials: true,
            }
        );
    }
    static async likePost(postid) {
        return await $api.post(`posts/${postid}/like`, {
            withCredentials: true,
        });
    }
    static async likeComment(postid, commentid) {
        return await $api.post(`posts/${postid}/comments/${commentid}/like`, {
            withCredentials: true,
        });
    }
}