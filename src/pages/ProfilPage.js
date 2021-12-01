import React, {useState, useEffect} from "react";
import tw from "twin.macro"; //eslint-disable-line
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

import ProfilHero from "components/hero/ProfilHero.js";


import Footer from "components/footers/FooterIKT.js";

import ProfilHeader from "../components/pageHead/ProfilHeader.js";
import PreferencesHeader from "../components/pageHead/PreferencesHeader.js";
import { ClipLoader } from "react-spinners";
import { Container as ContainerBase } from "components/misc/Layouts";
import axios from "axios";

import styled from "styled-components";
import { ReactComponent as ProfilIcon } from "feather-icons/dist/icons/user.svg";
import logo from "../images/logo.svg";
import DistanceSlider from "../components/sliders/DistanceSlider";
import MeteoSlider from "../components/sliders/MeteoSlider";
import { userSelector } from "state/store/userReducer/selector/userSelector.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {updateInformationUser} from '../state/store/userReducer/actions/userAction'

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
    const [loading, setLoading] = useState(false)
    const [loadingPass, setLoadingPass] = useState(false)
    const [currentPassword,setCurrentPassword] = useState('')
    const [newPass,setNewPass] = useState('')
    const [newPass2,setNewPass2] = useState('')
    const dispatch = useDispatch()
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

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
        const dataHttp = await axios.post('http://localhost:8000/user-service/updateSettings/'+user._id,userInfo,{headers:{"Authorization": "Bearer "+ user.token}})
        console.log(dataHttp)
      if(dataHttp.data.message === "ok") {
          toast.success('Profil mis à jour avec succès !')
          dispatch(updateInformationUser(userInfo))
      }

        setLoading(false)
    }catch(err){
        toast.error('Une erreur a été survenue lors de la mise à jour de votre profil.')
        setLoading(false)
    }}
    const onSubmitPass =async (e) => {
        e.preventDefault()
        setLoadingPass(true)
        try {
            if(newPass !== newPass2 ) {
                toast.error('Le nouveau mot de passe et la confirmation doit être identique.')
            }else {
            const dataHttp = await axios.post('http://localhost:8000/user-service/updatePassword/'+user._id,{password:currentPassword,newPass,newPass2},{headers:{"Authorization": "Bearer "+ user.token}})
            console.log(dataHttp)
          if(dataHttp.data.message === "ok") {
              toast.success('Mot de passe mise à jour avec succès !')
              // reset input
              setNewPass("")
              setCurrentPassword("")
              setNewPass2("")
             
          }
        }
          setLoadingPass(false)
        }catch(err) {
            setLoadingPass(false)
            console.log(err)
            toast.error(err)
        }

        setLoading(false)
    }
    return (
    <AnimationRevealPage>

        <ProfilHero />
        <ProfilHeader />
            <Content>


                        <MainContainer>
                        <MainContent>
                            <Form onSubmit={onSubmit}>
                                <Title>Modification de vos informations personnelles</Title>
                                <p tw="mt-6 text-xs text-gray-600 text-center">
                                    N'oubliez pas d'enregistrer les modifications de vos informations
                                </p>
                                Prénom
                                <Input type="text" placeholder="Prénom" value={userInfo.firstname} onChange={e => onChanged(e,"firstname")} />
                              Nom
                                <Input type="text" placeholder="Nom" value={userInfo.lastname} onChange={e => onChanged(e,"lastname")} />
                              Pseudo
                                <Input type="text" placeholder="Pseudo" value={userInfo.username} onChange={e => onChanged(e,"username")} />
                               Email
                                <Input type="email" placeholder="Email" value={userInfo.email} onChange={e => onChanged(e,"email")} />
                              Date de naissance
                                <Input type="date" placeholder="Date de naissance" value={userInfo.birthday} onChange={e => onChanged(e,"birthday")} />
                               Ville
                               <Input type="text" placeholder="Ville" value={userInfo.city}  onChange={e => onChanged(e,"city")} />
                               Numéro de téléphone
                                <Input type="text" placeholder="Numéro de téléphone" value={userInfo.numberPhone} onChange={e => onChanged(e,"numberPhone")} />


                               {!loading && ( <SubmitButton type="submit" onSubmit={onSubmit}>
                                    <SubmitButtonIcon className="icon" />
                                    <span className="text">{submitButtonText}</span>
                                </SubmitButton>)}
                                {loading && (<center><br /><ClipLoader color="#f6ad55" /></center>)}


                            </Form>
                        </MainContent>
            </MainContainer>
            </Content>
        <Content>


            <MainContainer>
                <MainContent>
                    <Form onSubmit={onSubmitPass}>
                        <Title>Modification mot de passe</Title>
                        <p tw="mt-6 text-xs text-gray-600 text-center">
                            N'oubliez pas d'enregistrer votre nouveau mot de passe
                        </p>
                        <Input type="password" placeholder="Mot de passe actuel" value={currentPassword} onChange={(e) => {
                            setCurrentPassword(e.target.value)
                        }}/>
                        <Input type="password" placeholder="Nouveau Mot de passe" value={newPass} onChange={(e) => {
                            setNewPass(e.target.value)
                        }} />
                        <Input type="password" placeholder="Confirmer votre mot de passe" value={newPass2} onChange={(e) => {
                            setNewPass2(e.target.value)
                        }}/>

                        {!loadingPass && (<SubmitButton type="submit">
                            <SubmitButtonIcon className="icon" />
                            <span className="text">{submitButtonText}</span>
                        </SubmitButton>)}
                        {loadingPass && (<center><br /><ClipLoader color="#f6ad55" /></center>)}


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
