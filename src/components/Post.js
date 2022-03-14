import React, { useContext, useState, useEffect } from "react";
import * as ROUTES from "../helpers/ROUTES";
import { Link, Routes, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { AuthContext } from "../contexts/authContext";
import PostsService from "../services/PostsService";
import { formatDistance } from "date-fns";
import makeDateAgo from "../helpers/makeDateAgo";
import { id } from "date-fns/locale";

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
    margin-bottom: 10px;
`;
const PostUserContainerSpaceBettwen = styled.div`
    display: flex;
    justify-content: space-between;
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
const ActionContainer = styled.div`
    border-top: 1px solid ${({ theme }) => theme.borderColor};
    border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;
const ActionButton = styled.button`
    color: ${({ theme }) => theme.mainFontColour};
    padding: 5px;
    margin: 5px 0;
    cursor: pointer;
    width: 50%;
    border-radius: 5px;
    background-color: transparent;
    i {
        //${(props) => (props.active ? props.theme.buttonColour : "")};
        color: ${(props) => (props.active ? props.theme.buttonColour : "")};
    }
    &:hover {
        background-color: ${({ theme }) => theme.secondaryBg};
        i {
            color: ${({ theme }) => theme.buttonColour};
        }
    }
`;
const Post = ({ post }) => {
    let {
        date,
        likes,
        name,
        comments,
        recipient,
        recipientName,
        text,
        user,
        _id,
    } = post;
    const [postLikes, setPostLikes] = useState(likes);
    const [postComments, setPostComments] = useState(comments);
    //  console.log(postLikes);
    const { authState, dispatch } = useContext(AuthContext);

    return (
        <Card>
            <PostUserContainer>
                {user.profilePic ? (
                    <ProfileImg src={user.profilePic} />
                ) : (
                    <i className="fa-regular fa-circle-user"></i>
                )}
                <PostUserInfo>
                    <div>
                        <b>
                            <Link to={`users/${user._id}`}>{name}</Link>
                        </b>{" "}
                        {recipient != user._id ? (
                            <>
                                {" "}
                                posted on{" "}
                                <b>
                                    <Link to={`users/${recipient}`}>
                                        {recipientName}
                                    </Link>{" "}
                                </b>
                                wall
                            </>
                        ) : null}
                    </div>
                    <p>{makeDateAgo(date)} ago</p>
                </PostUserInfo>
            </PostUserContainer>
            <PostUserContainer>{text}</PostUserContainer>
            <PostUserContainerSpaceBettwen>
                <div>{postLikes.length} likes</div>
                <div>{postComments.length} comments</div>
            </PostUserContainerSpaceBettwen>
            <ActionContainer>
                <ActionButton
                    active={postLikes.some(
                        ({ user }) => user == authState.user._id
                    )}
                    onClick={async () => {
                        //  console.log(authState.user._id);
                        // console.log(likes);
                        if (
                            postLikes.some(
                                ({ user }) => user == authState.user._id
                            )
                        ) {
                            // postLikes.splice(
                            //     postLikes.indexOf(authState.user._id),
                            //     1
                            // );
                            setPostLikes(
                                postLikes.filter(
                                    ({ user }) => user != authState.user._id
                                )
                            );
                            await PostsService.likePost(_id);
                            console.log(postLikes);
                            return;
                        }
                        setPostLikes([
                            ...postLikes,
                            { user: authState.user._id },
                        ]);
                        await PostsService.likePost(_id);
                        // postLikes.push(authState.user._id);
                        console.log(postLikes);
                        return;
                    }}
                >
                    <i className="fas fa-thumbs-up"></i>{" "}
                    {postLikes.some(({ user }) => user == authState.user._id)
                        ? "You liked this post"
                        : "Like"}
                </ActionButton>
                <ActionButton>
                    {" "}
                    <i className="fas fa-comments"></i> Comment
                </ActionButton>
            </ActionContainer>
        </Card>
    );
};

export default Post;
