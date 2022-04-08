import axios from "axios";

export const API_URL = "https://odinbook-api21.herokuapp.com";
//"http://localhost:3000"; 
//"https://odinbook-api21.herokuapp.com/api";

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
});

$api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        //console.log(error.response)
        const originalReq = error.config;
        if (
            error.response.status == 401 &&
            !error.config._isRetry &&
            error.config
        ) {
            try {
                originalReq._isRetry = true;
                const response = await axios.get(`${API_URL}/auth/refresh`, {
                    withCredentials: true,
                });
                //console.log("accessToken", response.data.accessToken);
                localStorage.setItem("token", response.data.accessToken);

                //console.log(originalReq);
                originalReq.headers.Authorization = `Bearer ${response.data.accessToken}`;

                axios.request(originalReq);
            } catch (error) {
                console.log(error);
            }
        }
        throw error;
    }
);

export default $api;
