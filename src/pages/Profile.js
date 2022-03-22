import React, { useContext, useState, useEffect } from "react";
import * as ROUTES from "../helpers/ROUTES";
import { Link, Routes, useNavigate, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { AuthContext } from "../contexts/authContext";
import PostsService from "../services/PostsService";
import Post from "../components/Post";
import SideBar from "../components/SideBar";

const ProfileContainer = styled.div`
    width: 90%;
    display: flex;
    justify-content: center;
    @media screen and (max-width: 750px) {
        flex-direction: column;
        align-items: center;
        width: 100%;
    }
`;

const DashboardContainer = styled.div`
    width: 55%;
    @media screen and (max-width: 750px) {
        width: 90%;
    }
    
`;

const TogglePostButton = styled.button`
    cursor: pointer;
    background-color: ${(props) =>
        props.show ? props.theme.red : props.theme.buttonColour};
    color: white;
    width: 100%;
    padding: 10px;
    border-radius: 5px;
`;
const fadeIn = keyframes`
  0% {
   transform: translateY(0px);
  }
  100% {
   transform: translateY(-100px);
  }
`;
const PostForm = styled.div`
    //border: 1px solid ${({ theme }) => theme.mainFontColour};
    background-color: ${(props) => props.theme.cardBg};
    border-top: none;
    color: ${({ theme }) => theme.mainFontColour};
    width: 100%;
    padding: 10px;
    // box-shadow: ${(props) => props.theme.shadowColour} 0px 2px 2px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transform: ${(props) =>
        props.show ? "translateY(0px)" : "translateY(-150px)"};
    height: ${(props) => (props.show ? "auto" : "150px")};
    align-items: center;
    animation-iteration-count: 1;
`;

const PostTextArea = styled.textarea`
    background-color: transparent;
    width: 100%;
    padding: 10px;
    resize: none;
    color: ${({ theme }) => theme.mainFontColour};
    border-bottom: 1px solid ${({ theme }) => theme.mainFontColour};
`;
const OverflowHidden = styled.div`
    overflow: hidden;
    background-color: transparent;
    margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: ${(props) =>
        props.show ? `${props.theme.shadowColour} 0px 2px 2px` : ""};
`;

const PostSubmit = styled.button`
    cursor: pointer;
    background-color: ${({ theme }) => theme.buttonColour};
    color: white;
    margin-top: 10px;
    width: 30%;
    padding: 10px;
    border-radius: 5px;
    @media screen and (max-width: 750px) {
        width: 90%;
    }
`;
const PostsContainer = styled.div`
    background-color: transparent;
    transform: ${(props) =>
        props.show ? "translateY(0)" : "translateY(-150px)"};
`;

const SideBarContainer = styled.div`
    width: auto;

    flex-grow: 1;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    align-items: center;
    @media screen and (max-width: 750px) {
        width: 100%;
    }
`;

const Profile = () => {
    const { userID } = useParams();
    const [showPostForm, setShowPostForm] = useState(false);
    const [PostValue, setPostValue] = useState("");
    const [posts, setPosts] = useState([]);
    function togglePostForm() {
        return setShowPostForm(!showPostForm);
    }

    useEffect(() => {
        async function getPosts() {
            let response = await PostsService.getPostsReciever(userID);
            setPosts(response.data);
        }
        getPosts();
        // console.log(params);
        // console.log(posts);
        return () => {};
    }, [userID]);

    function handleDeletePost(id) {
        setPosts(posts.filter((post) => post._id !== id));
        async function del() {
            await PostsService.deletePost(id);
        }
        del();
    }

    return (
        <ProfileContainer>
            <SideBarContainer>
                <SideBar />
            </SideBarContainer>
            <DashboardContainer>
                <TogglePostButton
                    show={showPostForm}
                    onClick={() => {
                        togglePostForm();
                    }}
                >
                    {showPostForm ? "Close" : "Post something"}
                </TogglePostButton>

                <OverflowHidden show={showPostForm}>
                    <PostForm show={showPostForm}>
                        <PostTextArea
                            onChange={(e) => {
                                setPostValue(e.target.value);
                            }}
                            value={PostValue}
                            rows={3}
                            placeholder="What's on your mind?"
                        />
                        <PostSubmit
                            onClick={async () => {
                                let res = await PostsService.makePostOnWall(
                                    PostValue,
                                    userID
                                );
                                //console.log(res.data);
                                // let data = await res.json();
                                // console.log(data);
                                setPostValue("");
                                let arr = [
                                    {
                                        ...res.data,
                                        user: { _id: res.data.user },
                                    },
                                    ...posts,
                                ];
                                //console.log(arr);
                                setPosts(arr);
                            }}
                        >
                            Post
                        </PostSubmit>
                    </PostForm>
                </OverflowHidden>
                <PostsContainer show={showPostForm}>
                    {posts.map((post) => {
                        return (
                            <Post
                                key={post._id}
                                handleDeletePost={handleDeletePost}
                                post={post}
                            />
                        );
                    })}
                </PostsContainer>
            </DashboardContainer>
        </ProfileContainer>
    );
};

export default Profile;
