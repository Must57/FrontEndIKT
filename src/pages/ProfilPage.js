import React, {useState, useEffect} from "react";
import tw from "twin.macro"; //eslint-disable-line
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

import ProfilHero from "components/hero/ProfilHero.js";


import Footer from "components/footers/FooterIKT.js";
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import ProfilHeader from "../components/pageHead/ProfilHeader.js";
import PreferencesHeader from "../components/pageHead/PreferencesHeader.js";
import { ClipLoader } from "react-spinners";
import { Container as ContainerBase } from "components/misc/Layouts";
import axios from "axios";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import styled from "styled-components";
import { ReactComponent as ProfilIcon } from "feather-icons/dist/icons/user.svg";
import logo from "../images/logo.svg";
import DistanceSlider from "../components/sliders/DistanceSlider";
import MeteoSlider from "../components/sliders/MeteoSlider";
import { userSelector } from "state/store/userReducer/selector/userSelector.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {loginUser, updateInformationUser} from '../state/store/userReducer/actions/userAction'

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



function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
    const [fetching, setFetching] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const fetchRef = React.useRef(0);
    const debounceFetcher = React.useMemo(() => {
      const loadOptions = (value) => {
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        setOptions([]);
        setFetching(true);
        fetchOptions(value).then((newOptions) => {
          if (fetchId !== fetchRef.current) {
            // for fetch callback order
            return;
          }
  
          setOptions(newOptions);
          setFetching(false);
        });
      };
  
      return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);
    return (
      <Select
        labelInValue
        filterOption={false}
        onSearch={debounceFetcher}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        {...props}
        options={options}
      />
    );
  } // Usage of DebounceSelect
  async function fetchCity(city, token) {

    if (city === undefined) {
    return fetch('http://localhost:8000/cityinfo-service/listCity', {headers:{'authorization':'Bearer ' +token}})
      .then((response) => response.json())
      .then((body) =>
        body.cities.map((reg) => ({
          label: `${reg}`,
          value: reg,
        })),
      );
    } else{
      return fetch('http://localhost:8000/cityinfo-service/listCity/'+city, {headers:{'authorization':'Bearer ' +token}})
      .then((response) => response.json())
      .then((body) =>
        body.cities.map((reg) => ({
          label: `${reg}`,
          value: reg,
        })),
      );
    }
  }
  async function fetchRegions(regi, token) {

    if (regi === undefined) {
    return fetch('http://localhost:8000/cityinfo-service/listRegions', {headers:{'authorization':'Bearer ' +token}})
      .then((response) => response.json())
      .then((body) =>
        body.regions.map((reg) => ({
          label: `${reg}`,
          value: reg,
        })),
      );
    }else{
      return fetch('http://localhost:8000/cityinfo-service/listRegions/'+regi, {headers:{'authorization':'Bearer ' +token}})
      .then((response) => response.json())
      .then((body) =>
        body.regions.map((reg) => ({
          label: `${reg}`,
          value: reg,
        })),
      );
    }
  }
