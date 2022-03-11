import React, { useContext, useState, useEffect } from "react";
import * as ROUTES from "../helpers/ROUTES";
import { Link, Routes, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../contexts/authContext";

const DashboardContainer = styled.div`
    width: 55%;
`;

const PostButton = styled.button`
    cursor: pointer;
    background-color: ${({ theme }) => theme.buttonColour};
    color: white;
    width: 100%;
    padding: 10px;
    border-radius: 10px;
`;

const Dashboard = () => {
    const [showPostForm, setShowPostForm] = useState(false);

    function togglePostForm() {
        return setShowPostForm(!showPostForm);
    }

    return (
        <DashboardContainer>
            <PostButton onClick={()=>{
              togglePostForm();  
            }}>Post something</PostButton>
        </DashboardContainer>
    );
};

export default Dashboard;
