import $api from "../http";

export default class ConversationsService {
    static async getConversations() {
        return $api.get("messages/", {
            withCredentials: true,
        });
    }
    static async sendMessage(id, text) {
        return $api.post(
            `messages/send/${id}`,
            {
                text,
            },
            {
                withCredentials: true,
            }
        );
    }
    static async getMessages(chatid) {
        return $api.get(
            `messages/chats/${chatid}`,
            {
                withCredentials: true,
            }
        );
    }
}
