import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = styled.form`
    background-color: ${(props) => props.theme.cardBg};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 32px;
    margin: 20px;
    width: 30%;
    box-shadow: ${(props) => props.theme.shadowColour} 0px 1px 2px;
    border-radius: 40px;
`;

const Input = styled.input`
    background-color: ${(props) => props.theme.bodyBg};
    border: 1px solid ${(props) => props.theme.borderColour};
    padding: 6px;
    margin: 5px 0 10px 0;
    width: 100%;
`;

const EmailInput = styled(Input).attrs((props) => ({
    type: "email",
}))``;

const PasswordInput = styled(Input).attrs((props) => ({
    type: "password",
}))``;

const LoginButton = styled.input.attrs((props) => ({
    type: "submit",
    value: "Log in",
}))`
    cursor: pointer;
    background-color: ${(props) => props.theme.headerColour};
    color: white;
    padding: 6px;
    margin: 5px 0;
    box-shadow: ${(props) => props.theme.shadowColour} 0px 2px 2px;
    &:hover {
        opacity: 0.9;
        box-shadow: none;
    }
`;

const LoginSampleButton = styled.button`
    cursor: pointer;
    background-color: green;

    color:white;
    padding: 6px;
    margin: 10px 0;
    box-shadow: ${(props) => props.theme.shadowColour} 0px 2px 2px;
    &:hover {
        opacity: 0.9;
        box-shadow: none;
    }
`;

const InputGroup = styled.div`
    margin: 10px 0;
`;

const ErrorDiv = styled.div`
    width: 100%;
    color: white;
    background-color: rgb(209, 62, 62);
    padding: 10px;
    text-align: center;
    border-radius: 6px;
`;

function Login() {
    let navigate = useNavigate();

    const { authState, dispatch } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   
    return (
        <>
            <LoginForm
                onSubmit={(e) => {
                    e.preventDefault();
                   
                    dispatch({
                        type: "login",
                        payload: {
                            email,
                            password,
                        },
                    });
                   
                    //navigate("/");
                }}
            >
                {authState.error ? (
                    <ErrorDiv>{authState.error}</ErrorDiv>
                ) : null}

                <InputGroup>
                    <label htmlFor="email">Email:</label>
                    <EmailInput
                        required
                        id="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </InputGroup>
                <InputGroup>
                    <label htmlFor="pass">Password:</label>
                    <PasswordInput
                        required
                        id="pass"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </InputGroup>

                <LoginButton />
                <LoginSampleButton
                    onClick={(e) => {
                        e.preventDefault();
                        
                        dispatch({
                            type: "loginSample",
                        });
                        
                        // navigate("/");
                    }}
                >
                    Log in with sample account
                </LoginSampleButton>
            </LoginForm>
        </>
    );
}

export default Login;
