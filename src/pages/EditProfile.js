import React, { useContext, useState, useEffect, useReducer } from "react";
import * as ROUTES from "../helpers/ROUTES";
import { Link, Routes, useNavigate, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { AuthContext } from "../contexts/authContext";
import PostsService from "../services/PostsService";
import UsersService from "../services/UsersService";

import { Input, InputGroup } from "./Login";

const Card = styled.div`
    position: relative;
    background-color: ${(props) => props.theme.cardBg};
    display: flex;

    margin: 20px 0px;
    padding: 20px;
    flex-direction: column;
    box-shadow: ${(props) => props.theme.shadowColour} 0px 1px 2px;
    border-radius: 5px;
`;
const EditCard = styled(Card)`
    width: 40%;
    @media screen and (max-width: 850px) {
        width: 90%;
    }
`;

export const Button = styled.button`
    height: 34.8px;
    padding: 0 10px;
    cursor: pointer;
    color: white;
    background-color: ${({ theme }) => theme.buttonColour};
    border-radius: 5px;
`;

const Header = styled.header`
    font-size: 30px;
    margin-bottom: 10px;
    align-self: center;
`;

const EditProfile = () => {
    const initialState = {
        location: "",
        bio: "",
        occupation: "",
    };

    const { authState, dispatch } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function editReducer(state, action) {
        if (action.variable) {
            return {
                ...state,
                [action.variable]: action.value,
            };
        }

        return {
            ...state,
            ...action,
        };
    }

    const [{ location, occupation, bio }, dispatchEditProfile] = useReducer(
        editReducer,
        initialState
    );

    useEffect(() => {
        async function getUser() {
            setLoading(true);
            let res = await UsersService.getUser(authState.user._id);

            // console.log(res.data);
            dispatchEditProfile(res.data.profile);
            setLoading(false);
        }
        getUser();
        return () => {};
    }, []);

    const handleSave = async () => {
        let res = await UsersService.updateProfile(location, occupation, bio);
        navigate(`/users/${authState.user._id}`);
    };
    if (loading) {
        return <EditCard>Wait...</EditCard>;
    }

    return (
        <EditCard>
            <Header>Edit your profile</Header>
            <InputGroup>
                <label>Location:</label>
                <Input
                    value={location}
                    onChange={(e) => {
                        dispatchEditProfile({
                            variable: "location",
                            value: e.target.value,
                        });
                    }}
                />
            </InputGroup>
            <InputGroup>
                <label>A little about yourself:</label>
                <Input
                    value={bio}
                    onChange={(e) => {
                        dispatchEditProfile({
                            variable: "bio",
                            value: e.target.value,
                        });
                    }}
                />
            </InputGroup>
            <InputGroup>
                <label>Occupation:</label>
                <Input
                    value={occupation}
                    onChange={(e) => {
                        dispatchEditProfile({
                            variable: "occupation",
                            value: e.target.value,
                        });
                    }}
                />
            </InputGroup>
            <Button
                onClick={() => {
                    handleSave();
                }}
            >
                Save changes
            </Button>
        </EditCard>
    );
};

export default EditProfile;
