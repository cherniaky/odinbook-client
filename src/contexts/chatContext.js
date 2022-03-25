import React, { createContext, useContext, useEffect, useState } from "react";
import ConversationsService from "../services/ConversationsService";
import { AuthContext } from "./authContext";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [activeChats, setActiveChats] = useState([]);
    const [conversations, setConversations] = useState([]);

    async function refreshConversations() {
        let res = await ConversationsService.getConversations();
        //console.log(res.data);
        setConversations(res.data);
    }

    useEffect(() => {
        refreshConversations();
        return () => {};
    }, []);

    function toggleChat(id) {
        console.log(id);
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
       // console.log("active", activeChats);
        return () => {};
    }, [activeChats]);

    return (
        <ChatContext.Provider
            value={{
                activeChats,
                setActiveChats,
                refreshConversations,
                toggleChat,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export { ChatProvider, ChatContext };