export default ({
    submitButtonText = "Enregistrer",
    SubmitButtonIcon = ProfilIcon,
    tosUrl = "#",
    privacyPolicyUrl = "#",
    signInUrl = "#"

 }) => {


    const [loading, setLoading] = useState(false)
    const user = useSelector(userSelector) 
        console.log('state ', user)
    const [dataLoad, setDataLoad] = useState(false)
    const [loadingPass, setLoadingPass] = useState(false)
    const [loadingPref, setLoadingPref] = useState(false)
    const [currentPassword,setCurrentPassword] = useState('')
    const [newPass,setNewPass] = useState('')
    const [newPass2,setNewPass2] = useState('')
    const dispatch = useDispatch()
    let [userInfo,setUserInfo] = useState({...user})
    const navigate = useNavigate()
    console.log(user)
    const [listRegionsFav, setListRegionsFav] = React.useState(user.preferences.allow_regions_only);
    const [listExcludeCity,setListExcludeCity] = React.useState(user.preferences.exclude_city)
    console.log(listRegionsFav)
    useEffect(() => {
      if (!user.isLogged && (localStorage.getItem('user_token') === null || localStorage.getItem('user_info') === null)) {
        navigate('/connexion')
        toast.warn('Salut, tu devrais te connecter!')
    } else {
        if (!user.isLogged) {
        dispatch(loginUser({payload: localStorage.getItem('user_token')}))
        dispatch(updateInformationUser(JSON.parse(localStorage.getItem('user_info'))))
        setListRegionsFav(user.preferences.allow_regions_only)
        setListExcludeCity(user.preferences.exclude_city)
        }
    }

      let listReg = []
      if (listRegionsFav !== undefined && listRegionsFav.length > 0) {
      for(let e of  listRegionsFav) {
        if (e.value === undefined || e.value  === null) {
        listReg.push({key: e, value:e, label:e})
        }else{
          listReg.push(e)
        }
      }
    }
    
      setListRegionsFav(listReg)
      let listCity = []
      if (listExcludeCity !== undefined && listExcludeCity.length > 0) {
      for(let e of  listExcludeCity) {
        if (e.value === undefined || e.value  === null) {
          listCity.push({key: e, value:e, label:e})
        }else{
          listCity.push(e)
        }
      }
      setListExcludeCity(listCity)
    }
    if (user !== undefined) {
setDataLoad(true)
console.log('donne recu')    
}else{
      console.log('donnee pas recu')
    }
    },[user])
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
          localStorage.setItem('user_info',JSON.stringify(user))
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
    const onSubmitPref =async (e) => {
        e.preventDefault()
        setLoadingPref(true)
        try {
          
            const dataHttp = await axios.post('http://localhost:8000/user-service/updatePreferences/'+user._id,{allow_regions_only: listRegionsFav, exclude_city: listExcludeCity},{headers:{"Authorization": "Bearer "+ user.token}})
            console.log(dataHttp)
          if(dataHttp.data.message === "ok") {
              toast.success('Preferences mise à jour avec succès !')
              // reset input
              dispatch(updateInformationUser({preferences: {allow_regions_only: listRegionsFav, exclude_city:listExcludeCity}}))
             localStorage.setItem('user_info',JSON.stringify(user))
          
        }
        setLoadingPref(false)
        }catch(err) {
            toast.error('Une erreur est survenue!')
            setLoadingPref(false)
            console.log(err)
            
        }

        setLoading(false)
    }
    return (
    <AnimationRevealPage>

        <ProfilHero />
        <ProfilHeader />
        {dataLoad &&(  <Content>


                        <MainContainer>
                        <MainContent>
                            <Form onSubmit={onSubmit}>
                                <Title>Modification de vos informations personnelles</Title>
                                <p tw="mt-8 text-xs text-black text-gray-600">
                                    N'oubliez pas d'enregistrer les modifications de vos informations
                                </p>

                                <p tw="mt-8 -mb-3 text-xs text-black">Prénom</p>
                                <Input type="text" placeholder="Prénom" value={userInfo.firstname} onChange={e => onChanged(e,"firstname")} />

                                <p tw="mt-6 -mb-3 text-xs text-black">Nom</p>
                                <Input type="text" placeholder="Nom" value={userInfo.lastname} onChange={e => onChanged(e,"lastname")} />

                                <p tw="mt-6 -mb-3 text-xs text-black">Pseudo</p>
                                <Input type="text" placeholder="Pseudo" value={userInfo.username} onChange={e => onChanged(e,"username")} />

                                <p tw="mt-6 -mb-3 text-xs text-black">Email</p>
                                <Input type="email" placeholder="Email" value={userInfo.email} onChange={e => onChanged(e,"email")} />

                                <p tw="mt-6 -mb-3 text-xs text-black">Date de naissance</p>
                                <Input type="date" placeholder="Date de naissance" value={userInfo.birthday} onChange={e => onChanged(e,"birthday")} />

                                <p tw="mt-6 -mb-3 text-xs text-black">Ville</p>
                                <Input type="text" placeholder="Ville" value={userInfo.city}  onChange={e => onChanged(e,"city")} />

                                <p tw="mt-6 -mb-3 text-xs text-black">Numéro de téléphone</p>
                                <Input type="text" placeholder="Numéro de téléphone" value={userInfo.numberPhone} onChange={e => onChanged(e,"numberPhone")} />


                               {!loading && ( <SubmitButton type="submit" onSubmit={onSubmit}>
                                    <SubmitButtonIcon className="icon" />
                                    <span className="text">{submitButtonText}</span>
                                </SubmitButton>)}
                                {loading && (<center><br /><ClipLoader color="#f6ad55" /></center>)}


                            </Form>
                        </MainContent>
            </MainContainer>
            </Content>)}
            {!dataLoad && (<Spin />)}
        <Content>


            <MainContainer>
                <MainContent>
                    <Form onSubmit={onSubmitPass}>
                        <Title>Modification mot de passe</Title>
                        <p tw="mt-6 text-xs text-gray-600 text-center">
                            N'oubliez pas d'enregistrer votre nouveau mot de passe
                        </p>

                        <p tw="mt-8 -mb-3 text-xs text-black">Mot de passe actuel</p>
                        <Input type="password" placeholder="Mot de passe actuel" value={currentPassword} onChange={(e) => {
                            setCurrentPassword(e.target.value)
                        }}/>

                        <p tw="mt-6 -mb-3 text-xs text-black">Nouveau mot de passe</p>
                        <Input type="password" placeholder="Nouveau Mot de passe" value={newPass} onChange={(e) => {
                            setNewPass(e.target.value)
                        }} />

                        <p tw="mt-6 -mb-3 text-xs text-black">Confirmation du mot de passe</p>
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


                        <Form onSubmit={onSubmitPref}>

                            <p tw="mt-2 mb-2 text-xs text-black text-left">Listez les regions que vous favorisez (vide si ce n'est pas important pour vous)</p>
                            <DebounceSelect
      mode="multiple"
      value={listRegionsFav}
      placeholder="Listez les regions"
      fetchOptions={(v) => fetchRegions(v,user.token)}
      onChange={(newValue) => {
        setListRegionsFav(newValue);
      }}
      style={{
          color:'orange',
          borderColor:'orange',
        width: '100%',
      }}
    />
                            <p tw="mt-6 mb-2 text-xs text-black text-left">Exclure des villes?</p>
                            <DebounceSelect
      mode="multiple"
      value={listExcludeCity}
      placeholder="Exclure des villes"
      fetchOptions={(v) => fetchCity(v,user.token)}
      onChange={(newValue) => {
        setListExcludeCity(newValue);
      }}
      style={{
          color:'orange',
          borderColor:'orange',
        width: '100%',
      }}
    />
                            {!loadingPref && (<SubmitButton type="submit">
                            <SubmitButtonIcon className="icon" />
                            <span className="text">{submitButtonText}</span>
                        </SubmitButton>)}
                        {loadingPref && (<center><br /><ClipLoader color="#f6ad55" /></center>)}
                        </Form>

                </MainContent>
            </MainContainer>

        </Content>
        <Footer />
    </AnimationRevealPage>
)}
