import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import * as ROUTES from "../helpers/ROUTES";

const LoginForm = styled.form`
    background-color: ${(props) => props.theme.cardBg};
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
    padding: 32px;
    margin: 20px;
    width: 30%;
    box-shadow: ${(props) => props.theme.shadowColour} 0px 1px 2px;
    border-radius: 40px;

    @media screen and (max-width: 1200px) {
        width: 50%;
    }
    @media screen and (max-width: 710px) {
        width: 70%;
    }
    @media screen and (max-width: 460px) {
        width: 90%;
    }
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
const NameInput = styled(Input).attrs((props) => ({
    type: "text",
}))`
    width: 95%;
`;

const PasswordInput = styled(Input).attrs((props) => ({
    type: "password",
}))``;

const SignUpButton = styled.input.attrs((props) => ({
    type: "submit",
    value: "Sign up",
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

    color: white;
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
    display: flex;
    flex-direction: column;
`;
const InputNameGroup = styled.div`
    margin: 10px 0;
    display: flex;
`;

const ErrorDiv = styled.div`
    width: 100%;
    color: white;
    background-color: rgb(209, 62, 62);
    padding: 10px;
    text-align: center;
    border-radius: 6px;
`;

const LineOr = styled.hr`
    margin-top: 30px;
    position: relative;
    top: 12px;
    border-top: 2px solid ${(props) => props.theme.borderColour};
`;

const Or = styled.div`
    position: relative;
    top: -10px;
    background-color: ${(props) => props.theme.cardBg};
    z-index: 10;
    padding: 10px;
    font-weight: bold;
    border-radius: 50%;
    border: 1px solid ${(props) => props.theme.borderColour};
    width: min-content;
    align-self: center;
`;

const FacebookLoginContainer = styled.div`
    display: flex;
    justify-content: center;
`;
const LoginHeader = styled.h1`
    font-size: 25px;
    font-weight: bold;
    align-self: center;
`;
const LoginDescription = styled.div`
    align-self: center;
    text-align: center;
    margin: 10px 0;
    & a {
        color: blue;
    }
`;

function SignUp() {
     const navigate = useNavigate();

    const { authState, dispatch } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [familyName, setFamilyName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmError, setConfirmError] = useState("");

    return (
        <>
            <LoginForm
                onSubmit={(e) => {
                    e.preventDefault();
                    if (password != confirmPassword) {
                        setConfirmError("Confirm password are not equal");
                        return;
                    }
                    dispatch({
                        type: "signUp",
                        payload: {
                            email,
                            firstName,
                            familyName,
                            password,
                            confirmPassword,
                        },
                    });

                    navigate(ROUTES.LOGIN);
                }}
            >
                <LoginHeader>Sign up</LoginHeader>

                <LoginDescription>
                    Already have an account?
                    <Link to={ROUTES.LOGIN}> Log in</Link>
                </LoginDescription>

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

                <InputNameGroup>
                    <InputGroup>
                        <label htmlFor="fname">First name:</label>
                        <NameInput
                            required
                            id="fname"
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }}
                        />
                    </InputGroup>
                    <InputGroup>
                        <label htmlFor="lname">Family name:</label>
                        <NameInput
                            required
                            id="lname"
                            value={familyName}
                            onChange={(e) => {
                                setFamilyName(e.target.value);
                            }}
                        />
                    </InputGroup>
                </InputNameGroup>
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

                {confirmError ? <ErrorDiv>{confirmError}</ErrorDiv> : null}

                <InputGroup>
                    <label htmlFor="cpass">Confirm Password:</label>
                    <PasswordInput
                        required
                        id="cpass"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                    />
                </InputGroup>

                <SignUpButton />
            </LoginForm>
        </>
    );
}

export default SignUp;
