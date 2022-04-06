import React, { useContext, useState, useEffect, useRef } from "react";
import * as ROUTES from "../helpers/ROUTES";
import { Link, Routes, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { AuthContext } from "../contexts/authContext";
import PostsService from "../services/PostsService";
import { formatDistance } from "date-fns";
import makeDateAgo from "../helpers/makeDateAgo";
import { NotificationsContext } from "../contexts/notifyContext";

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

    & .fa-trash {
        display: flex;
        align-items: center;
        font-size: 17px;
        margin-left: auto;
        cursor: pointer;
    }
    & .fa-trash:hover {
        color: ${({ theme }) => theme.red};
    }
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
const PostCommentContainer = styled.div`
    display: flex;
    padding-top: 10px;
    justify-content: stretch;
`;
const Input = styled.input`
    color: ${({ theme }) => theme.mainFontColour};
    flex-grow: 4;
    background-color: ${(props) => props.theme.bodyBg};
    border: 1px solid ${(props) => props.theme.borderColour};
    padding: 6px;
    // margin: 10px 0 0;
    width: 90%;
    border-radius: 5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
`;
const PostCommentButton = styled.button`
    cursor: pointer;
    background-color: ${({ theme }) => theme.buttonColour};
    color: white;
    flex-grow: 1;
    padding: 10px;
    border-radius: 5px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
`;

const CommentContainer = styled.div`
    margin-top: 10px;
    background-color: ${({ theme }) => theme.bodyBg};
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px;
    border-radius: 5px;

    & b {
        //font-weight: bold;
        display: flex;
        justify-content: space-between;
    }
    & a {
        font-weight: bold;
    }
    & p {
        margin-top: 4px;
    }
`;

const CommentText = styled.div`
    white-space: pre-wrap;
    word-wrap: break-word;
    max-width: 100%;
    margin: 5px 0;
    height: fit-content;
`;

const LikeComment = styled.div`
    margin-top: 4px;
    cursor: pointer;
    & i {
        color: ${(props) => (props.active ? props.theme.buttonColour : "")};
    }
    &:hover i {
        color: ${({ theme }) => theme.buttonColour};
    }
`;

const ShowComments = styled.button`
    border-radius: 5px;
    width: 100%;
    cursor: pointer;
    background-color: ${({ theme }) => theme.bodyBg};
    color: ${({ theme }) => theme.mainFontColour};
    padding: 4px;
    margin: 10px 0 0;
`;

const Post = ({ post, handleDeletePost }) => {
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
    const [comment, setComment] = useState("");
    const [showComments, setShowComments] = useState(false);
    //  console.log(postLikes);
    //  console.log(postCom);
    const { authState, dispatch } = useContext(AuthContext);
    const { Open } = useContext(NotificationsContext);
    const inputref = useRef(null);

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
                            <Link to={`/users/${user._id}`}>{name}</Link>
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
                {user._id == authState.user._id ? (
                    <i
                        onClick={() => {
                            handleDeletePost(_id);
                        }}
                        className="fa-solid fa-trash"
                    ></i>
                ) : (
                    <></>
                )}
            </PostUserContainer>
            <CommentText>{text}</CommentText>
            <PostUserContainerSpaceBettwen>
                <div>
                    {postLikes.length}{" "}
                    {postLikes.length == 1 ? "like" : "likes"}
                </div>
                <div>
                    {postComments.length}{" "}
                    {postComments.length == 1 ? "comment" : "comments"}
                </div>
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
                            setPostLikes(
                                postLikes.filter(
                                    ({ user }) => user != authState.user._id
                                )
                            );
                            await PostsService.likePost(_id);
                            // console.log(postLikes);
                            return;
                        }
                        setPostLikes([
                            ...postLikes,
                            { user: authState.user._id },
                        ]);
                        await PostsService.likePost(_id);

                        //console.log(postLikes);
                        return;
                    }}
                >
                    <i className="fas fa-thumbs-up"></i>{" "}
                    {postLikes.some(({ user }) => user == authState.user._id)
                        ? "You liked this post"
                        : "Like"}
                </ActionButton>
                <ActionButton
                    onClick={() => {
                        inputref.current.focus();
                    }}
                >
                    {" "}
                    <i className="fas fa-comments"></i> Comment
                </ActionButton>
            </ActionContainer>
            {showComments ? (
                <ShowComments
                    onClick={() => {
                        setShowComments(false);
                    }}
                >
                    Hide comments
                </ShowComments>
            ) : (
                <></>
            )}
            {postComments.map((comment, i) => {
                // console.log(comment);
                if (i == postComments.length - 1 && !showComments) {
                    return (
                        <div key={comment._id}>
                            {postComments.length != 1 ? (
                                <ShowComments
                                    onClick={() => {
                                        setShowComments(true);
                                    }}
                                >
                                    Show more comments
                                </ShowComments>
                            ) : (
                                <></>
                            )}

                            <CommentContainer key={comment._id}>
                                {" "}
                                <b>
                                    <Link to={`users/${comment.user}`}>
                                        {" "}
                                        {comment.name}
                                    </Link>
                                    {makeDateAgo(comment.date)} ago
                                </b>{" "}
                                <p> {comment.text}</p>
                                <LikeComment
                                    active={comment.likes.some(
                                        (like) =>
                                            like.user === authState.user._id
                                    )}
                                    onClick={async () => {
                                        //  let commentid = 0;
                                        async function likeComment() {
                                            await PostsService.likeComment(
                                                _id,
                                                comment._id
                                            );
                                        }
                                        setPostComments(
                                            postComments.map((postcomment) => {
                                                if (
                                                    postcomment._id ===
                                                    comment._id
                                                ) {
                                                    // console.log(postcomment.likes);
                                                    if (
                                                        postcomment.likes.some(
                                                            (like) =>
                                                                like.user ===
                                                                authState.user
                                                                    ._id
                                                        )
                                                    ) {
                                                        likeComment();
                                                        return {
                                                            ...postcomment,
                                                            likes: postcomment.likes.filter(
                                                                (like) =>
                                                                    like.user !==
                                                                    authState
                                                                        .user
                                                                        ._id
                                                            ),
                                                        };
                                                    }

                                                    likeComment();

                                                    postcomment.likes.push({
                                                        user: authState.user
                                                            ._id,
                                                    });

                                                    return {
                                                        ...postcomment,
                                                        likes: postcomment.likes,
                                                    };
                                                }

                                                return postcomment;
                                            })
                                        );
                                    }}
                                >
                                    {" "}
                                    <i className="fas fa-thumbs-up"></i>{" "}
                                    {comment.likes.length}
                                </LikeComment>
                            </CommentContainer>
                        </div>
                    );
                } else if (showComments) {
                    return (
                        <div key={comment._id}>
                            <CommentContainer key={comment._id}>
                                {" "}
                                <b>
                                    <Link to={`users/${comment.user}`}>
                                        {" "}
                                        {comment.name}
                                    </Link>
                                    {makeDateAgo(comment.date)} ago
                                </b>{" "}
                                <p> {comment.text}</p>
                                <LikeComment
                                    active={comment.likes.some(
                                        (like) =>
                                            like.user === authState.user._id
                                    )}
                                    onClick={async () => {
                                        //  let commentid = 0;
                                        async function likeComment() {
                                            await PostsService.likeComment(
                                                _id,
                                                comment._id
                                            );
                                        }
                                        setPostComments(
                                            postComments.map((postcomment) => {
                                                if (
                                                    postcomment._id ===
                                                    comment._id
                                                ) {
                                                    // console.log(postcomment.likes);
                                                    if (
                                                        postcomment.likes.some(
                                                            (like) =>
                                                                like.user ===
                                                                authState.user
                                                                    ._id
                                                        )
                                                    ) {
                                                        likeComment();
                                                        return {
                                                            ...postcomment,
                                                            likes: postcomment.likes.filter(
                                                                (like) =>
                                                                    like.user !==
                                                                    authState
                                                                        .user
                                                                        ._id
                                                            ),
                                                        };
                                                    }

                                                    likeComment();

                                                    postcomment.likes.push({
                                                        user: authState.user
                                                            ._id,
                                                    });

                                                    return {
                                                        ...postcomment,
                                                        likes: postcomment.likes,
                                                    };
                                                }

                                                return postcomment;
                                            })
                                        );
                                    }}
                                >
                                    {" "}
                                    <i className="fas fa-thumbs-up"></i>{" "}
                                    {comment.likes.length}
                                </LikeComment>
                            </CommentContainer>
                        </div>
                    );
                }
            })}

            <PostCommentContainer>
                <Input
                    ref={inputref}
                    value={comment}
                    onChange={(e) => {
                        setComment(e.target.value);
                    }}
                    placeholder="Post a comment"
                />
                <PostCommentButton
                    onClick={async () => {
                        let res = await PostsService.makePostComment(
                            _id,
                            comment
                        );
                        setComment("");
                        Open("Comment added");
                        //console.log(res.data);
                        setPostComments(res.data);
                    }}
                >
                    Post
                </PostCommentButton>
            </PostCommentContainer>
        </Card>
    );
};

export default Post;
