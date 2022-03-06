import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import styled from "styled-components";

const LoginForm = styled.form`
    background-color: ${(props) => props.theme.cardBg};
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin: 20px;
    width: 30%;
`;
const EmailInput = styled.input.attrs((props) => ({
    type: "email",
}))`
    background-color: ${(props) => props.theme.bodyBg};

    padding: 10px;
    margin: 10px 0;
    width: 100%;
`;

const PasswordInput = styled.input.attrs((props) => ({
    type: "password",
}))`
    background-color: ${(props) => props.theme.bodyBg};

    padding: 10px;
    margin: 10px 0;
    width: 100%;
`;

export const Login = () => {
    const { login, isAuth, user } = useContext(AuthContext);

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    return (
        <>
            <LoginForm
                onSubmit={async (e) => {
                    e.preventDefault();
                    await login("yurii.cherniak@gmail.com", "123456");
                    // console.log(isAuth);
                    // console.log(user );
                }}
            >
                <EmailInput
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <PasswordInput
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />

                <input type="submit" value="Login" />
            </LoginForm>
        </>
    );
};
