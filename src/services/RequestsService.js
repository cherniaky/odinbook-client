import $api from "../http";

export default class RequestsService {
    static async getRequests() {
        return $api.get("requests/", {
            withCredentials: true,
        });
    }
    static async sendRequest(id) {
        return $api.post(
            `requests/${id}`,
            {
                withCredentials: true,
            }
        );
    }
    static async acceptRequest(userId) {
        return $api.post(
            `requests/${userId}/accept`,
            {
                withCredentials: true,
            }
        );
    }
}
