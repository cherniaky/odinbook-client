import React, { createContext, useContext, useEffect, useState } from "react";
import ConversationsService from "../services/ConversationsService";
import { AuthContext } from "./authContext";
import { AnimatePresence, motion } from "framer-motion";
import styled, { keyframes } from "styled-components";
import Draggable from "react-draggable";
import { Chat } from "../components/Chat";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [activeChats, setActiveChats] = useState([]);
    const [conversations, setConversations] = useState([]);
    const { authState } = useContext(AuthContext);

    async function refreshConversations() {
        let res = await ConversationsService.getConversations();
      console.log(res.data);
        setConversations(res.data);
    }

    useEffect(() => {
        refreshConversations();

        return () => {};
    }, []);

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

            {activeChats.length != 0 &&
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
