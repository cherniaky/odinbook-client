import io from "socket.io-client";
import { API_URL } from "./http";

// const server = "https://odinbook-api21.herokuapp.com";
// const server = "http://localhost:3000";

let socket;

export const connectSocket = (userID) => {
    socket = io.connect(API_URL);
    socket.on("connect", () => {
        console.log("connetcted");
    });
    socket && socket.emit("userID", userID);

    return socket;
};

// Friend requests

export const sendFriendRequest = (request) => {
    socket && socket.emit("friendRequest", request);
};

// Notifications

export const sendNotification = (notification) => {
    socket && socket.emit("notification", notification);
};

// Messages

export const sendMessage = (message, recipientID) => {
    socket && socket.emit("message", message, recipientID);
};

export const disconnectFromSocket = () => {
    socket && socket.disconnect();
    console.log("diskonect");
};
