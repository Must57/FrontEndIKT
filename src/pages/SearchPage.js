import React, { Component, useEffect } from "react";
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
import {loginUser, updateInformationUser} from '../state/store/userReducer/actions/userAction'
import ProfilHero from "components/hero/ProfilHero.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { userSelector } from "state/store/userReducer/selector/userSelector.js";



export default () => {
    const user = useSelector(userSelector) 
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
    if (!user.isLogged && (localStorage.getItem('user_token') === null || localStorage.getItem('user_info') === null)) {
        navigate('/connexion')
        toast.warn('Salut, tu devrais te connecter!')
    } else {
        if (!user.isLogged) {
        dispatch(loginUser({payload: localStorage.getItem('user_token')}))
        dispatch(updateInformationUser(JSON.parse(localStorage.getItem('user_info'))))
        }
    }
});
    
    return (
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
);}