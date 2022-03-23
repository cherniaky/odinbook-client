import React, { createContext, useState } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [activeChats, setActiveChats] = useState([]);

    return (
        <ChatContext.Provider value={{ activeChats, setActiveChats }}>
            {children}
        </ChatContext.Provider>
    );
};

export { ChatProvider, ChatContext };
