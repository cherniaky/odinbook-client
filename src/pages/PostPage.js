import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostsService from "./../services/PostsService";
import Post from "./../components/Post";

export const PostPage = () => {
    const [post, setPost] = useState(null);
    const [postdontexisr, setpostdontexisr] = useState(false);
    const { postid } = useParams();

    useEffect(() => {
        async function g() {
            let res = PostsService.getPost(postid);
            //console.log((await res).data);
            setPost((await res).data);
            if ((await res).data == null) {
                setpostdontexisr(true);
            } else {
                setpostdontexisr(false);
            }
        }
        g();
        return () => {};
    }, [postid]);

    useEffect(() => {
       // console.log(post);
        return () => {};
    }, [post]);
    if (postdontexisr) {
        return <>Post not exist</>;
    }

    if (!post) {
        return <>Loading...</>;
    }

    // return <>Post </>;
    return (
        <>
            <Post post={post} />
        </>
    );
};
