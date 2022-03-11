import React, { useContext, useState, useEffect } from "react";
import * as ROUTES from "../helpers/ROUTES";
import { Link, Routes, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { AuthContext } from "../contexts/authContext";
import PostsService from "../services/PostsService";

const DashboardContainer = styled.div`
    width: 55%;
`;

const TogglePostButton = styled.button`
    cursor: pointer;
    background-color: ${({ theme }) => theme.buttonColour};
    color: white;
    width: 100%;
    padding: 10px;
    border-radius: 10px;
`;
const fadeIn = keyframes`
  0% {
   transform: translateY(-100px);
  }
  100% {
   //transform: scaleY(1);
  }
`;
const PostForm = styled.div`
    border: 1px solid ${({ theme }) => theme.mainFontColour};
    border-top: none;
    color: ${({ theme }) => theme.mainFontColour};
    width: 100%;
    padding: 10px;
    box-shadow: ${(props) => props.theme.shadowColour} 0px 1px 1px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    animation: 0.2s ${fadeIn} linear;
    animation-iteration-count: 1;
`;

const PostTextArea = styled.textarea`
    background-color: transparent;
    width: 100%;
    resize: none;
    color: ${({ theme }) => theme.mainFontColour};
    // height: 60px;
    border-bottom: 1px solid ${({ theme }) => theme.mainFontColour};
`;
const OverflowHidden = styled.div`
    overflow: hidden;
`;

const PostSubmit = styled.button`
    cursor: pointer;
    background-color: ${({ theme }) => theme.buttonColour};
    color: white;
    margin-top: 10px;
    width: 20%;
    padding: 10px;
    border-radius: 10px;
`;
const Dashboard = () => {
    const [showPostForm, setShowPostForm] = useState(false);
    const [PostValue, setPostValue] = useState("");
    const [posts, setPosts] = useState([]);
    function togglePostForm() {
        return setShowPostForm(!showPostForm);
    }

    useEffect(() => {
      async function getPosts() {
          let response = await PostsService.getPosts();

          //console.log(response.data);
          setPosts(response.data);
      }
      getPosts()
    
      return () => {
        
      }
    }, [])
    

    return (
        <DashboardContainer>
            <TogglePostButton
                onClick={() => {
                    togglePostForm();
                }}
            >
                {showPostForm ? "Close" : "Post something"}
            </TogglePostButton>
            {showPostForm ? (
                <OverflowHidden>
                    <PostForm>
                        <PostTextArea
                            onChange={(e) => {
                                setPostValue(e.target.value);
                            }}
                            value={PostValue}
                            rows={3}
                            placeholder="What's on your mind?"
                        />
                        <PostSubmit>Post</PostSubmit>
                    </PostForm>
                </OverflowHidden>
            ) : (
                <></>
            )}
            {posts.map((post)=>{
                return (<div>
                    {post.text}
                </div>)    
            })}
        </DashboardContainer>
    );
};

export default Dashboard;
