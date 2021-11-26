import React, {useState, useEffect} from "react";
import tw from "twin.macro"; //eslint-disable-line
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

import ProfilHero from "components/hero/ProfilHero.js";


import Footer from "components/footers/FooterIKT.js";

import ProfilHeader from "../components/pageHead/ProfilHeader.js";
import PreferencesHeader from "../components/pageHead/PreferencesHeader.js";

import { Container as ContainerBase } from "components/misc/Layouts";


import styled from "styled-components";
import { ReactComponent as ProfilIcon } from "feather-icons/dist/icons/user.svg";
import logo from "../images/logo.svg";
import DistanceSlider from "../components/sliders/DistanceSlider";
import MeteoSlider from "../components/sliders/MeteoSlider";
import { userSelector } from "state/store/userReducer/selector/userSelector.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";


const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900  sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const MainContent = tw.div`mt-0 flex flex-col items-center`;
const Title = tw.h5`text-2xl font-bold text-center`;
const Form = tw.form`mx-auto max-w-xs mt-0`;
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


export default ({
    submitButtonText = "Enregistrer",
    SubmitButtonIcon = ProfilIcon,
    tosUrl = "#",
    privacyPolicyUrl = "#",
    signInUrl = "#"

 }) => {
    const user = useSelector(userSelector) 
    let [userInfo,setUserInfo] = useState({...user})
    const navigate = useNavigate()
    console.log(user)
 
    useEffect(() => {
        if (!user.isLogged) {
            navigate('/connexion')
            toast.warn('Salut, tu devrais te connecter!')
        }
    },[])
    const onChanged = (e, typeValue) => {
        const newValue = e.target.value
        switch(typeValue){
            case "username": setUserInfo({...userInfo,username:newValue}); break;
            case "email": setUserInfo({...userInfo, email: newValue}); break;
            case "firstname": setUserInfo({...userInfo, firstname: newValue}); break;
            case "lastname": setUserInfo({...userInfo,lastname: newValue}); break;
            case "numberPhone": setUserInfo({...userInfo,numberPhone: newValue}); break;
            case "birthday":  setUserInfo({...userInfo, birthday: newValue}); break;
            case "password": setUserInfo({...userInfo, password: newValue}); break;
            case "city": setUserInfo({...userInfo,city: newValue})
            default:
        }
        
    }
    return (
    <AnimationRevealPage>

        <ProfilHero />
        <ProfilHeader />
            <Content>


                        <MainContainer>
                        <MainContent>
                            <Form>
                                <Title>Modification de vos informations personnelles</Title>
                                <p tw="mt-6 text-xs text-gray-600 text-center">
                                    N'oubliez pas d'enregistrer les modifications de vos informations
                                </p>
                                <Input type="text" placeholder="Prénom" value={userInfo.firstname} onChange={e => onChanged(e,"firstname")} />
                                <Input type="text" placeholder="Nom" value={userInfo.lastname} onChange={e => onChanged(e,"lastname")} />
                                <Input type="text" placeholder="Pseudo" value={userInfo.username} onChange={e => onChanged(e,"username")} />
                                <Input type="email" placeholder="Email" value={userInfo.email} onChange={e => onChanged(e,"email")} />
                                <Input type="date" placeholder="Date de naissance" value={userInfo.birthday} onChange={e => onChanged(e,"birthday")} />
                                <Input type="email" placeholder="Ville" value={userInfo.city}  onChange={e => onChanged(e,"city")} />
                                <Input type="text" placeholder="Numéro de téléphone" value={userInfo.numberPhone} onChange={e => onChanged(e,"numberPhone")} />


                                <SubmitButton type="submit">
                                    <SubmitButtonIcon className="icon" />
                                    <span className="text">{submitButtonText}</span>
                                </SubmitButton>


                            </Form>
                        </MainContent>
            </MainContainer>
            </Content>
        <Content>


            <MainContainer>
                <MainContent>
                    <Form>
                        <Title>Modification mot de passe</Title>
                        <p tw="mt-6 text-xs text-gray-600 text-center">
                            N'oubliez pas d'enregistrer votre nouveau mot de passe
                        </p>
                        <Input type="password" placeholder="Mot de passe actuel" value=""/>
                        <Input type="password" placeholder="Nouveau Mot de passe" value=""/>
                        <Input type="password" placeholder="Confirmer votre mot de passe" value=""/>

                        <SubmitButton type="submit">
                            <SubmitButtonIcon className="icon" />
                            <span className="text">{submitButtonText}</span>
                        </SubmitButton>


                    </Form>
                </MainContent>
            </MainContainer>
        </Content>
        <PreferencesHeader />
        <Content>
            <MainContainer>
                <MainContent>


                        <Form>

                            <p tw="mt-6 mb-5 text-xs text-gray-600 text-left">Définissez la zone où doit se trouver votre destination de voyage ?</p>
                            <DistanceSlider />
                            <p tw="mt-6 mb-5 text-xs text-gray-600 text-left">Comment doit être la météo de votre destination ?</p>
                            <MeteoSlider />
                            <SubmitButton type="submit">
                                <SubmitButtonIcon className="icon" />
                                <span className="text">{submitButtonText}</span>
                            </SubmitButton>
                        </Form>

                </MainContent>
            </MainContainer>

        </Content>
        <Footer />
    </AnimationRevealPage>
)}
