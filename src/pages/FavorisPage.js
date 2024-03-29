import React, { useEffect, useState } from "react";
import tw from "twin.macro"; //eslint-disable-line
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

import MainHero from "components/hero/MainHero.js";


import Footer from "components/footers/FooterIKT.js";

import FavorisHeader from "../components/pageHead/FavorisHeader.js";
import FavorisListe from "../components/cards/CityFav";


import styled from "styled-components";
import { ReactComponent as ProfilIcon } from "feather-icons/dist/icons/user.svg";
import logo from "../images/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "state/store/userReducer/selector/userSelector.js";
import { Spin } from "antd";
import { useNavigate } from "react-router";
import { loginUser, updateInformationUser } from "state/store/userReducer/actions/userAction.js";
import { toast } from "react-toastify";




const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900  sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const MainContent = tw.div`mt-0 flex flex-col items-center`;

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
                  const navigate = useNavigate()
                  const user = useSelector(userSelector)
                  const [listFav, setListFav] = useState(undefined)
                  const [loadData, setLoadData] = useState(true)
                  const dispatch = useDispatch()
               
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

                    if (user.token !== undefined && user.favouritesCity.length > 0) {
                      setListFav(user.favouritesCity)
                      setLoadData(false)
                    }
                    else{
                      if (user.favouritesCity.length === 0){
                        setListFav([])
                        
                      }
                    }
                },[user])
                  return (

    <AnimationRevealPage>

        <MainHero />
        <FavorisHeader />
        {!loadData && (<FavorisListe favs={listFav} />)}
        {loadData && listFav === undefined && (<center><Spin /></center>)}
        {loadData && listFav !== undefined && listFav.length === 0 && (<><center>Aucune ville en favoris disponible.</center><br /></>)}

        <Footer />
    </AnimationRevealPage>

);}