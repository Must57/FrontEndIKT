import React, { useState } from "react";
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";

import { ReactComponent as TimeIcon } from "feather-icons/dist/icons/calendar.svg";
import { ReactComponent as PriceIcon } from "images/euro.svg";
import { ReactComponent as DurationIcon } from "feather-icons/dist/icons/circle.svg";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";

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


const TextInfo = tw.div`py-6 sm:px-10 sm:py-6`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
const Title = tw.h5`text-2xl font-bold`;

const RatingsInfo = styled.div`
  ${tw`flex items-center sm:ml-4 mt-2 sm:mt-0`}
  svg {
    ${tw`w-6 h-6 text-orange-400 fill-current`}
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

const PrimaryButton = tw(PrimaryButtonBase)`mt-auto sm:text-lg rounded-none w-full rounded sm:rounded-none sm:rounded-br-4xl py-3 sm:py-6`;
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
            title: "Barcelone-Paris",
            description: "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
            locationText: "25/10/2021",
            pricingText: "89/Aller",
            rating: "1" + " h " + "41",
        },
        {
            title: "Madrid-Nice",
            description: "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
            locationText: "20/10/2021 25/10/2021",
            pricingText: "180   Aller-Retour",
            rating: "0" + " h " + "41",
        },
        {
            title: "Berlin-Paris",
            description: "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
            locationText: "01/11/2021 12/11/2021",
            pricingText: "185,99    Aller-Retour",
            rating: "1" + " h " + "25",
        },
        {
            title: "Londres-Paris",
            description: "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
            locationText: "12/11/2021 29/11/2021",
            pricingText: "156,80    Aller-Retour",
            rating: "0" + " h " + "55",
        },
    ]

    return (
        <Container>
            <Content>
                <HeadingWithControl>
                    <Heading>Billets d'avion</Heading>
                    <Controls>
                        <PrevButton onClick={sliderRef?.slickPrev}><ChevronLeftIcon/></PrevButton>
                        <NextButton onClick={sliderRef?.slickNext}><ChevronRightIcon/></NextButton>
                    </Controls>
                </HeadingWithControl>
                <CardSlider ref={setSliderRef} {...sliderSettings}>
                    {cards.map((card, index) => (
                        <Card key={index}>
                            <TextInfo>
                                <TitleReviewContainer>
                                    <Title>{card.title}</Title>
                                    <RatingsInfo>
                                        <DurationIcon />
                                        <Rating>{card.rating}</Rating>
                                    </RatingsInfo>
                                </TitleReviewContainer>
                                <SecondaryInfoContainer>
                                    <IconWithText>
                                        <IconContainer>
                                            <TimeIcon />
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
                            <PrimaryButton>Voir le vol</PrimaryButton>
                        </Card>
                    ))}
                </CardSlider>
            </Content>
        </Container>
    );
};
