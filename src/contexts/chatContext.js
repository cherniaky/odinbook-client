import React, { createContext, useContext, useEffect, useState } from "react";
import ConversationsService from "../services/ConversationsService";
import { AuthContext } from "./authContext";
import { AnimatePresence, motion } from "framer-motion";
import styled, { keyframes } from "styled-components";
import Draggable from "react-draggable";

const ChatContext = createContext();

const ChatContainer = styled.div`
    background-color: ${({ theme }) => theme.cardBg};
    color: ${({ theme }) => theme.mainFontColour};
    border-radius: 5px;
    box-shadow: ${(props) => props.theme.shadowColour} 0px 1px 2px;
    min-width: 300px;
    height: 100px;
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 3;
`;

const ChatHeader = styled.div`
    & i {
        font-size: 25px;
    }
    & i:hover {
        color: ${({ theme }) => theme.red};
    }
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.headerColour};
    padding: 10px;
    font-size: 20px;
`;

const ChatContent = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
`;

const ChatProvider = ({ children }) => {
    const [activeChats, setActiveChats] = useState([]);
    const [conversations, setConversations] = useState([]);
    const { authState } = useContext(AuthContext);

    async function refreshConversations() {
        let res = await ConversationsService.getConversations();
        //  console.log(res.data);
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
        // console.log("active", activeChats);
        return () => {};
    }, [activeChats]);

    async function getMessages(id) {
        let res = await ConversationsService.getMessages(id);
        return res.data;
    }

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

            {activeChats.length != 0 &&
                activeChats.map((chat) => {
                    let [notMe] = chat.participants.filter(
                        (person) => person._id != authState.user._id
                    );

                    let messages;
                    async function get() {
                        messages = await getMessages(chat._id);

                        console.log(messages);
                    }
                    get();

                    return (
                        <AnimatePresence key={chat._id}>
                            <Draggable handle=".handle">
                                <ChatContainer
                                    as={motion.div}
                                    initial={{ heigth: 0, opacity: 0 }}
                                    animate={{
                                        heigth: "auto",
                                        opacity: 1,
                                    }}
                                    exit={{
                                        heigth: 0,
                                        opacity: 0,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                    }}
                                >
                                    <ChatHeader className="handle">
                                        {notMe.firstName} {notMe.familyName}
                                        <i
                                            onClick={() => {
                                                toggleChat(chat._id);
                                            }}
                                            className="fa-solid fa-xmark"
                                        ></i>
                                    </ChatHeader>
                                    <ChatContent>
                                        {" "}
                                        {messages &&
                                            messages.map((message) => {
                                                return <>{message.text}</>;
                                            })}{" "}
                                    </ChatContent>
                                </ChatContainer>
                            </Draggable>
                        </AnimatePresence>
                    );
                })}
        </ChatContext.Provider>
    );
};

export { ChatProvider, ChatContext };
