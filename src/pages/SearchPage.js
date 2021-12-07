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
import SearchHeader from "../components/pageHead/SearchHeader.js";
import {
  loginUser,
  updateInformationUser,
} from "../state/store/userReducer/actions/userAction";
import ProfilHero from "components/hero/ProfilHero.js";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { userSelector } from "state/store/userReducer/selector/userSelector.js";
import axios from "axios";
import { Spin } from "antd";

export default () => {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [cityLocationReceived, setCityLocationReceived] = useState(false);
  const [dataReceived, setDataReceived] = useState(false);
  let city =
    location.pathname.split("/")[2] !== ""
      ? location.pathname.split("/")[2]
      : undefined;
  const [searchData, setSearchData] = useState({
    news: "",
    city: "",
    meteo: "",
    allaboutcity: "",
  });
  const [distanceBetween, setDistanceBetween] = useState("");
  console.log(location);
  const disconnect = (valueMsg) => {
    if (valueMsg.error === "expired") {
      navigate("/connexion");

      toast.warn("Votre authentification a expiré!");
      dispatch(updateInformationUser({ isLogged: false }));
      localStorage.removeItem("user_token");
      localStorage.removeItem("user_info");
    }
  };

  useEffect(async () => {
    if (
      !user.isLogged &&
      (localStorage.getItem("user_token") === null ||
        localStorage.getItem("user_info") === null)
    ) {
      navigate("/connexion");
      toast.warn("Salut, tu devrais te connecter!");
    } else {
      if (!user.isLogged) {
        dispatch(loginUser({ payload: localStorage.getItem("user_token") }));
        dispatch(
          updateInformationUser(JSON.parse(localStorage.getItem("user_info")))
        );
      }
    }

    if (user !== undefined && user.token !== "") {
      // check city
      let isreal;
      if (city !== undefined || city !== "") {
        try {
          isreal = await axios.get(
            "http://localhost:8000/cityinfo-service/isRealCity/" + city,
            { headers: { Authorization: "Bearer " + user.token } }
          );
        } catch (err) {
          console.log(err);
          disconnect(err);
        }
        if (
          isreal !== undefined &&
          isreal.data.exist === false &&
          city !== undefined
        ) {
          toast.warn("Ville inexistant !");
          navigate("/");
        }
      } // check distance ebtween
      let location;
      try {
        location = await axios.get(
          "http://localhost:8000/location-service/location",
          { headers: { Authorization: "Bearer " + user.token } }
        );
        if (city === "" || city === undefined) {
          console.log("hoodoco");
          city = location.data.city;
          setCityLocationReceived(true);
        }
      } catch (err) {
        console.log(err);

        disconnect(err);
      }

      //check jwt expired
      if (user._id !== "" && user.token !== "") {
        try {
          const data = await axios.get(
            "http://localhost:8000/user-service/user/" + user._id,
            { headers: { Authorization: "Bearer " + user.token } }
          );
        } catch (err) {
          console.log(err);

          disconnect(err);
        }
      }
      // search allabout
      console.log(city + "gfgfg");
      if (user.token !== "") {
        const searchRequest =
          city !== undefined
            ? await axios.post(
                "http://localhost:8000/search-allaboutcity-service/search/" +
                  city,
                { userId: user._id },
                { headers: { Authorization: "Bearer " + user.token } }
              )
            : await axios.post(
                "http://localhost:8000/search-allaboutcity-service/search",
                { userId: user._id },
                { headers: { Authorization: "Bearer " + user.token } }
              );
        console.log(searchRequest.data);
        setSearchData(searchRequest.data);
        setDataReceived(true);
      }
    }
  }, [user]);

  return (
    <AnimationRevealPage>
      <SearchHero />
      {city !== undefined && (
        <SearchHeader
          city={city}
          heading={city}
          description={distanceBetween}
        />
      )}
      {!cityLocationReceived && city === undefined && (
        <center>Veuillez patienter, nous essayons de vous localiser!</center>
      )}
      {cityLocationReceived && dataReceived && (
        <>
          <SearchHeader
            city={searchData.city}
            heading={searchData.city}
            description={distanceBetween}
          />
          <br />

          <br />
          <br />
        </>
      )}
      {!dataReceived && (
        <center>
          <Spin size="large" />
        </center>
      )}
      {dataReceived && (
        <>
          <SearchNewsResult news={searchData.news} />

          <SearchWeatherResult meteo={searchData.meteo} city={city} />
          <SearchAllAboutCityResult data={searchData.allaboutcity} />
          <SearchHotelResult />
          <SearchFlightResult />
          <SearchTrainResult />
          <SearchBusResult />
        </>
      )}

      <Footer />
    </AnimationRevealPage>
  );
};
