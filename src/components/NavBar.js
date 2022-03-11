import React, { useContext, useState } from "react";
import * as ROUTES from "../helpers/ROUTES";
import { Link, Routes, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../contexts/authContext";

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
    width: 100%;
`;

const Button = styled.button`
    height: 34.8px;
    padding: 0 10px;
    cursor: pointer;
    color: white;
    background-color: ${({ theme }) => theme.buttonColour}; ;
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
`;

export const NavBar = ({ toggleTheme }) => {
    const { authState, dispatch } = useContext(AuthContext);

    return (
        <NavBarContainer>
            <NavSection>
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
            </NavSection>

            {authState.isAuth ? (
                <NavSection>
                    <Input placeholder="Find your friends..." />
                    <Button
                        onClick={() => {
                            console.log("search");
                        }}
                    >
                        Search
                    </Button>
                </NavSection>
            ) : (
                <></>
            )}

            {authState.isAuth ? (
                <NavSection>
                    <NavLink>
                        <i className="fas fa-envelope"></i>
                    </NavLink>
                    <NavLink>
                        <i className="fas fa-bell"></i>
                    </NavLink>
                    <NavLink>
                        <i className="fas fa-user-friends"></i>
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
            ) : (
                <></>
            )}
        </NavBarContainer>
    );
};
