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
    padding: 20px;
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

const PanelContent = styled.div`
    width: 100%;
`;

const Button = styled.button`
    height: 34.8px;
    padding: 0 10px;
    cursor: pointer;
    color: white;
    background-color: ${({ theme }) => theme.buttonColour};
    border-radius: 5px;
`;
const SidePanel = ({ active, title, requests, setRequests, authId }) => {
    let navigate = useNavigate();
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
                                        {req.friendId.firstName}{" "}
                                        {req.friendId.familyName}
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
