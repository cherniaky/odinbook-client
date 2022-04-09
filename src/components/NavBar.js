import React, { useContext, useEffect, useState } from "react";
import * as ROUTES from "../helpers/ROUTES";
import { Link, Navigate, Routes, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../contexts/authContext";
import { MobileNav } from "./MobileNav";
import SidePanel from "./SidePanel";
import RequestsService from "../services/RequestsService";
import NotificationsService from "../services/NotificationsService";
import Badge from "@mui/material/Badge";
import GroupIcon from "@mui/icons-material/Group";
import { red } from "@mui/material/colors";
import ConversationsService from "../services/ConversationsService";
import { ChatContext } from "../contexts/chatContext";
import EmailIcon from "@mui/icons-material/Email";
import NotificationsIcon from "@mui/icons-material/Notifications";

const NavBarContainer = styled.div`
    min-height: 60px;
    background-color: ${({ theme }) => theme.headerColour};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    color: white;
    z-index: 20;
`;

const NavSection = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 890px) {
        display: none;
        // width: 90%;
    }
`;
const TitleSection = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 32px;
    text-shadow: ${(props) => props.theme.mainTitleGlow};
`;

const ToggleButton = styled.span`
    margin-left: 20px;
    cursor: pointer;
    display: flex;
    align-items: flex-start;
    font-size: 20px;

    text-shadow: ${(props) => props.theme.mainTitleGlow};
    &:hover {
        opacity: 0.7;
    }
`;

const Input = styled.input`
    color: ${({ theme }) => theme.mainFontColour};
    background-color: ${(props) => props.theme.bodyBg};
    border: 1px solid ${(props) => props.theme.borderColour};
    padding: 6px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    width: 100%;

    @media screen and (max-width: 890px) {
        display: none;
        // width: 90%;
    }
`;

const Button = styled.button`
    height: 34.8px;
    padding: 0 10px;
    cursor: pointer;
    color: white;
    background-color: ${({ theme }) => theme.buttonColour};
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    ${(props) =>
        props.search
            ? ""
            : "border-top-left-radius: 5px; border-bottom-left-radius: 5px;"};

    @media screen and (max-width: 890px) {
        display: none;
        // width: 90%;
    }
`;
const NavLink = styled.div`
    cursor: pointer;
    margin: 0 10px;
    font-size: 17px;
    height: 100%;
    display: flex;
    align-items: center;
    &:hover {
        color: ${({ theme }) => theme.buttonColour};
    }
    @media screen and (max-width: 890px) {
        display: none;
        // width: 90%;
    }
`;

const BarsSection = styled.section`
    display: none;

    &:hover {
        color: ${({ theme }) => theme.buttonColour};
    }
    @media screen and (max-width: 890px) {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin: 0 10px;
        font-size: 17px;
        height: 100%;
        font-size: 36px;
        justify-content: center;
        align-items: center;
        // width: 90%;
    }
`;

