import React, { useContext, useState, useEffect, useRef } from "react";
import * as ROUTES from "../helpers/ROUTES";
import { Link, Routes, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { AuthContext } from "../contexts/authContext";
import PostsService from "../services/PostsService";
import makeDateAgo from "../helpers/makeDateAgo";
import { NotificationsContext } from "../contexts/notifyContext";
import { AnimatePresence, motion } from "framer-motion";
import RequestsService from "../services/RequestsService";
import { ChatContext } from "../contexts/chatContext";

const PanelContainer = styled.div`
    position: fixed;
    top: 50;
    right: 0;
    min-width: 300px;
    height: 100vh;
    background-color: ${(props) => props.theme.cardBg};
    display: flex;
    align-items: center;
    // margin: 20px 0px;
    padding: 20px 10px;
    text-align: center;
    flex-direction: column;
    box-shadow: ${(props) => props.theme.shadowColour} 0px 1px 2px;
    color: ${({ theme }) => theme.mainFontColour};
    z-index: 2;
    // border-radius: 5px;
`;

const PanelTitle = styled.h1`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
`;
const RequestItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ChatItem = styled(RequestItem)`
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    justify-content: start;
    border-bottom: 1px solid ${({ theme }) => theme.mainFontColour};

    &:hover {
        background-color: ${({ theme }) => theme.secondaryBg};
    }
    & i {
        font-size: 40px;
        margin-right: 10px;
    }
`;

const PanelContent = styled.div`
    width: 100%;
`;

const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Button = styled.button`
    height: 34.8px;
    padding: 0 10px;
    cursor: pointer;
    color: white;
    background-color: ${({ theme }) => theme.buttonColour};
    border-radius: 5px;
`;

const ChatImg = styled.img`
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-right: 10px;
`;

const SidePanel = ({ active, title, requests, setRequests, authId, chats }) => {
    let navigate = useNavigate();
    const { toggleChat } = useContext(ChatContext);
    async function handleAcceptFriend(userId, reqId) {
        await RequestsService.acceptRequest(userId);
        setRequests(requests.filter((req) => req._id != reqId));
    }

    const getContent = () => {
        switch (title) {
            case "Friend requests":
                return (
                    <ul>
                        {requests.length != 0 ? (
                            requests.map((req) => {
                                return (
                                    <RequestItem key={req._id}>
                                        <Link to={`/users/${req.friendId._id}`}>
                                            {req.friendId.firstName}{" "}
                                            {req.friendId.familyName}
                                        </Link>
                                        <Button
                                            onClick={() => {
                                                handleAcceptFriend(
                                                    req.friendId._id,
                                                    req._id
                                                );
                                                navigate(`/users/${authId}`);
                                            }}
                                        >
                                            Accept
                                        </Button>
                                    </RequestItem>
                                );
                            })
                        ) : (
                            <>You have no pending requests</>
                        )}
                    </ul>
                );
            case "Chats":
                return (
                    <ul>
                        {chats.length != 0 ? (
                            chats.map((chat) => {
                                return (
                                    <ChatItem
                                        key={chat._id}
                                        onClick={() => {
                                            toggleChat(chat._id);
                                        }}
                                    >
                                        {chat.participants[0]._id == authId
                                            ? (
                                                  <ChatImg
                                                      src={
                                                          chat.participants[1]
                                                              .profilePic
                                                      }
                                                  />
                                              ) || (
                                                  <i className="fa-regular fa-circle-user"></i>
                                              )
                                            : (
                                                  <ChatImg
                                                      src={
                                                          chat.participants[0]
                                                              .profilePic
                                                      }
                                                  />
                                              ) || (
                                                  <i className="fa-regular fa-circle-user"></i>
                                              )}

                                        <FlexColumn>
                                            {" "}
                                            {chat.participants[0]._id == authId
                                                ? `${chat.participants[1].firstName} ${chat.participants[1].familyName}`
                                                : `${chat.participants[0].firstName} ${chat.participants[0].familyName}`}
                                            <p>
                                                {
                                                    chat.lastMessage.sender
                                                        .firstName
                                                }{" "}
                                                {
                                                    chat.lastMessage.sender
                                                        .familyName
                                                }
                                                : {chat.lastMessage.text}
                                            </p>
                                        </FlexColumn>
                                    </ChatItem>
                                );
                            })
                        ) : (
                            <>No chats</>
                        )}
                    </ul>
                );
            default:
                return "Nothing new";
            //break;
        }
    };

    return (
        <AnimatePresence>
            {" "}
            {active && (
                <PanelContainer
                    as={motion.div}
                    initial={{ top: 60, right: -100, opacity: 0 }}
                    animate={{ top: 60, right: 0, opacity: 1 }}
                    exit={{ top: 60, right: -100, opacity: 0 }}
                    transition={{
                        duration: 0.15,
                    }}
                >
                    <PanelTitle> {title}</PanelTitle>{" "}
                    <PanelContent>{getContent()}</PanelContent>
                </PanelContainer>
            )}
        </AnimatePresence>
    );
};

export default SidePanel;
