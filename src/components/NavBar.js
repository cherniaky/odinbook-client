import React, { useContext, useEffect, useState } from "react";
import * as ROUTES from "../helpers/ROUTES";
import { Link, Navigate, Routes, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../contexts/authContext";
import { MobileNav } from "./MobileNav";
import SidePanel from "./SidePanel";
import RequestsService from "../services/RequestsService";
import Badge from "@mui/material/Badge";
import GroupIcon from "@mui/icons-material/Group";
import { red } from "@mui/material/colors";
import ConversationsService from "../services/ConversationsService";
import { ChatContext } from "../contexts/chatContext";

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
    const [chats, setChats] = useState([]);

    async function getReq() {
        let res = await RequestsService.getRequests();
        // console.log(res.data);
        setRequests(res.data);
    }
    async function getChats() {
        refreshConversations();
        // let res = await ConversationsService.getConversations();
        //console.log(res.data);
        setChats(conversations);
    }

    // useEffect(() => {
    //     setChats(conversations);
    //     return () => {};
    // }, [conversations]);

    useEffect(() => {
        getReq();
        getChats();
    }, []);

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
                                    if (
                                        sidePannelContent == "Chats" ||
                                        !activeSidePannel
                                    ) {
                                        getChats();
                                        toggleSidePannel();
                                    }
                                    setSidePannelContent("Chats");
                                }}
                            >
                                <i className="fas fa-envelope"></i>
                            </NavLink>
                            <NavLink
                                onClick={() => {
                                    if (
                                        sidePannelContent == "Notifications" ||
                                        !activeSidePannel
                                    ) {
                                        toggleSidePannel();
                                    }
                                    setSidePannelContent("Notifications");
                                }}
                            >
                                <i className="fas fa-bell"></i>
                            </NavLink>
                            <NavLink
                                onClick={() => {
                                    if (
                                        sidePannelContent ==
                                            "Friend requests" ||
                                        !activeSidePannel
                                    ) {
                                        getReq();
                                        toggleSidePannel();
                                    }
                                    setSidePannelContent("Friend requests");
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
                        show={showMobileMenu}
                        toggleMobile={toggleMobile}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        handleSearch={handleSearch}
                    />
                    <SidePanel
                        authId={authState.user._id}
                        requests={requests}
                        active={activeSidePannel}
                        title={sidePannelContent}
                        setRequests={setRequests}
                        chats={chats}
                    />
                </>
            )}
        </>
    );
};
