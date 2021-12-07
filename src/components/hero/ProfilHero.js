import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line

import Header, { NavLink, NavLinks, PrimaryLink, LogoLink, NavToggle, DesktopNavLinks } from "../headers/light.js";
import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";

import { ReactComponent as AccueilIcon } from "feather-icons/dist/icons/home.svg";
import { ReactComponent as MonProfilIcon } from "feather-icons/dist/icons/user.svg";
import { ReactComponent as MesFavorisIcon } from "feather-icons/dist/icons/heart.svg";
import {Link} from "react-router-dom";
import { ReactComponent as DeconnexionIcon} from "feather-icons/dist/icons/log-out.svg";

const StyledHeader = styled(Header)`
  ${tw`pt-8 max-w-none`}
  ${DesktopNavLinks} ${NavLink}, ${LogoLink} {
    ${tw`text-black hover:border-orange-400 hover:text-orange-400`}
  }
  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-orange-400`}
  }
`;
const Container = styled.div`
  ${tw`relative -mx-12 -mt-12 bg-center bg-cover`}
`;

const OpacityOverlay = tw.div`z-10 absolute inset-0 bg-orange-400 opacity-25`;

const HeroContainer = tw.div`z-20   relative px-4 sm:px-8 max-w-screen-xl mx-auto`;







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

const IconContainer4 = styled.div`
  ${tw`inline-block rounded-full p-2 bg-orange-400 text-gray-100 hover:bg-green-400`}
  svg {
    ${tw`w-5 h-5`}
  }
`;

const IconContainer5 = styled.div`
  ${tw`inline-block rounded-full p-2 bg-orange-400 text-gray-100 hover:bg-red-800`}
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

        </NavLinks>,
        <NavLinks key={2}>
            <Link to="/monProfil">
                <NavLink href="#">
                    <IconContainer3>
                        <MonProfilIcon/>
                    </IconContainer3>
                </NavLink>
            </Link>
        </NavLinks>,
        <NavLinks key={3}>
            <Link to="/mesFavoris">
                <NavLink href="#">
                    <IconContainer2>
                        <MesFavorisIcon/>
                    </IconContainer2>
                </NavLink>
            </Link>
        </NavLinks>,
        <NavLinks key={4}>
            <Actions>
                <input type="text" placeholder="Saisir une ville" />
                <Link to="/SearchPage">
                    <button>Rechercher</button>
                </Link>

            </Actions>
        </NavLinks>,
        <NavLinks key={5}>
            <NavLink href="/#">
                <IconContainer4>
                    <LocationIcon/>
                </IconContainer4>
            </NavLink>
        </NavLinks>,
        <NavLinks key={6}>
            <NavLink href="/#">
                <IconContainer5>
                    <DeconnexionIcon/>
                </IconContainer5>
            </NavLink>
        </NavLinks>,
    ];

    return (
        <Container>

            <HeroContainer>
                <StyledHeader links={navLinks} />

            </HeroContainer>
        </Container>
    );
};
