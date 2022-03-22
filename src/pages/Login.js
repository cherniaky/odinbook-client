import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import styled from "styled-components";
import { Link, Routes, useNavigate } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import * as ROUTES from "../helpers/ROUTES";

const LoginForm = styled.form`
    background-color: ${(props) => props.theme.cardBg};
    color: ${({ theme }) => theme.mainFontColour};
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
    color: ${({ theme }) => theme.mainFontColour};
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
    background-color: ${(props) => props.theme.buttonColour};
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
        font-weight: bold;
        color: ${(props) => props.theme.linkColour};
    }
`;

const FacebookLoginContainer = styled.div`
    display: flex;
    justify-content: center;
`;

function Login() {  
    let navigate = useNavigate();
    
    const { authState, dispatch } = useContext(AuthContext);
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
      
        dispatch({
            type:"deleteError"
        })
      return () => {
        
      }
    }, [])
    
    const responseFacebook = (response) => {
        //console.log(response);
        let firstName,familyName;
    
        if (response.name.includes(" ")) {
            firstName=response.name.split(" ")[0]
            familyName=response.name.split(" ")[1]
        }
        else{
            firstName=response.name;
        }
    
        dispatch({
            type: "loginFacebook",
            payload: {
                facebookId:response.id,
                email:response.email,
                profilePic:response.picture.data.url,
                firstName,
                familyName,
            },
        });
    };

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
                <LoginHeader>Log in</LoginHeader>

                <LoginDescription>Don't have an account? 
                <Link to={ROUTES.SIGN_UP}> Sign Up</Link>
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
                <LineOr />
                <Or>OR</Or>
                <FacebookLoginContainer>
                    <FacebookLogin
                        appId="3201779453423648"
                        autoLoad={false}
                        fields="name,email,picture"
                        onClick={() => console.log("click")}
                        callback={responseFacebook}
                    />
                </FacebookLoginContainer>
            </LoginForm>
        </>
    );
}

export default Login;
