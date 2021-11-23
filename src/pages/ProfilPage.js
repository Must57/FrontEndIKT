import React, {useState} from "react";
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
  console.log(user)
    
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
                                <Input type="text" placeholder="Prénom" value={user.firstname}/>
                                <Input type="text" placeholder="Nom" value={user.lastname}/>
                                <Input type="text" placeholder="Pseudo" value={user.username}/>
                                <Input type="email" placeholder="Email" value={user.email}/>
                                <Input type="date" placeholder="Date de naissance" value={user.birthday} />
                                <Input type="email" placeholder="Ville" value={user.city} />
                                <Input type="text" placeholder="Numéro de téléphone" value={user.numberPhone}/>


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
