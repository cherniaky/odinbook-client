import $api from "../http";

export default class NotificationsService {
    static async getNotifications() {
        return $api.get("notifications/", {
            withCredentials: true,
        });
    }
    static async postNotification(recipientId, text, postId) {
        return $api.post(
            "notifications/",
            {
                recipientId,
                text,
                postId,
            },
            {
                withCredentials: true,
            }
        );
    }
    static async setNotificationSeen() {
        return $api.put("notifications/seen", {
            withCredentials: true,
        });
    }
}
