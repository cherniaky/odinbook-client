import React, { useContext, useState, useEffect, useRef } from "react";
import * as ROUTES from "../helpers/ROUTES";
import { Link, Routes, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { AuthContext } from "../contexts/authContext";
import PostsService from "../services/PostsService";
import makeDateAgo from "../helpers/makeDateAgo";
import { NotificationsContext } from "../contexts/notifyContext";
import { AnimatePresence, motion } from "framer-motion";

const PanelContainer = styled.div`
    position: fixed;
    top: 50;
    right: 0;
    min-width: 200px;
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

const PanelContent = styled.div`
  
`;

const SidePanel = ({ active, title }) => {
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
                        duration: 0.2,
                    }}
                >
                    <PanelTitle> {title}</PanelTitle>{" "}
                    <PanelContent>Content</PanelContent>
                </PanelContainer>
            )}
        </AnimatePresence>
    );
};

export default SidePanel;
