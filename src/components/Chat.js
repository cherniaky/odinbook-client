import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import ConversationsService from "../services/ConversationsService";
import { AnimatePresence, motion } from "framer-motion";
import styled, { keyframes } from "styled-components";
import { AuthContext } from "../contexts/authContext";
import Draggable from "react-draggable";
import makeDateAgo from "../helpers/makeDateAgo";
import { NotificationsContext } from "../contexts/notifyContext";

const ChatContainer = styled.div`
    background-color: ${({ theme }) => theme.cardBg};
    color: ${({ theme }) => theme.mainFontColour};
    border-radius: 5px;
    box-shadow: ${(props) => props.theme.shadowColour} 0px 1px 2px;
    min-width: 300px;
    height: auto;

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
    color: white;
    border-radius: 5px;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.headerColour};
    padding: 10px;
    font-size: 20px;
`;

const ChatContent = styled.div`
    padding: 10px;
    display: flex;
    max-height: 400px;
    flex-direction: column;
    max-width: 300px;
    overflow-y: scroll;
    overflow-x: hidden;
`;

const Message = styled.div`
    border-radius: 5px;

    // display: flex;
    align-items: flex-end;

    padding: 10px;

    background-color: ${({ theme }) => theme.bodyBg};
    width: fit-content;
    max-width: 70%;
    margin-bottom: 10px;
`;
const MyMessage = styled(Message)`
    align-self: flex-end;
`;
const MessageText = styled.div`
    word-wrap: break-word;
`;
const MessageDate = styled.div`
    font-size: 10px;
    color: ${({ theme }) => theme.secondaryFontColour};
    align-self: flex-end;
    // margin-left: 15px;
`;

const ChatForm = styled.form`
    width: 100%;
    display: flex;

    & input[type="text"] {
        background-color: ${({ theme }) => theme.bodyBg};
        color: ${({ theme }) => theme.mainFontColour};
        border-bottom-left-radius: 5px;
        padding: 5px;
        flex-grow: 1;
    }
    & input[type="submit"] {
        cursor: pointer;
        padding: 0 9px;
        background-color: ${({ theme }) => theme.buttonColour};
        color: white;
        border-bottom-right-radius: 5px;
        width: fit-content;
    }
`;

export const Chat = ({ notMe, toggleChat, chat }) => {
    const [messages, setMessages] = useState([]);
    const { authState } = useContext(AuthContext);
    const { Open } = useContext(NotificationsContext);
    const [newMessageText, setNewMessageText] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    async function getMessages(id) {
        let res = await ConversationsService.getMessages(id);
        return res.data;
    }

    async function get() {
        setMessages(await getMessages(chat._id));
    }

    async function handleSendMessage(id, text) {
        let res = await ConversationsService.sendMessage(id, text);
        console.log(res);
        setMessages([...messages, res.data]);
        Open("Message send");
        setNewMessageText("");
    }

    useEffect(() => {
        get();
        scrollToBottom();
        return () => {};
    }, [chat]);

    useEffect(() => {
        // console.log(messages);
        scrollToBottom();
        return () => {};
    }, [messages]);

    return (
        <AnimatePresence>
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
                                if (message.sender._id == authState.user._id) {
                                    return (
                                        <MyMessage key={message._id}>
                                            <MessageText>
                                                {" "}
                                                {message.text}
                                            </MessageText>
                                            <MessageDate>
                                                {makeDateAgo(message.date)} ago
                                            </MessageDate>
                                        </MyMessage>
                                    );
                                } else {
                                    return (
                                        <Message key={message._id}>
                                            <MessageText>
                                                {" "}
                                                {message.text}
                                            </MessageText>
                                            <MessageDate>
                                                {makeDateAgo(message.date)} ago
                                            </MessageDate>
                                        </Message>
                                    );
                                }
                            })}{" "}
                        <div ref={messagesEndRef} />
                    </ChatContent>
                    <ChatForm
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleSendMessage(notMe._id, newMessageText);
                        }}
                    >
                        <input
                            value={newMessageText}
                            onChange={(e) => {
                                setNewMessageText(e.target.value);
                            }}
                            type="text"
                        />
                        <input type="submit" value="Send" />
                    </ChatForm>
                </ChatContainer>
            </Draggable>
        </AnimatePresence>
    );
};
