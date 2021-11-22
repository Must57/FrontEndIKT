import React from 'react';
import { useParams } from 'react-router-dom';
import AnimationRevealPage from "helpers/AnimationRevealPage.js"


import SearchPage from "pages/SearchPage.js";
import ProfilPage from "pages/ProfilPage.js";
import Inscription from "pages/Inscription.js";
import Connexion from "pages/Connexion.js";
import PreferencesInscription from "pages/PreferencesInscription.js";
import Accueil from "pages/Accueil.js";

import HotelTrendCard from "components/cards/HotelTrendSlider.js";



export const components = {
  Pages: {
    Accueil: {
      component: Accueil,
      url: "/components/Pages/Accueil",
    },
    SearchPage: {
      component: SearchPage,
      url: "/components/Pages/SearchPage",
    },
    MonProfil: {
      component: ProfilPage,
      url: "/components/Pages/ProfilPage",
    },
    Inscription: {
      component: Inscription,
      url: "/components/Pages/Inscription",
    },
    Connexion: {
      component: Connexion,
      url: "/components/Pages/Connexion",
    },
    PreferencesInscription: {
      component: PreferencesInscription,
      url: "/components/Pages/PreferencesInscription",
    }
  }
}

export default () => {
  const { type, subtype, name } = useParams()

  try {
    let Component = null;
    if(type === "blocks" && subtype) {
      Component= components[type][subtype]["elements"][name].component
      return <AnimationRevealPage disabled>
          <Component/>
        </AnimationRevealPage>
    }
    else
      Component= components[type][name].component

    if(Component)
      return <Component/>

    throw new Error("Component Not Found")
  }
  catch (e) {
    console.log(e)
    return <div>Error: Component Not Found</div>
  }
}
