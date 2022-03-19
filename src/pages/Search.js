import React, { useContext, useState, useEffect } from "react";
import * as ROUTES from "../helpers/ROUTES";
import { Link, Routes, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { AuthContext } from "../contexts/authContext";
import useQuery from "../helpers/useQuery";
import UsersService from "../services/UsersService";
import Fuse from "fuse.js";

const ResultContainer = styled.ul`
    width: 50%;
    @media screen and (max-width: 750px) {
        width: 90%;
    }
`;

const ResultItem = styled.li`
    font-size: 24px;
    margin: 20px 0;
    border-radius: 5px;
    padding: 10px;
    &:hover {
        background-color: ${({ theme }) => theme.buttonColour};
        color: white;
    }
    display: flex;
    align-items: center;
    & img {
        border-radius: 50%;
        margin-right: 20px;
    }
    & i {
        font-size: 50px;
        margin-right: 20px;
    }
`;

const Empty = styled.section`
    justify-content: center;
    margin-top: 40px;
    display: flex;
    font-size: 30px;
`;

const Search = () => {
    let query = useQuery();

    const { authState, dispatch } = useContext(AuthContext);
    const [userValue, setUserValue] = useState(query.get("user"));
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setUserValue(query.get("user"));
    }, [query]);

    const options = {
        includeScore: true,
        keys: ["firstName", "familyName"],
    };

    useEffect(() => {
        async function getUsers() {
            let res = await UsersService.getUsers();

            //  console.log(res.data);
            setUsers(
                res.data.filter((user) => user._id !== authState.user._id)
            );
        }
        getUsers();

        return () => {};
    }, []);

    const fuse = new Fuse(users, options);
    // useEffect(() => {
    //     //console.log(query.get("user"));
    //     const result = fuse.search(userValue);
    //     console.log(result);
    //     setSortedUsers(result);
    //     return () => {};
    // }, [query]);

    return (
        <ResultContainer>
            {fuse.search(userValue).map(({ item: user }) => {
                return (
                    <Link key={user._id} to={`/users/${user._id}`}>
                        <ResultItem>
                            {" "}
                            {user.profilePic ? (
                                <img src={user.profilePic} />
                            ) : (
                                <i className="fa-regular fa-circle-user"></i>
                            )}
                            {user.firstName + " " + user.familyName}
                        </ResultItem>
                    </Link>
                );
            })}
            {fuse.search(userValue).length == 0 ? (
                <Empty>
                    <i className="fa-solid fa-magnifying-glass"></i>Didn't find
                    any user
                </Empty>
            ) : (
                <></>
            )}
        </ResultContainer>
    );
};

export default Search;
