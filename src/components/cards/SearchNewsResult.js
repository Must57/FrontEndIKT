import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";

import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/clipboard.svg";
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
const Title = tw.h5` font-bold`;

const RatingsInfo = styled.div`
  ${tw`flex items-center sm:ml-4 mt-2 sm:mt-0`}
  svg {
    ${tw`w-6 h-6 text-yellow-500 fill-current`}
  }
`;
const Rating = tw.span`ml-2 font-bold`;

const Description = tw.p`text-xs leading-loose mt-2 sm:mt-4`;

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
const UrlText = tw.div`sm:text-lg text-white font-bold font-semibold`;
export default ({news}) => {

    const [loading, setLoading] = useState(true)
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
    const [newsData, setNewsData] = useState([
        {
            imageSrc: "https://fyooyzbm.filerobot.com/v7/protec/DATA_ART_8148967-zKMj4YrO.jpg?vh=873c24&ci_seal=b9045ba6dd&w=1280&h=746&gravity=auto&func=crop",
            title: "En raison d'une forte houle, baignade déconseillée à Nice, Monaco et Menton ce dimanche",
            description: "En raison du forte houle à venir dans l'après-midi ce dimanche 19 septembre, la Préfecture conseille d'éviter la baignade sur le littoral niçois ainsi qu'à Monaco et Menton...",
            newsSoucre: "Nice Matin",

        },
        {
            imageSrc: "https://fyooyzbm.filerobot.com/v7/protec/DATA_ART_8148967-zKMj4YrO.jpg?vh=873c24&ci_seal=b9045ba6dd&w=1280&h=746&gravity=auto&func=crop",
            title: "En raison d'une forte houle, baignade déconseillée à Nice, Monaco et Menton ce dimanche",
            description: "En raison du forte houle à venir dans l'après-midi ce dimanche 19 septembre, la Préfecture conseille d'éviter la baignade sur le littoral niçois ainsi qu'à Monaco et Menton...",
            newsSoucre: "Nice Matin",

        },
        {
            imageSrc: "https://fyooyzbm.filerobot.com/v7/protec/DATA_ART_8148967-zKMj4YrO.jpg?vh=873c24&ci_seal=b9045ba6dd&w=1280&h=746&gravity=auto&func=crop",
            title: "En raison d'une forte houle, baignade déconseillée à Nice, Monaco et Menton ce dimanche",
            description: "En raison du forte houle à venir dans l'après-midi ce dimanche 19 septembre, la Préfecture conseille d'éviter la baignade sur le littoral niçois ainsi qu'à Monaco et Menton...",
            newsSoucre: "Nice Matin",

        },
        {
            imageSrc: "https://fyooyzbm.filerobot.com/v7/protec/DATA_ART_8148967-zKMj4YrO.jpg?vh=873c24&ci_seal=b9045ba6dd&w=1280&h=746&gravity=auto&func=crop",
            title: "En raison d'une forte houle, baignade déconseillée à Nice, Monaco et Menton ce dimanche",
            description: "En raison du forte houle à venir dans l'après-midi ce dimanche 19 septembre, la Préfecture conseille d'éviter la baignade sur le littoral niçois ainsi qu'à Monaco et Menton...",
            newsSoucre: "Nice Matin",

        },
    ])

    useEffect(
        ()=> {
    
                    setLoading(true)

                    const newNListData = []
                    let i = 0
                    if(news !== undefined) {
                        if (news.articles !== undefined) {
                            for (i = 0; i < news.articles.length; i++) {
                                if (news.articles[i].topic === "news") {
                                    let resp = news.articles[i]

                                    newNListData.push(resp)
                                }
                            }
                            console.log(newNListData[0])
                        }
                    }
                    setNewsData(newNListData)
                setLoading(false)
                
        }, []
    )

    return (
        <>

       {loading && (<Spin />)}
       {!loading &&(<Container>
            <Content>
                <HeadingWithControl>
                    <Heading>Actualités</Heading>
                    <Controls>
                        <PrevButton onClick={sliderRef?.slickPrev}><ChevronLeftIcon/></PrevButton>
                        <NextButton onClick={sliderRef?.slickNext}><ChevronRightIcon/></NextButton>
                    </Controls>
                </HeadingWithControl>
                {newsData.length === 0 && (<Text>Aucune donnée trouvée </Text>)}
                <CardSlider ref={setSliderRef} {...sliderSettings}>
              
                    {newsData.length >0 && newsData.map((nd, index) => (
                        <Card key={index}>
                            <CardImage imageSrc={nd !== undefined ? nd.media : ''} />
                            <TextInfo>
                                <TitleReviewContainer>
                                    <Title>{nd !== undefined ? nd.title : ''}</Title>

                                </TitleReviewContainer>
                                <Description>{nd !== undefined ? nd.summary : ''}</Description>
                                <SecondaryInfoContainer>
                                    <IconWithText>
                                        <IconContainer>
                                            <LocationIcon />
                                        </IconContainer>
                                        <Text>{nd !== undefined ? nd.author : ''}</Text>
                                    </IconWithText>

                                </SecondaryInfoContainer>

                            </TextInfo>
                            <PrimaryButton><a target="_blank" href={nd !== undefined ? nd.link : ''}><UrlText>Voir</UrlText></a></PrimaryButton>
                        </Card>
                    ))}
                </CardSlider>
            </Content>
        </Container>)}
       
       </> 
    );
};
