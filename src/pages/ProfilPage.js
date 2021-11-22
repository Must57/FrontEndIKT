import React from "react";
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


const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900  sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const MainContent = tw.div`mt-0 flex flex-col items-center`;
const Title = tw.h5`text-2xl font-bold`;
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

 }) => (
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
                                <Input type="text" placeholder="Prénom" value="Maria"/>
                                <Input type="text" placeholder="Nom" value="Joselyne"/>
                                <Input type="text" placeholder="Pseudo" value="Maria02"/>
                                <Input type="email" placeholder="Email" value="MariaJos02@gmail.com"/>
                                <Input type="date" placeholder="Date de naissance" value="2000-11-21"/>
                                <Input type="email" placeholder="Ville" value="Metz"/>
                                <Input type="text" placeholder="Numéro de téléphone" value="0745896341"/>


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

                        <Input type="password" placeholder="Mot de passe" value="Maria0245"/>
                        <Input type="password" placeholder="Confirmer votre mot de passe" value="Maria0245"/>

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
);
