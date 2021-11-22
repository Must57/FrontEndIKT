import React, { Component } from "react";
import tw from "twin.macro"; //eslint-disable-line
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

import SearchHero from "components/hero/SearchHero.js";


import Footer from "components/footers/FooterIKT.js";
import SearchHotelResult from "components/cards/SearchHotelResult.js";
import SearchFlightResult from "components/cards/SearchFlightResult.js";
import SearchTrainResult from "../components/cards/SearchTrainResult.js";
import SearchBusResult from "../components/cards/SearchBusResult.js";
import SearchNewsResult from "../components/cards/SearchNewsResult.js";
import SearchWeatherResult from "../components/cards/SearchWeatherResult.js";
import SearchAllAboutCityResult from "../components/cards/SearchAllAboutCityResult.js";
import SearchHeader from "../components/pageHead/SearchHeader.js"



export default () => (
    <AnimationRevealPage>

        <SearchHero />
            <SearchHeader />
            <SearchNewsResult />

        <SearchWeatherResult />
        <SearchAllAboutCityResult />
        <SearchHotelResult />
        <SearchFlightResult />
        <SearchTrainResult />
        <SearchBusResult />


        <Footer />
    </AnimationRevealPage>
);