export const NavBar = ({ toggleTheme }) => {
    const navigate = useNavigate();
    const { authState, dispatch } = useContext(AuthContext);
    const { conversations, refreshConversations } = useContext(ChatContext);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [activeSidePannel, setActiveSidePannel] = useState(false);
    const [sidePannelContent, setSidePannelContent] = useState("");
    const [requests, setRequests] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [chats, setChats] = useState([]);

    async function getReq() {
        let res = await RequestsService.getRequests();
        // console.log(res.data);
        setRequests(res.data);
    }
    async function getNotifications() {
        let res = await NotificationsService.getNotifications();
        // console.log(res.data);
        setNotifications(res.data);
    }

    authState.socket &&
        authState.socket.on("recieveRequest", () => {
            getReq();
        });

    authState.socket &&
        authState.socket.on("recieveNotification", () => {
            getNotifications();
        });

    async function getChats() {
        refreshConversations();
        // let res = await ConversationsService.getConversations();
        //console.log(res.data);
        setChats(conversations);
    }

    // useEffect(() => {
    //     console.log(chats);
    //     return () => {};
    // }, [chats]);

    useEffect(() => {
        // console.log(conversations);
        setChats(conversations);
        return () => {};
    }, [conversations]);

    useEffect(() => {
        getReq();
        getChats();
        getNotifications();
    }, [authState.user]);

    function toggleSidePannel() {
        setActiveSidePannel(() => !activeSidePannel);
    }

    const toggleScroll = () => {
        document.body.classList.toggle("stopScroll");
    };

    const toggleMobile = () => {
        window.scroll(0, 0);
        toggleScroll();
        setShowMobileMenu(!showMobileMenu);
    };
    const handleSearch = (text) => {
        navigate(`${ROUTES.SEARCH}?user=${text}`);
        setSearchValue("");
        // <Navigate to={`${ROUTES.SEARCH}?user=${text}`} />;
    };
    const handleOpenSidePanel = (text) => {
        if (sidePannelContent == text || !activeSidePannel) {
            getChats();
            toggleSidePannel();
        }
        setSidePannelContent(text);
    };
    return (
        <>
            <NavBarContainer>
                <TitleSection>
                    <Title>
                        <Link to={ROUTES.DASHBOARD}>Odinbook</Link>
                    </Title>
                    <ToggleButton
                        onClick={() => {
                            toggleTheme();
                        }}
                    >
                        <i className="fas fa-lightbulb"></i>
                    </ToggleButton>
                </TitleSection>

                {authState.isAuth ? (
                    <NavSection>
                        <Input
                            value={searchValue}
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                            }}
                            placeholder="Find new friends..."
                        />
                        <Button
                            search={true}
                            onClick={() => {
                                //console.log("search");
                                handleSearch(searchValue);
                            }}
                        >
                            Search
                        </Button>
                    </NavSection>
                ) : (
                    <></>
                )}

                {authState.isAuth && (
                    <>
                        <NavSection>
                            <NavLink
                                onClick={() => {
                                    handleOpenSidePanel("Chats");
                                }}
                            >
                                <Badge
                                    badgeContent={
                                        chats.some((chat) => {
                                            return chat.lastMessage.sender
                                                ._id !== authState.user._id
                                                ? !chat.lastMessage.seen
                                                : false;
                                        })
                                            ? "New"
                                            : 0
                                    }
                                    color="error"
                                >
                                    <EmailIcon />
                                </Badge>
                            </NavLink>
                            <NavLink
                                onClick={() => {
                                    handleOpenSidePanel("Notifications");
                                    NotificationsService.setNotificationSeen();
                                }}
                            >
                                {" "}
                                <Badge
                                    badgeContent={
                                        notifications
                                            .filter(
                                                (not) =>
                                                    not.sender._id !=
                                                    authState.user._id
                                            )
                                            .filter((not) => !not.seen).length
                                    }
                                    color="error"
                                >
                                    <NotificationsIcon />
                                </Badge>
                            </NavLink>
                            <NavLink
                                onClick={() => {
                                    handleOpenSidePanel("Friend requests");
                                    // if (
                                    //     sidePannelContent ==
                                    //         "Friend requests" ||
                                    //     !activeSidePannel
                                    // ) {
                                    //     getReq();
                                    //     toggleSidePannel();
                                    // }
                                    // setSidePannelContent("Friend requests");
                                }}
                            >
                                <Badge
                                    badgeContent={requests.length}
                                    color="error"
                                >
                                    <GroupIcon color="green" />
                                </Badge>
                                {/* <i className="fas fa-user-friends"></i> */}
                            </NavLink>

                            <Link to={`users/${authState.user._id}`}>
                                <NavLink>
                                    {authState.user.firstName +
                                        " " +
                                        authState.user.familyName}
                                </NavLink>
                            </Link>
                            <Button
                                onClick={() => {
                                    dispatch({
                                        type: "logout",
                                    });
                                }}
                            >
                                Log out
                            </Button>
                        </NavSection>

                        <BarsSection
                            onClick={() => {
                                toggleMobile();
                                //console.log(showMobileMenu);
                            }}
                        >
                            <i
                                className={`fa-solid ${
                                    showMobileMenu ? "fa-xmark" : "fa-bars"
                                }`}
                            ></i>
                        </BarsSection>
                    </>
                )}
            </NavBarContainer>
            {authState.isAuth && (
                <>
                    <MobileNav
                        toggleSidePannel={toggleSidePannel}
                        handleOpenSidePanel={handleOpenSidePanel}
                        show={showMobileMenu}
                        toggleMobile={toggleMobile}
                        chats={chats}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        handleSearch={handleSearch}
                    />
                    <SidePanel
                        toggleSidePannel={toggleSidePannel}
                        authId={authState.user._id}
                        requests={requests}
                        active={activeSidePannel}
                        title={sidePannelContent}
                        setRequests={setRequests}
                        chats={chats}
                        notifications={notifications}
                    />
                </>
            )}
        </>
    );
};
