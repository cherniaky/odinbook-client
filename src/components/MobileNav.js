import React, { useContext, useState } from "react";
import * as ROUTES from "../helpers/ROUTES";
import { Link, Routes, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../contexts/authContext";

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
    border-right: none;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    padding: 6px;
    width: 100%;
`;

const Button = styled.button`
    height: 41.2px;
    padding: 0 10px;
    cursor: pointer;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    color: white;
    background-color: ${({ theme }) => theme.buttonColour};
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

const MobileContainer = styled.div`
    min-height: calc(100vh);
    background-color: ${({ theme }) => theme.headerColour};
    position: absolute;

    top: ${(props) => (props.show ? "60px" : "-130vh")};
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    //justify-content: space-between;
    padding: 20px 30px;
    color: white;
    z-index: 10;
`;

const NavItem = styled.section`
    margin: 10px 0;
    padding: 10px;
    font-size: 24px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    cursor: pointer;
    // color: ${(props) => (props.logOut ? props.theme.red : "")};
    &:hover {
        background-color: ${(props) =>
            props.logOut ? props.theme.red : props.theme.buttonColour};
    }
    & i {
        margin-right: 10px;
    }
    & img {
        margin-right: 10px;
    }
`;

const ProfileImg = styled.img`
    border-radius: 50%;
    width: 40px;
    height: 40px;
`;

export const MobileNav = ({
    show,
    toggleMobile,
    searchValue,
    setSearchValue,
    handleSearch,
    toggleSidePannel,
    handleOpenSidePanel,
}) => {
    const { authState, dispatch } = useContext(AuthContext);

    function handleNavItem() {
        toggleMobile();
    }
    //console.log(authState);
    return (
        <MobileContainer show={show}>
            <NavItem>
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
                        handleNavItem();
                        handleSearch(searchValue);
                    }}
                >
                    Search
                </Button>
            </NavItem>
            <Link to={`users/${authState.user._id}`}>
                <NavItem
                    onClick={() => {
                        handleNavItem();
                    }}
                >
                    {authState.user.profilePic ? (
                        <ProfileImg src={authState.user.profilePic} />
                    ) : (
                        <i className="fa-regular fa-circle-user"></i>
                    )}{" "}
                    Your profile
                </NavItem>
            </Link>
            <NavItem
                onClick={() => {
                    handleNavItem();
                    handleOpenSidePanel("Chats");
                }}
            >
                {" "}
                <i className="fas fa-envelope"></i>Messages
            </NavItem>
            <NavItem
                onClick={() => {
                    handleNavItem();
                    handleOpenSidePanel("Friend requests");
                }}
            >
                <i className="fas fa-user-friends"></i>Friend requests
            </NavItem>
            <NavItem
                onClick={() => {
                    handleNavItem();
                    handleOpenSidePanel("Notifications");
                }}
            >
                {" "}
                <i className="fas fa-bell"></i>Notifications
            </NavItem>
            <NavItem
                onClick={() => {
                    handleNavItem();
                    dispatch({
                        type: "logout",
                    });
                }}
                logOut={true}
            >
                {" "}
                <i className="fa-solid fa-right-from-bracket"></i>Log out
            </NavItem>
        </MobileContainer>
    );
};
