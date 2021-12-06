import React, { Component, useEffect, useState } from "react";
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
import { useLocation, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { userSelector } from "state/store/userReducer/selector/userSelector.js";
import axios from "axios";
import { Spin } from "antd";



export default () => {
    const user = useSelector(userSelector) 
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [dataReceived, setDataReceived] = useState(false)
    const [searchData, setSearchData] = useState({news:'', city:'',meteo:'', allaboutcity:''})
    const [distanceBetween, setDistanceBetween] = useState('🏠 ➞ Loading..')
    console.log(location)
    const disconnect = (valueMsg) => {
        if (valueMsg.error === 'expired') {
        navigate('/connexion')
    
        toast.warn('Votre authentification a expiré!')
        dispatch(updateInformationUser({isLogged:false}))
        }
    }
    const city = location.pathname.split('/')[2]
    console.log(city)

    useEffect(async () => {
    if (!user.isLogged && (localStorage.getItem('user_token') === null || localStorage.getItem('user_info') === null)) {
        navigate('/connexion')
        toast.warn('Salut, tu devrais te connecter!')
    } else {
        if (!user.isLogged) {
        dispatch(loginUser({payload: localStorage.getItem('user_token')}))
        dispatch(updateInformationUser(JSON.parse(localStorage.getItem('user_info'))))
        }
    }
    console.log(user.token)
    if (user !== undefined && user.token !== undefined) {
    // check city
    let isreal
    if (city !== undefined){
        try {
         isreal = await axios.get('http://localhost:8000/cityinfo-service/isRealCity/'+ city, {headers:{'Authorization':'Bearer '+user.token}})
        }catch(err){
            console.log(err)
            disconnect(err)
        }
    if (isreal !== undefined && isreal.data.exist === false){
        toast.warn('City not found..');
        navigate('/')
    }
    }// check distance ebtween
    let location
try{
     location = await axios.get('http://localhost:8000/location-service/location',  {headers:{'Authorization':'Bearer '+user.token}})
    
}catch(err){
    console.log(err)

disconnect(err)
}
if (location !== undefined) {
    const myCity = location.data.city;

    if (myCity !== undefined) {
        const dist = await axios.get('http://localhost:8000/cityinfo-service/distance/'+myCity+'/'+ city,  {headers:{'Authorization':'Bearer '+user.token}})
        console.log(dist)
    }
}
    //check jwt expired
    if (user !== undefined && user._id !== undefined && user.token !== undefined) {
  try { 
      const data =  await axios.get('http://localhost:8000/user-service/user/'+ user._id,{headers:{'Authorization':'Bearer '+user.token}})
}catch(err) { 
console.log(err)

  disconnect(err)

}
    }
    // search allabout
console.log(user._id)
    const searchRequest = await axios.post('http://localhost:8000/search-allaboutcity-service/search/'+ city,{userId:user._id},  {headers:{'Authorization':'Bearer '+user.token}})
    console.log(searchRequest.data)
    setSearchData(searchRequest.data)
    setDataReceived(true)
}
},[user]);


//fait console.log() pour voir ce qu'il a
    
    return (
    <AnimationRevealPage>

        <SearchHero />
            <SearchHeader heading={city} description={distanceBetween} />
           {!dataReceived && (<center><Spin size="large"/></center>)}
         {dataReceived && (<><SearchNewsResult news={searchData.news} />

<SearchWeatherResult meteo={searchData.meteo} city={city}/>
<SearchAllAboutCityResult data={searchData.allaboutcity}/>
<SearchHotelResult />
<SearchFlightResult />
<SearchTrainResult />
<SearchBusResult /></>)}   


        <Footer />
    </AnimationRevealPage>
);}