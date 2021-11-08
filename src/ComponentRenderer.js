import React from 'react';
import { useParams } from 'react-router-dom';
import AnimationRevealPage from "helpers/AnimationRevealPage.js"


import SearchPage from "demos/SearchPage.js";
import ProfilPage from "demos/ProfilPage.js";
import Inscription from "demos/Inscription.js";
import Connexion from "demos/Connexion.js";
import PreferencesInscription from "demos/PreferencesInscription.js";
import Accueil from "demos/Accueil.js";

import SliderCards from "components/cards/ThreeColSlider.js";

import TwoColContactUsForm from "components/forms/TwoColContactUsWithIllustration.js";


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
