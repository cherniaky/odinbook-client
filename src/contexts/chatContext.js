import React, { createContext, useContext, useEffect, useState } from "react";
import ConversationsService from "../services/ConversationsService";
import { AuthContext } from "./authContext";
import { AnimatePresence, motion } from "framer-motion";
import styled, { keyframes } from "styled-components";
import Draggable from "react-draggable";
import { Chat } from "../components/Chat";
import useMediaQuery from "../helpers/useMediaQuery";
import { NotificationsContext } from "./notifyContext";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [activeChats, setActiveChats] = useState([]);
    const [conversations, setConversations] = useState([]);
    const { authState } = useContext(AuthContext);
    const { Open } = useContext(NotificationsContext);
    const matches = useMediaQuery("(max-width: 890px)");

    async function refreshConversations() {
        let res = await ConversationsService.getConversations();
        // console.log(res.data);
        setConversations(res.data);
    }

    useEffect(() => {
        refreshConversations();

        return () => {};
    }, []);

    authState.socket &&
        authState.socket.on("recieveMessage", (message) => {
            activeChats.length == 0 && Open(`New message :${message}`);
            refreshConversations();
        });

    const stopScroll = () => {
        document.body.classList.add("stopScroll");
    };
    const startScroll = () => {
        document.body.classList.remove("stopScroll");
    };

    function toggleChat(id) {
        //console.log(id);
        if (activeChats.some(({ _id }) => _id == id)) {
            setActiveChats(activeChats.filter((chat) => chat._id != id));
            return;
        }

        setActiveChats([
            ...activeChats,
            conversations.find((conv) => conv._id == id),
        ]);

        refreshConversations();
        return;
    }
    useEffect(() => {
        //console.log(conversations);
        setActiveChats(
            conversations.filter((conv) => {
                if (activeChats.some(({ _id }) => _id == conv._id)) {
                    return true;
                }
                return false;
            })
        );
        return () => {};
    }, [conversations]);

    useEffect(() => {
        // console.log("active", activeChats);
        if (authState.isAuth && activeChats.length != 0 && matches) {
            stopScroll();
        } else {
            startScroll();
        }
        return () => {};
    }, [activeChats]);

    return (
        <ChatContext.Provider
            value={{
                conversations,
                activeChats,
                setActiveChats,
                refreshConversations,
                toggleChat,
            }}
        >
            {children}

            {authState.isAuth &&
                activeChats.length != 0 &&
                activeChats.map((chat) => {
                    let [notMe] = chat.participants.filter(
                        (person) => person._id != authState.user._id
                    );

                    return (
                        <Chat
                            key={chat._id}
                            notMe={notMe}
                            toggleChat={toggleChat}
                            chat={chat}
                        />
                    );
                })}
        </ChatContext.Provider>
    );
};

export { ChatProvider, ChatContext };
