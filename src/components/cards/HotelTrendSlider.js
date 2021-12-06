import React, { useState } from "react";
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";

import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";
import { ReactComponent as StarIcon } from "feather-icons/dist/icons/star.svg";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";
import { ReactComponent as TimeIcon } from "feather-icons/dist/icons/clock.svg";
import { ReactComponent as PriceIcon } from "images/euro.svg";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20`;

const HeadingWithControl = tw.div`flex flex-col items-center sm:items-stretch sm:flex-row justify-between`;
const Heading = tw(SectionHeading)``;
const Controls = tw.div`flex items-center`;
const ControlButton = styled(PrimaryButtonBase)`
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2`}
  svg {
    ${tw`w-6 h-6`}
  }
`;
const PrevButton = tw(ControlButton)``;
const NextButton = tw(ControlButton)``;

const CardSlider = styled(Slider)`
  ${tw`mt-16`}
  .slick-track { 
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`h-auto flex justify-center mb-1`}
  }
`;
const Card = tw.div`h-full flex! flex-col sm:border max-w-sm sm:rounded-tl-4xl sm:rounded-br-5xl relative focus:outline-none`;
const CardImage = styled.div(props => [
    `background-image: url("${props.imageSrc}");`,
    tw`w-full h-56 sm:h-64 bg-cover bg-center rounded sm:rounded-none sm:rounded-tl-4xl`
]);

const TextInfo = tw.div`py-6 sm:px-10 sm:py-6`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
const Title = tw.h5`text-2xl font-bold`;

const RatingsInfo = styled.div`
  ${tw`flex items-center sm:ml-4 mt-2 sm:mt-0`}
  svg {
    ${tw`w-6 h-6 text-yellow-500 fill-current`}
  }
`;
const Rating = tw.span`ml-2 font-bold`;

const Description = tw.p`text-sm leading-loose mt-2 sm:mt-4`;

const SecondaryInfoContainer = tw.div`flex flex-col sm:flex-row mt-2 sm:mt-4`;
const IconWithText = tw.div`flex items-center mr-6 my-2 sm:my-0`;
const IconContainer = styled.div`
  ${tw`inline-block rounded-full p-2 bg-gray-700 text-gray-100`}
  svg {
    ${tw`w-3 h-3`}
  }
`;
const Text = tw.div`ml-2 text-sm font-semibold text-gray-800`;
const UrlText = tw.div`sm:text-lg text-white font-bold font-semibold`;
const PrimaryButton = tw(PrimaryButtonBase)`mt-auto text-white sm:text-lg rounded-none w-full rounded sm:rounded-none sm:rounded-br-4xl py-3 sm:py-6`;
export default () => {
    // useState is used instead of useRef below because we want to re-render when sliderRef becomes available (not null)
    const [sliderRef, setSliderRef] = useState(null);
    const sliderSettings = {
        arrows: false,
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 2,
                }
            },

            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    };

    /* Change this according to your needs */
    const cards = [
        {
            imageSrc: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/137512047.jpg?k=5346ed0b764af55bde1c12a44473a383195070a75862ca4acc412c50260d6df9&o=&hp=1",
            title: "Arome Hotel",
            description: "Situé dans le centre de Nice, l’Arome Hotel propose des chambres climatisées avec une connexion Wi-Fi gratuite. Vous séjournerez à 1 km de la gare de Nice-Ville.\n" +
                "\n" +
                "Le petit-déjeuner gratuit se compose d'un croissant et d'une boisson chaude.",
            locationText: "Nice, France",
            pricingText: "87/Nuit",
            rating: "9.6",
            url: "http://www.booking.com/Share-P6HnVz",
        },
        {
            imageSrc: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/155893839.jpg?k=e1e6852f32152cb331c8d62621db5a292eb42b4aab23fdc992df166e65a77ade&o=&hp=1",
            title: "Port Royal Hotel",
            description: "Bénéficiant d’un emplacement idéal dans le 5ème arrondissement de Paris, le Port Royal Hotel est situé à 1,6 km du jardin du Luxembourg, à 2,5 km de la Sainte-Chapelle et à 2,6 km de la cathédrale Notre-Dame. Un petit-déjeuner continental est servi tous les matins sur place.",
            locationText: "Paris, France",
            pricingText: "98/Nuit",
            rating: "7.7",
            url: "http://www.booking.com/Share-6OGvjm",
        },
        {
            imageSrc: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/255718654.jpg?k=ea79fc34b2f1aaa63081f67c6e915ca0d71602a51223f591cddbb889700aab53&o=&hp=1",
            title: "Studio Fleuri",
            description: "Situé à 1,8 km de Palm Beach, le Studio Fleuri propose un restaurant, un bar et des hébergements climatisés avec balcon et connexion Wi-Fi gratuite." +
                "\n" +
                "Le Studio Fleuri possède une terrasse.",
            locationText: "Cannes, France",
            pricingText: "149/Nuit",
            rating: "5.0",
            url: "http://www.booking.com/Share-z4p4IM",
        },
        {
            imageSrc: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/155488563.jpg?k=a72fd702e21b5932ff7e7734317548d57c81db8c754df195007dc7fd2263ad50&o=&hp=1",
            title: "Hilton Garden Inn",
            description: "Situé à Bordeaux, à 1,5 km du pont de pierre, l'établissement Hilton Garden Inn Bordeaux Centre vous propose des hébergements climatisés, un bar, une réception ouverte 24h/24, une connexion Wi-Fi gratuite dans l’ensemble de ses locaux, et d'un restaurant",
            locationText: "Bordeaux, France",
            pricingText: "100/Jours",
            rating: "8.5",
            url: "http://www.booking.com/Share-gEstTS",
        },
    ]

    return (
        <Container>
            <Content>
                <HeadingWithControl>
                    <Heading>Hôtels populaires</Heading>
                    <Controls>
                        <PrevButton onClick={sliderRef?.slickPrev}><ChevronLeftIcon/></PrevButton>
                        <NextButton onClick={sliderRef?.slickNext}><ChevronRightIcon/></NextButton>
                    </Controls>
                </HeadingWithControl>
                <CardSlider ref={setSliderRef} {...sliderSettings}>
                    {cards.map((card, index) => {

                        console.log(card)
                        return (
                            <Card key={index}>
                                <CardImage imageSrc={card.imageSrc} />
                                <TextInfo>

                                    <TitleReviewContainer>
                                        <Title>{card.title}</Title>
                                        <RatingsInfo>
                                            <StarIcon />
                                            <Rating>{card.rating}</Rating>
                                        </RatingsInfo>
                                    </TitleReviewContainer>
                                    <SecondaryInfoContainer>
                                        <IconWithText>
                                            <IconContainer>
                                                <LocationIcon />
                                            </IconContainer>
                                            <Text>{card.locationText}</Text>
                                        </IconWithText>
                                        <IconWithText>
                                            <IconContainer>
                                                <PriceIcon />
                                            </IconContainer>
                                            <Text>{card.pricingText}</Text>
                                        </IconWithText>
                                    </SecondaryInfoContainer>
                                    <Description>{card.description}</Description>
                                </TextInfo>
                                <PrimaryButton><a target="_blank" href={card.url}><UrlText>Réservez Maintenant</UrlText></a></PrimaryButton>
                            </Card>)
                    })}
                </CardSlider>
            </Content>
        </Container>
    );
};
