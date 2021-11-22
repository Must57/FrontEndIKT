import React from "react";
import tw from "twin.macro"; //eslint-disable-line
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

import Hero from "components/hero/AccueilHero.js";

import Testimonial from "components/testimonials/TwoColumnWithImageAndProfilePictureReview.js";
import ContactUsForm from "components/forms/TwoColContactUsWithIllustration.js";
import Footer from "components/footers/FooterIKT.js";
import HotelTrendSlider from "components/cards/HotelTrendSlider";
import FlightTrendSlider from "components/cards/FlightTrendSlider";
import TrainPromotionSlider from "components/cards/TrainPromotionSlider";
import customerSupportIllustrationSrc from "images/customer-support-illustration.svg";

export default () => (
    <AnimationRevealPage>
        <Hero />

        <HotelTrendSlider />
        <FlightTrendSlider />
        <TrainPromotionSlider />
        <Testimonial
            subheading="C'est le moment de découvrir"
            heading={
                <>
                    Les villes <span tw="text-orange-400">tendances</span>
                </>
            }
            description="Nous avons choisi pour vous ces villes françaises à découvrir en urgence. Des villes en bord de mer aux villes remplies d'histoires. Choisissez la ville de vos futures vacances. Si vous êtes indécis alors vous pouvez en haut nous laissez vous faire découvrir des villes selon vos préférences... Il n'y a plus d'excuses pour voyager."
            testimonials={[
                {
                    imageSrc:
                        "https://images.unsplash.com/photo-1627458205595-9c26ede46aab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                    profileImageSrc:
                        "https://webzine.one/wp-content/uploads/region-paca.png",
                    quote:
                        "Cannes, ville balnéaire de la Côte d'Azur, est célèbre pour son festival international du film. La Croisette, boulevard qui longe la côte, est bordée de plages de sable fin, de boutiques de luxe et de palaces.",
                    customerName: "Cannes, Région PACA",
                    customerTitle: "Ville tendance"
                },
                {
                    imageSrc:
                        "https://images.unsplash.com/photo-1586987177718-54e088c798b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                    profileImageSrc:
                        "https://ecomnews.fr//uploads/illustration/logonavertical-2lignes-coul.jpg",
                    quote:
                        "Bordeaux, au cœur de la région viticole, est une ville portuaire située sur la Garonne, dans le sud-ouest de la France. Elle est réputée pour la cathédrale gothique de Saint-André, ses manoirs construits aux XVIIIe et XIXe siècles, ainsi que ses musées d'art.",
                    customerName: "Bordeaux, Région Aquitaine",
                    customerTitle: "Ville tendance"
                }
            ]}
            textOnLeft={true}
        />


        <ContactUsForm />
        <Footer />
    </AnimationRevealPage>
);
