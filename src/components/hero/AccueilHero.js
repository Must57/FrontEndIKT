import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import {Link} from 'react-router-dom'
import Header, { NavLink, NavLinks, PrimaryLink, LogoLink, NavToggle, DesktopNavLinks } from "../headers/light.js";
import ResponsiveVideoEmbed from "../../helpers/ResponsiveVideoEmbed.js";
import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";

import { ReactComponent as AccueilIcon } from "feather-icons/dist/icons/home.svg";
import { ReactComponent as MonProfilIcon } from "feather-icons/dist/icons/user.svg";
import { ReactComponent as MesFavorisIcon } from "feather-icons/dist/icons/heart.svg";


const StyledHeader = styled(Header)`
  ${tw`pt-8 max-w-none`}
  ${DesktopNavLinks} ${NavLink}, ${LogoLink} {
    ${tw`text-gray-100  hover:border-gray-300 hover:text-black`}
  }
  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-orange-400`}
  }
`;
const Container = styled.div`
  ${tw`relative -mx-12 -mt-12 bg-center bg-cover`}
  background-image: url("https://images.unsplash.com/photo-1516659336300-f95a2a0c5d74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80");
`;

const OpacityOverlay = tw.div`z-10 absolute inset-0 bg-orange-400 opacity-25`;

const HeroContainer = tw.div`z-20 relative px-4 sm:px-8 max-w-screen-xl mx-auto`;
const TwoColumn = tw.div`pt-24 pb-32 px-4 flex justify-between items-center flex-col lg:flex-row`;
const LeftColumn = tw.div`flex flex-col items-center lg:block`;
const RightColumn = tw.div`w-full sm:w-5/6 lg:w-1/2 mt-16 lg:mt-0 lg:pl-8`;

const Heading = styled.h1`
  ${tw`text-3xl text-center lg:text-left sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-100 leading-none`}
  span {
    ${tw`inline-block mt-2`}
  }
`;

const SlantedBackground = styled.span`
  ${tw`relative text-orange-400 px-4 -mx-4 py-2`}
  &::before {
    content: "";
    ${tw`absolute inset-0 bg-gray-100 transform -skew-x-12 -z-10`}
  }
`;

const Notification = tw.span`inline-block my-4 pl-3 py-1 text-gray-100 border-l-4 border-orange-400 font-medium text-sm`;

const PrimaryAction = tw.button`px-8 py-3 mt-10 text-sm sm:text-base sm:mt-16 sm:px-8 sm:py-4 bg-gray-100 text-orange-400 font-bold rounded shadow transition duration-300 hocus:bg-orange-400 hocus:text-gray-100 focus:shadow-outline`;

const StyledResponsiveVideoEmbed = styled(ResponsiveVideoEmbed)`
  padding-bottom: 56.25% !important;
  padding-top: 0px !important;
  ${tw`rounded`}
  iframe {
    ${tw`rounded bg-black shadow-xl`}
  }
`;
const Actions = styled.div`
  ${tw`relative max-w-md text-black text-center mx-auto lg:mx-0`}
  input {
    ${tw`sm:pr-48 pl-8 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-gray-100 hover:border-orange-400`}
  }
  button {
    ${tw`w-full sm:absolute right-0 top-0 bottom-0 bg-orange-400 text-gray-100 font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center sm:w-40 sm:leading-none focus:outline-none hover:bg-orange-600 transition duration-300`}
  }
`;
const IconContainer = styled.div`
  ${tw`inline-block rounded-full p-2 bg-orange-400 text-gray-100`}
  svg {
    ${tw`w-5 h-5`}
  }
`;
const IconContainer2 = styled.div`
  ${tw`inline-block rounded-full p-2 bg-black text-gray-100 hover:bg-red-600`}
  svg {
    ${tw`w-5 h-5`}
  }
`;
const IconContainer3 = styled.div`
  ${tw`inline-block rounded-full p-2 bg-black text-gray-100 hover:bg-orange-400`}
  svg {
    ${tw`w-5 h-5`}
  }
`;

export default () => {
    const navLinks = [
        <NavLinks key={1}>
            <Link to="/">
                <NavLink href="#">
                    <IconContainer3>
                        <AccueilIcon/>
                    </IconContainer3>
                </NavLink>
            </Link>
            <Link to="/monProfil">
                <NavLink href="#">
                    <IconContainer3>
                        <MonProfilIcon/>
                    </IconContainer3>
                </NavLink>
            </Link>
            <Link to="/mesFavoris">
                <NavLink href="#">
                    <IconContainer2>
                        <MesFavorisIcon/>
                    </IconContainer2>
                </NavLink>
            </Link>
        </NavLinks>,
        <NavLinks key={2}>
            <Actions>
                <input type="text" placeholder="Saisir une ville" />
                <Link to="/SearchPage">
                    <button>Rechercher</button>
                </Link>

            </Actions>
        </NavLinks>,
        <NavLinks key={3}>
            <NavLink href="/#">
                <IconContainer>
                    <LocationIcon/>
                </IconContainer>
            </NavLink>
        </NavLinks>
    ];

    return (
        <Container>
            <OpacityOverlay />
            <HeroContainer>
                <StyledHeader links={navLinks} />
                <TwoColumn>
                    <LeftColumn>
                        <Notification>Avec I Know Travel :</Notification>
                        <Heading>
                            <span>Rendez-vous à</span>
                            <br />
                            <SlantedBackground>la montagne</SlantedBackground>
                        </Heading>
                        <PrimaryAction>Découvrez votre destination</PrimaryAction>
                    </LeftColumn>
                    <RightColumn>
                        <StyledResponsiveVideoEmbed
                            url="//player.vimeo.com/video/389315420?h=92f86a669b&autoplay=1&loop=1&title=0&byline=0&portrait=0"
                            background="transparent"
                        />
                    </RightColumn>
                </TwoColumn>
            </HeroContainer>
        </Container>
    );
};
