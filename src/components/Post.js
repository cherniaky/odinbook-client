import React, { useContext, useState, useEffect } from "react";
import * as ROUTES from "../helpers/ROUTES";
import { Link, Routes, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { AuthContext } from "../contexts/authContext";
import PostsService from "../services/PostsService";
import { formatDistance } from "date-fns";
import makeDateAgo from "../helpers/makeDateAgo";

const Card = styled.div`
    background-color: ${(props) => props.theme.cardBg};
    display: flex;
    margin: 20px 0px;
    padding: 20px;
    flex-direction: column;
    box-shadow: ${(props) => props.theme.shadowColour} 0px 1px 2px;
    border-radius: 5px;
`;

const PostUserContainer = styled.div`
    display: flex;
    & i {
        font-size: 40px;
    }
`;
const PostUserInfo = styled.div`
    & b {
        font-weight: bold;
    }
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    & p {
        font-weight: normal;
        font-size: small;
    }
`;
const ProfileImg = styled.img`
    border-radius: 50%;
    width: 40px;
    height: 40px;
`;
const Post = ({ post }) => {
    const { date, likes, name, recipient, recipientName, text, user, _id } =
        post;

    return (
        <Card>
            <PostUserContainer>
                {user.profilePic ? (
                    <ProfileImg src={user.profilePic} />
                ) : (
                    <i className="fa-regular fa-circle-user"></i>
                )}
                <PostUserInfo>
                    {name}{" "}
                    {recipient != user._id
                        ? `posted on ${recipientName} wall`
                        : null}
                    <p>{makeDateAgo(date)} ago</p>
                </PostUserInfo>
            </PostUserContainer>
        </Card>
    );
};

export default Post;
