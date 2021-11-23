import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";
import React from "react";
import { css } from "styled-components/macro"; //eslint-disable-line


import ComponentRenderer from "ComponentRenderer.js";
import Accueil from "./pages/Accueil";
import Connexion from "./pages/Connexion";
import FavorisPage from "./pages/FavorisPage";


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inscription from "pages/Inscription";
import SearchPage from "./pages/SearchPage";
import ProfilPage from "./pages/ProfilPage";
import PreferencesInscription from "./pages/PreferencesInscription";




export default function App() {
  // If you want to disable the animation just use the disabled `prop` like below on your page's component
  // return <AnimationRevealPage disabled>xxxxxxxxxx</AnimationRevealPage>;


  return (
    <BrowserRouter>
 
    <Routes>
        <Route path="connexion" element={<Connexion />} />
        <Route path="inscription" element={<Inscription />} />
        <Route path="searchPage" element={<SearchPage/>}/>
        <Route path="monProfil" element={<ProfilPage/>}/>
        <Route path="mesFavoris" element={<FavorisPage/>}/>
        <Route path="preferences" element={<PreferencesInscription/>}/>
        <Route path="/" element={<Accueil />} />
     
    </Routes>
  </BrowserRouter>
  );
}


