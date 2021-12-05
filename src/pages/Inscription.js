import React,{useState, useRef, useCallback} from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import {ClipLoader} from 'react-spinners'
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios'
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import illustration from "images/inscriptions.svg";
import logo from "images/LogoWhite.svg";
import googleIconImageSrc from "images/google-icon.png";
import twitterIconImageSrc from "images/twitter-icon.png";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { userSelector } from "state/store/userReducer/selector/userSelector";

const Container = tw(ContainerBase)`min-h-screen bg-orange-400 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`w-40 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
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
  ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
`;

export default ({
                    logoLinkUrl = "#",
                    illustrationImageSrc = illustration,
                    headingText = "Inscription",

                    submitButtonText = "Inscription",
                    SubmitButtonIcon = SignUpIcon,
                    tosUrl = "#",
                    privacyPolicyUrl = "#",
                    signInUrl = "#"
                }) => {
                    const ref = useRef(null)
                    const userState = useSelector(userSelector)
                    const navigator = useNavigate()
                    const [inProcess, setProcess] = useState(false)
                    const [registerData, setRegisterData] = useState({
                        birthday: "",
                        firstname: "",
                        lastname: "",
                        email: "",
                        username: "",
                        city: "",
                        password:"",
                        numberPhone: ""
                    })
                    if (userState.isLogged) {
                        navigator("/", {replace:true})
                    }
                    const apiCall = useCallback(async (data) => {
                        try {
                        let result = await axios.post('http://localhost:3031/createUser',data)
                        return result.data
                        }
                        catch(err){
                            setProcess(false)
                        }
                    })
                    const onSubmitInfo = async (e) => {e.preventDefault(); 
                        console.log(e);

                        setProcess(true)
                         console.log(ref)
                       
                         if (registerData.birthday !== "" 
                         && registerData.city !== "" 
                         && registerData.email !== ""
                         && registerData.firstname !== ""
                         && registerData.lastname !== ""
                         && registerData.numberPhone !== ""
                         && registerData.password !== ""
                         && registerData.username !== ""
                         
                         ) {
                             
                           const res =  await apiCall({
                                birthday: registerData.birthday,
                                firstname: registerData.firstname,
                                lastname: registerData.lastname,
                                email: registerData.email,
                                username: registerData.username,
                                city: registerData.city,
                                password:registerData.password,
                                numberPhone: registerData.numberPhone
        
                            })

                            if (res.error === "exist_username") {
                                setProcess(false)
                                toast.error("Pseudonyme existe déjà !")
                            }
                            if (res.error==="exist_email"){
                                setProcess(false)
                                toast.error("L'adresse email existe déjà !")
                            }

                            else {
                                toast.success('Inscription effectuée !')
                         
                                navigator("/preferences", {state:{...registerData, userId: res.user._id}})
                                setProcess(false)
                            
                            }
                         }else{
                             setProcess(false)
                             toast.error('Completez tous les champs')
                         }
                
                    }

                    const onChanged = (e, typeValue) => {
                        const newValue = e.target.value
                        switch(typeValue){
                            case "username": setRegisterData({...registerData,username:newValue}); break;
                            case "email": setRegisterData({...registerData, email: newValue}); break;
                            case "firstname": setRegisterData({...registerData, firstname: newValue}); break;
                            case "lastname": setRegisterData({...registerData,lastname: newValue}); break;
                            case "numberPhone": setRegisterData({...registerData,numberPhone: newValue}); break;
                            case "birthday":  setRegisterData({...registerData, birthday: newValue}); break;
                            case "password": setRegisterData({...registerData, password: newValue}); break;
                            case "city": setRegisterData({...registerData,city: newValue})
                            default:
                        }
                        console.log(registerData)
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

                            <Form name="info" onSubmit={onSubmitInfo} ref={ref}>
                                <Input type="text" placeholder="Prénom" onChange={(e) => onChanged(e,"firstname")}/>
                                <Input type="text" placeholder="Nom" onChange={(e) => onChanged(e,"lastname")}/>
                                <Input type="text" placeholder="Pseudo" onChange={(e) => onChanged(e,"username")}/>
                                <Input type="email" placeholder="Email" onChange={(e) => onChanged(e,"email")}/>
                                <Input type="date" placeholder="Date de naissance" onChange={(e) => onChanged(e,"birthday")} />
                                <Input type="text" placeholder="Ville" onChange={(e) => onChanged(e,"city")}/>
                                <Input type="text" placeholder="Numéro de téléphone" onChange={(e) => onChanged(e,"numberPhone")}/>
                                <Input type="password" placeholder="Mot de passe" onChange={(e) => onChanged(e,"password")}/>
                               {!inProcess && ( <SubmitButton type="submit">
                                    <SubmitButtonIcon className="icon" />
                                    <span className="text">{submitButtonText}</span>
                                </SubmitButton>)}
                                {inProcess && (<center><br /><ClipLoader color="#f6ad55" /></center>)}
                                <p tw="mt-6 text-xs text-gray-600 text-center">
                                    J'accepte de respecter les {" "}
                                    <a href={tosUrl} tw="border-b border-gray-500 border-dotted">
                                        Conditions d'utilisations
                                    </a>{" "}
                                    et sa{" "}
                                    <a href={privacyPolicyUrl} tw="border-b border-gray-500 border-dotted">
                                        Politique de confidentialité
                                    </a>
                                </p>

                                <p tw="mt-8 text-sm text-gray-600 text-center">
                                    Vous avez déjà un compte ?{" "}
                                    <a href="#" tw="border-b border-gray-500 border-dotted">
                                        <Link to="/connexion">Connexion</Link>
                                    </a>
                                </p>
                            </Form>
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
