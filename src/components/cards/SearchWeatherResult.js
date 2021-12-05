import React, {useState, Component, useEffect} from "react";
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";
// import { ReactComponent as PriceIcon } from "feather-icons/dist/icons/euro.svg";
import { ReactComponent as MaxTempIcon } from "feather-icons/dist/icons/thermometer.svg"
import { ReactComponent as TempIcon } from "feather-icons/dist/icons/thermometer.svg";
import { ReactComponent as DurationIcon } from "feather-icons/dist/icons/circle.svg";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";

import axios from 'axios';
import { Spin } from "antd";



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

export default ({city,meteo}) => {
    const [loading, setLoading] = useState(true)
    //Change this according to your needs
    const [weatherData, setWeatherData] = useState([
        {
            city: "Nice",
            imageSrc: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=1024&w=768&q=80",
            temp: "21" + "°C",
            tempMax: "25" + "°C Max",
            date: "20/11/2021",
        },
        {
            city: "Nice",
            imageSrc: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=1024&w=768&q=80",
            temp: "19" + "°C",
            tempMax: "22" + "°C Max",
            date: "21/11/2021",
        },
        {
            city: "Nice",
            imageSrc: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=1024&w=768&q=80",
            temp: "18" + "°C",
            tempMax: "20" + "°C Max",
            date: "22/11/2021",
        },
        {
            city: "Nice",
            imageSrc: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=1024&w=768&q=80",
            temp: "16" + "°C",
            tempMax: "18" + "°C Max",
            date: "23/11/2021",
        },
        {
            city: "Nice",
            imageSrc: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=1024&w=768&q=80",
            temp: "16" + "°C",
            tempMax: "18" + "°C Max",
            date: "23/11/2021",
        },
    ])

    // useState is used instead of useRef below because we want to re-render when sliderRef becomes available (not null)
    const [sliderRef, setSliderRef] = useState(null);
    useEffect(
        ()=> {

     console.log(meteo, 'receivzd')

                        setLoading(true)
                 
                    const newListData = []
                    if (meteo !== '') {
                    let i = 0
                    console.log('m',meteo)
                    for (i=0; i < meteo.length; i++) {
                        let resp = meteo[i]
                 
                        newListData.push(resp)
                    }
                    console.log(newListData[0])
                }
                    setWeatherData(newListData)
                    setLoading(false)
               
        },[]
    )

    const sliderSettings = {
        arrows: false,
        slidesToShow: 4,
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



    return (
<>
{loading && (<Spin />)}
{!loading && (  <Container>
            <Content>
                <HeadingWithControl>
                    <Heading>Météo</Heading>
                    <Controls>
                        <PrevButton onClick={sliderRef?.slickPrev}><ChevronLeftIcon/></PrevButton>
                        <NextButton onClick={sliderRef?.slickNext}><ChevronRightIcon/></NextButton>
                    </Controls>
                </HeadingWithControl>
          {weatherData.length == 0 &&(<Text>Aucune donnée de météo trouvée!</Text>)}
                {!loading &&(  <CardSlider ref={setSliderRef} {...sliderSettings}>
                    {weatherData.length >0 && weatherData.map((wh, index) => (
                        <Card key={index}>
                            <CardImage /*imageSrc={*//*wh.imageSrc}*/ />
                            <TextInfo>
                                <TitleReviewContainer>
                                    <Title>{city}</Title>
                                    <RatingsInfo>
                                        <DurationIcon />
                                        <Rating>{/*card.date*/}</Rating>
                                    </RatingsInfo>
                                </TitleReviewContainer>
                                <SecondaryInfoContainer>
                                    <IconWithText>
                                        <IconContainer>
                                            <TempIcon />
                                        </IconContainer>
                                        <Text>{wh.main !== undefined ? wh.main: ''}</Text>
                                    </IconWithText>
                                    <IconWithText>
                                    <IconContainer>
                                            <MaxTempIcon />
                                        </IconContainer>
                                        <Text>{wh.main !== undefined ? wh.main.temp_max : ''}</Text>
                                    </IconWithText>
                                </SecondaryInfoContainer>
                                <Description>{ wh.description}</Description>
                            </TextInfo>
                            <PrimaryButton>Voir</PrimaryButton>
                        </Card>
                    ))}
                </CardSlider>)}
            </Content>
        </Container>)}
</>
      
    );
};

