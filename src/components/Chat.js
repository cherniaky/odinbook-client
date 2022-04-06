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
import { ChatContext } from "../contexts/chatContext";
import ClipLoader from "react-spinners/ClipLoader";
import useMediaQuery from "../helpers/useMediaQuery";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const ChatContainer = styled.div`
    background-color: ${({ theme }) => theme.cardBg};
    color: ${({ theme }) => theme.mainFontColour};
    border-radius: 5px;
    box-shadow: ${(props) => props.theme.shadowColour} 0px 1px 2px;
    min-width: 300px;
    height: auto;
    display: flex;
    flex-direction: column;
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 21;
    @media screen and (max-width: 890px) {
        width: 100%;
        top: 0;

        height: 100vh;
        font-size: 24px;
        left: 0;
    }
`;

const ChatHeader = styled.div`
    & i {
        font-size: 25px;
    }
    & i:hover {
        color: ${({ theme }) => theme.red};
    }
    cursor: ${(props) => (props.isMobile ? "default" : "pointer")};
    display: flex;
    color: white;
    border-radius: 5px;
    justify-content: ${(props) =>
        props.isMobile ? "flex-start" : "space-between"};
    background-color: ${({ theme }) => theme.headerColour};
    padding: 10px;
    font-size: 20px;
    flex-grow: 0;
`;

const ChatContent = styled.div`
    padding: 10px;
    display: flex;
    height: 400px;
    flex-direction: column;
    max-width: 300px;
    overflow-y: scroll;
    overflow-x: hidden;

    @media screen and (max-width: 890px) {
       //height: 80vh;
        flex-grow: 1;
        max-width: 100%;
    }
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
    flex-grow: 0;

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
const LoaderDiv = styled.div`
    display: flex;

    align-items: center;
    justify-content: center;
`;

export const Chat = ({ notMe, toggleChat, chat }) => {
    const [messages, setMessages] = useState([]);
    const { authState } = useContext(AuthContext);
    const { Open } = useContext(NotificationsContext);
    const { refreshConversations } = useContext(ChatContext);
    const [newMessageText, setNewMessageText] = useState("");
    const messagesEndRef = useRef(null);
    const matches = useMediaQuery("(max-width: 890px)");

    useEffect(() => {
        console.log(matches);
        return () => {};
    }, [matches]);

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
        //console.log(res);
        refreshConversations();
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
                    <ChatHeader
                        isMobile={matches}
                        className={matches ? "" : "handle"}
                    >
                        <ArrowBackIosIcon
                            onClick={() => {
                                toggleChat(chat._id);
                            }}
                           
                        />
                       
                        
                        {notMe.firstName} {notMe.familyName}
                    </ChatHeader>
                    <ChatContent>
                        {" "}
                        {messages.length != 0 ? (
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
                            })
                        ) : (
                            <LoaderDiv>
                                <ClipLoader
                                    color="lightblue"
                                    loading={true}
                                    size={50}
                                />
                            </LoaderDiv>
                        )}{" "}
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
