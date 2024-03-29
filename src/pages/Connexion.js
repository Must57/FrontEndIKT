import React,{useState} from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import {toast, ToastContainer} from 'react-toastify'
import {Link, useNavigate} from "react-router-dom"
import styled from "styled-components";
import {css} from "styled-components/macro"; //eslint-disable-line
import illustration from "images/connexion.svg";
import logo from "images/LogoWhite.svg";

import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "state/store/userReducer/selector/userSelector";
import axios from "axios";
import { loginUser, updateInformationUser } from "state/store/userReducer/actions/userAction";

const Container = tw(ContainerBase)`min-h-screen bg-orange-400 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12  p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`w-40 mx-auto`;
const MainContent = tw.div`mt-8 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl -mt-10 font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;



const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-orange-400 text-gray-100 w-full py-4 rounded-lg hover:bg-orange-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-orange-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
`;

const  Connexion =  ({
                    logoLinkUrl = "#",
                    illustrationImageSrc = illustration,
                    headingText = "Connexion",

                    submitButtonText = "Connexion",
                    SubmitButtonIcon = LoginIcon,
                    forgotPasswordUrl = "#",
                    signupUrl = "#",

                }) =>  {
                    const [loginData, setLoginData] = useState({username:'', password:''})

                    const userState = useSelector(userSelector)
                    const dispatch = useDispatch()
                    const navigate = useNavigate()
                    const [inProcess, setProcess] = useState(false)
                    const onClick = async (e) => {
                        e.preventDefault()
                        setProcess(true)
                        try {
                        const dataHttp = await axios.post('http://localhost:8000/login',loginData)
                        console.log(dataHttp)
                        if (dataHttp.data.type === "auth_success") {
                            // we get the bearer.
                            dispatch(loginUser({payload: dataHttp.data.token_bearer}))
                            dispatch(updateInformationUser(dataHttp.data.user))
                            localStorage.setItem('user_info', JSON.stringify(dataHttp.data.user))
                            localStorage.setItem('user_token',dataHttp.data.token_bearer)
                            toast.success('Connecté! Bienvenue sur IKnowTravel!')
                            //  and dispatch the information user.
                        }
                        setProcess(false)
                        }catch(err){
                            toast.error('Authentification failed. Please try again!')
                            setProcess(false)
                        }
                    }
                    if (userState.isLogged) {
                        navigate("/")
                    }
                    const onChange = (e, type) => {
                        switch(type){
                            case "username": setLoginData({...loginData,username: e.target.value}); break;
                            case "password": setLoginData({...loginData, password: e.target.value}); break;
                        }
                    }
                    return (
    <AnimationRevealPage>
    
        <Container>
            <Content>
                <MainContainer>
                    <LogoLink href={logoLinkUrl}>
                        <LogoImage src={logo} />
                    </LogoLink>
                    <MainContent>
                        <Heading>{headingText}</Heading>
                        <FormContainer>


                            <Form>
                                <Input type="text" placeholder="Pseudonyme" onChange={e => onChange(e,"username")} />
                                <Input type="password" placeholder="Mot de passe"  onChange={e => onChange(e,"password")} />
                                {!inProcess && (<SubmitButton  type="submit" onClick={onClick}>
                                    <SubmitButtonIcon className="icon" />
                                    <span className="text">{submitButtonText}</span>
                                </SubmitButton>)}
                                {inProcess && (<center><br /><ClipLoader color="#f6ad55" /></center>)}
                            </Form>
                            <p tw="mt-6 text-xs text-gray-600 text-center">
                                <a href={forgotPasswordUrl} tw="border-b border-gray-500 border-dotted">
                                    Mot de passe oubliés ?
                                </a>
                            </p>
                            <p tw="mt-8 text-sm text-gray-600 text-center">
                                Vous n'avez pas de compte ?{" "}
                                <a href="#" tw="border-b border-gray-500 border-dotted">
                                    <Link to ="/inscription">Inscription</Link>
                                </a>
                            </p>
                        </FormContainer>
                    </MainContent>
                </MainContainer>
                <IllustrationContainer>
                    <IllustrationImage imageSrc={illustrationImageSrc} />
                </IllustrationContainer>
            </Content>
        </Container>
    </AnimationRevealPage>
)
}
export default Connexion