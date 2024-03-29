import React, { useState } from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";

import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-5.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-7.svg";
import imgRestaurants from 'images/restaurants.png';
import imgSupermarche from 'images/supermarche.png';
import imgBanques from 'images/banques.png';
import imgPostes from 'images/postes.png';
import imgPharmacie from 'images/pharmacie.png';


const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const Header = tw(SectionHeading)``;
const TabsControl = tw.div`flex flex-wrap bg-gray-200 px-2 py-2 rounded leading-none mt-12 xl:mt-0`;

const TabControl = styled.div`
  ${tw`cursor-pointer px-6 py-3 mt-2 sm:mt-0 sm:mr-2 last:mr-0 text-gray-600 font-medium rounded-sm transition duration-300 text-sm sm:text-base w-1/2 sm:w-auto text-center`}
  &:hover {
    ${tw`bg-gray-300 text-gray-700`}
  }
  ${props => props.active && tw`bg-orange-400! text-gray-100!`}
  }
`;

const TabContent = tw(motion.div)`mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`;
const CardContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12`;
const Card = tw(motion.a)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`;
const CardImageContainer = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-56 xl:h-64 bg-center bg-cover relative rounded-t`}
`;
const CardRatingContainer = tw.div`leading-none absolute inline-flex bg-gray-100 bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end`;
const CardRating = styled.div`
  ${tw`mr-1 text-sm font-bold flex items-end`}
  svg {
    ${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
  }
`;

const CardHoverOverlay = styled(motion.div)`
  background-color: rgba(255, 165, 60, 0.5);
  ${tw`absolute inset-0 flex justify-center items-center`}
`;
const CardButton = tw(PrimaryButtonBase)`text-sm bg-black`;

const CardReview = tw.div`font-medium text-xs text-gray-600`;

const CardText = tw.div`p-4 text-gray-900`;
const CardTitle = tw.h5`text-lg font-semibold group-hover:text-orange-400`;
const CardContent = tw.p`mt-1 text-sm font-medium text-gray-600`;
const CardPrice = tw.p`mt-4 text-xl font-bold`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-orange-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-80 w-80 opacity-15 transform -translate-x-2/3 text-black`}
`;

const UrlText = tw.div`sm:text-lg text-white font-bold font-semibold`;
const UrlText2 = tw.div`text-white font-semibold  `;

export default ({

                    heading = "Lieux Importants",
                    data = {},  // possède: {banques:{banques:..,length:..}},..

                    tabs = {
                        supermarche: [
                            {
                                imageSrc:
                                    "https://images.unsplash.com/photo-1580913428735-bd3c269d6a82?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                                title: "Monop'Nice GUISOL",
                                content: "Adresse : 15 rue François Guisol, 06300 Nice",
                                price: "Ouvert",
                                rating: "5.0",
                                reviews: "87",
                                url: "#"
                            }
                        ],
                        restaurants: [
                            {
                                imageSrc:
                                    "images/restaurants.png",
                                title: "Monop'Nice GUISOL",
                                content: "Adresse : 15 rue François Guisol, 06300 Nice",
                                price: "Ouvert",
                                rating: "5.0",
                                reviews: "87",
                                url: "#"
                            },
                            {
                                imageSrc:
                                    "https://images.unsplash.com/photo-1580913428706-c311e67898b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                                title: "Monop'Nice GUISOL",
                                content: "Adresse : 15 rue François Guisol, 06300 Nice",
                                price: "Ouvert",
                                rating: "4.8",
                                reviews: "32",
                                url: "#"
                            },
                            {
                                imageSrc:
                                    "https://images.unsplash.com/photo-1580913428706-c311e67898b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                                title: "Monop'Nice GUISOL",
                                content: "Adresse : 15 rue François Guisol, 06300 Nice",
                                price: "Ouvert",
                                rating: "4.9",
                                reviews: "89",
                                url: "#"
                            },
                            {
                                imageSrc:
                                    "https://images.unsplash.com/photo-1580913428706-c311e67898b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                                title: "Monop'Nice GUISOL",
                                content: "Adresse : 15 rue François Guisol, 06300 Nice",
                                price: "Ouvert",
                                rating: "4.6",
                                reviews: "12",
                                url: "#"
                            },
                            {
                                imageSrc:
                                    "https://images.unsplash.com/photo-1580913428706-c311e67898b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                                title: "Monop'Nice GUISOL",
                                content: "Adresse : 15 rue François Guisol, 06300 Nice",
                                price: "Ouvert",
                                rating: "4.2",
                                reviews: "19",
                                url: "#"
                            },
                            {
                                imageSrc:
                                    "https://images.unsplash.com/photo-1580913428706-c311e67898b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                                title: "Monop'Nice GUISOL",
                                content: "Adresse : 15 rue François Guisol, 06300 Nice",
                                price: "Ouvert",
                                rating: "5.0",
                                reviews: "61",
                                url: "#"
                            },
                            {
                                imageSrc:
                                    "https://images.unsplash.com/photo-1580913428706-c311e67898b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                                title: "Monop'Nice GUISOL",
                                content: "Adresse : 15 rue François Guisol, 06300 Nice",
                                price: "Ouvert",
                                rating: "4.2",
                                reviews: "95",
                                url: "#"
                            },
                            {
                                imageSrc:
                                    "https://images.unsplash.com/photo-1580913428706-c311e67898b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                                title: "Monop'Nice GUISOL",
                                content: "Adresse : 15 rue François Guisol, 06300 Nice",
                                price: "Ouvert",
                                rating: "3.9",
                                reviews: "26",
                                url: "#"
                            }
                        ],
                        banques: [
                            {
                                imageSrc:
                                    "https://images.unsplash.com/photo-1580913428735-bd3c269d6a82?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                                title: "Monop'Nice GUISOL",
                                content: "Adresse : 15 rue François Guisol, 06300 Nice",
                                price: "Ouvert",
                                rating: "5.0",
                                reviews: "87",
                                url: "#"
                            },
                            {
                                imageSrc:
                                    "https://images.unsplash.com/photo-1580913428706-c311e67898b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                                title: "Monop'Nice GUISOL",
                                content: "Adresse : 15 rue François Guisol, 06300 Nice",
                                price: "Ouvert",
                                rating: "4.8",
                                reviews: "32",
                                url: "#"
                            },
                            {
                                imageSrc:
                                    "https://images.unsplash.com/photo-1580913428706-c311e67898b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                                title: "Monop'Nice GUISOL",
                                content: "Adresse : 15 rue François Guisol, 06300 Nice",
                                price: "Ouvert",
                                rating: "4.9",
                                reviews: "89",
                                url: "#"
                            },
                            {
                                imageSrc:
                                    "https://images.unsplash.com/photo-1580913428706-c311e67898b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                                title: "Monop'Nice GUISOL",
                                content: "Adresse : 15 rue François Guisol, 06300 Nice",
                                price: "Ouvert",
                                rating: "4.6",
                                reviews: "12",
                                url: "#"
                            },
                            {
                                imageSrc:
                                    "https://images.unsplash.com/photo-1580913428706-c311e67898b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                                title: "Monop'Nice GUISOL",
                                content: "Adresse : 15 rue François Guisol, 06300 Nice",
                                price: "Ouvert",
                                rating: "4.2",
                                reviews: "19",
                                url: "#"
                            },
                            {
                                imageSrc:
                                    "https://images.unsplash.com/photo-1580913428706-c311e67898b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                                title: "Monop'Nice GUISOL",
                                content: "Adresse : 15 rue François Guisol, 06300 Nice",
                                price: "Ouvert",
                                rating: "5.0",
                                reviews: "61",
                                url: "#"
                            },
                            {
                                imageSrc:
                                    "https://images.unsplash.com/photo-1580913428706-c311e67898b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                                title: "Monop'Nice GUISOL",
                                content: "Adresse : 15 rue François Guisol, 06300 Nice",
                                price: "Ouvert",
                                rating: "4.2",
                                reviews: "95",
                                url: "#"
                            },
                            {
                                imageSrc:
                                    "https://images.unsplash.com/photo-1580913428706-c311e67898b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                                title: "Monop'Nice GUISOL",
                                content: "Adresse : 15 rue François Guisol, 06300 Nice",
                                price: "Ouvert",
                                rating: "3.9",
                                reviews: "26",
                                url: "#"
                            }],
                        pharmacie: [
                            {
                                imageSrc:
                                    "https://images.unsplash.com/photo-1580913428735-bd3c269d6a82?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                                title: "Monop'Nice GUISOL",
                                content: "Adresse : 15 rue François Guisol, 06300 Nice",
                                price: "Ouvert",
                                rating: "5.0",
                                reviews: "87",
                                url: "#"
                            },
                            {
                                imageSrc:
                                    "https://images.unsplash.com/photo-1580913428706-c311e67898b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                                title: "Monop'Nice GUISOL",
                                content: "Adresse : 15 rue François Guisol, 06300 Nice",
                                price: "Ouvert",
                                rating: "4.8",
                                reviews: "32",
                                url: "#"
                            },
                            {
                                imageSrc:
                                    "https://images.unsplash.com/photo-1580913428706-c311e67898b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                                title: "Monop'Nice GUISOL",
                                content: "Adresse : 15 rue François Guisol, 06300 Nice",
                                price: "Ouvert",
                                rating: "4.9",
                                reviews: "89",
                                url: "#"
                            },
                            {
                                imageSrc:
                                    "https://images.unsplash.com/photo-1580913428706-c311e67898b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                                title: "Monop'Nice GUISOL",
                                content: "Adresse : 15 rue François Guisol, 06300 Nice",
                                price: "Ouvert",
                                rating: "4.6",
                                reviews: "12",
                                url: "#"
                            },
                            {
                                imageSrc:
                                    "https://images.unsplash.com/photo-1580913428706-c311e67898b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                                title: "Monop'Nice GUISOL",
                                content: "Adresse : 15 rue François Guisol, 06300 Nice",
                                price: "Ouvert",
                                rating: "4.2",
                                reviews: "19",
                                url: "#"
                            },
                            {
                                imageSrc:
                                    "https://images.unsplash.com/photo-1580913428706-c311e67898b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                                title: "Monop'Nice GUISOL",
                                content: "Adresse : 15 rue François Guisol, 06300 Nice",
                                price: "Ouvert",
                                rating: "5.0",
                                reviews: "61",
                                url: "#"
                            },
                            {
                                imageSrc:
                                    "https://images.unsplash.com/photo-1580913428706-c311e67898b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                                title: "Monop'Nice GUISOL",
                                content: "Adresse : 15 rue François Guisol, 06300 Nice",
                                price: "Ouvert",
                                rating: "4.2",
                                reviews: "95",
                                url: "#"
                            },
                            {
                                imageSrc:
                                    "https://images.unsplash.com/photo-1580913428706-c311e67898b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                                title: "Monop'Nice GUISOL",
                                content: "Adresse : 15 rue François Guisol, 06300 Nice",
                                price: "Ouvert",
                                rating: "3.9",
                                reviews: "26",
                                url: "#"
                            }
                        ],
                        postes: [
                            {
                                imageSrc:
                                    "https://images.unsplash.com/photo-1580913428735-bd3c269d6a82?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                                title: "Monop'Nice GUISOL",
                                content: "Adresse : 15 rue François Guisol, 06300 Nice",
                                price: "Ouvert",
                                rating: "5.0",
                                reviews: "87",
                                url: "#"
                            },
                            {
                                imageSrc:
                                    "https://images.unsplash.com/photo-1580913428706-c311e67898b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                                title: "Monop'Nice GUISOL",
                                content: "Adresse : 15 rue François Guisol, 06300 Nice",
                                price: "Ouvert",
                                rating: "4.8",
                                reviews: "32",
                                url: "#"
                            },
                            {
                                imageSrc:
                                    "https://images.unsplash.com/photo-1580913428706-c311e67898b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                                title: "Monop'Nice GUISOL",
                                content: "Adresse : 15 rue François Guisol, 06300 Nice",
                                price: "Ouvert",
                                rating: "4.9",
                                reviews: "89",
                                url: "#"
                            },
                            {
                                imageSrc:
                                    "https://images.unsplash.com/photo-1580913428706-c311e67898b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                                title: "Monop'Nice GUISOL",
                                content: "Adresse : 15 rue François Guisol, 06300 Nice",
                                price: "Ouvert",
                                rating: "4.6",
                                reviews: "12",
                                url: "#"
                            },
                            {
                                imageSrc:
                                    "https://images.unsplash.com/photo-1580913428706-c311e67898b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                                title: "Monop'Nice GUISOL",
                                content: "Adresse : 15 rue François Guisol, 06300 Nice",
                                price: "Ouvert",
                                rating: "4.2",
                                reviews: "19",
                                url: "#"
                            },
                            {
                                imageSrc:
                                    "https://images.unsplash.com/photo-1580913428706-c311e67898b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                                title: "Monop'Nice GUISOL",
                                content: "Adresse : 15 rue François Guisol, 06300 Nice",
                                price: "Ouvert",
                                rating: "5.0",
                                reviews: "61",
                                url: "#"
                            },
                            {
                                imageSrc:
                                    "https://images.unsplash.com/photo-1580913428706-c311e67898b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                                title: "Monop'Nice GUISOL",
                                content: "Adresse : 15 rue François Guisol, 06300 Nice",
                                price: "Ouvert",
                                rating: "4.2",
                                reviews: "95",
                                url: "#"
                            },
                            {
                                imageSrc:
                                    "https://images.unsplash.com/photo-1580913428706-c311e67898b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                                title: "Monop'Nice GUISOL",
                                content: "Adresse : 15 rue François Guisol, 06300 Nice",
                                price: "Ouvert",
                                rating: "3.9",
                                reviews: "26",
                                url: "#"
                            }
                        ]
                        /*Banques: getRandomCards(),
                        Hôpitaux: getRandomCards(),
                        Postes: getRandomCards()*/
                    }
                }) => {
    /*
     * To customize the tabs, pass in data using the `tabs` prop. It should be an object which contains the name of the tab
     * as the key and value of the key will be its content (as an array of objects).
     * To see what attributes are configurable of each object inside this array see the example above for "Starters".
     */
    const tabsKeys = Object.keys(tabs);
    const nametabs= {
        restaurants:"Restaurants",
        banques: "Banques",
        supermarche:"Supermarche",
        postes: "Postes",
        pharmacie:"Pharmacie"
    }
    const [activeTab, setActiveTab] = useState(tabsKeys[0]);
    
    return (
        <Container>
            <ContentWithPaddingXl>
                <HeaderRow>
                    <Header>{heading}</Header>
                    <TabsControl>
                        {Object.keys(tabs).map((tabName, index) => (
                            <TabControl key={index} active={activeTab === tabName} onClick={() => setActiveTab(tabName)}>
                                {nametabs[tabName]}
                            </TabControl>
                        ))}
                    </TabsControl>
                </HeaderRow>

                {tabsKeys.map((tabKey, index) => (
                    <TabContent
                        key={index}
                        variants={{
                            current: {
                                opacity: 1,
                                scale:1,
                                display: "flex",
                            },
                            hidden: {
                                opacity: 0,
                                scale:0.8,
                                display: "none",
                            }
                        }}
                        transition={{ duration: 0.4 }}
                        initial={activeTab === tabKey ? "current" : "hidden"}
                        animate={activeTab === tabKey ? "current" : "hidden"}
                    >
                        {data !== undefined && data[tabKey][tabKey].map((dataInfo, index) => (
                            <CardContainer key={index}>
                                <Card className="group" href={""} initial="rest" whileHover="hover" animate="rest">

                                    <CardImageContainer imageSrc={(dataInfo.fields.type === "restaurant" ? imgRestaurants : dataInfo.fields.type === "bank" ? imgBanques : dataInfo.fields.type === "supermarket" ? imgSupermarche : dataInfo.fields.type === "pharmacy" ? imgPharmacie : dataInfo.fields.type === "post_office" ? imgPostes : '')}>
                                        <CardHoverOverlay
                                            variants={{
                                                hover: {
                                                    opacity: 1,
                                                    height: "auto"
                                                },
                                                rest: {
                                                    opacity: 0,
                                                    height: 0
                                                }
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <UrlText2>
                                            {dataInfo.fields.website !== undefined && dataInfo.fields.url_caresteouvert !== undefined ?
                                                <CardButton><a target="_blank" href={dataInfo.fields.website !== undefined ? dataInfo.fields.website : (dataInfo.fields.url_caresteouvert !== undefined ? dataInfo.fields.url_caresteouvert : '')}><UrlText>Voir</UrlText></a></CardButton>
                                            : 'Nous n\'avons pas de site'}
                                                </UrlText2>
                                        </CardHoverOverlay>
                                    </CardImageContainer>
                                    <CardText>
                                        <CardTitle>{dataInfo.fields.name !== undefined ? dataInfo.fields.name : dataInfo.fields.brand}</CardTitle>
                                        <CardContent>{dataInfo.fields.opening_hours !== undefined && dataInfo.fields.phone !== undefined ? "Heure d'ouverture : " + dataInfo.fields.opening_hours + "\n\n Numéro de téléphone : " + dataInfo.fields.phone : ''}</CardContent>
                                        <CardPrice></CardPrice>
                                    </CardText>
                                </Card>
                            </CardContainer>
                        ))}
                    </TabContent>
                ))}
            </ContentWithPaddingXl>
            <DecoratorBlob1 />
            <DecoratorBlob2 />
        </Container>
    );
};

/* This function is only there for demo purposes. It populates placeholder cards */
const getRandomCards = () => {
    const cards = [
        {
            imageSrc:
                "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
            title: "Chicken Chilled",
            content: "Adresse : 15 rue François Guisol, 06300 Nice",
            price: "$5.99",
            rating: "5.0",
            reviews: "87",
            url: "#"
        },
        {
            imageSrc:
                "https://images.unsplash.com/photo-1582254465498-6bc70419b607?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
            title: "Samsa Beef",
            content: "Adresse : 15 rue François Guisol, 06300 Nice",
            price: "$3.99",
            rating: "4.5",
            reviews: "34",
            url: "#"
        },
        {
            imageSrc:
                "https://images.unsplash.com/photo-1565310022184-f23a884f29da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
            title: "Carnet Nachos",
            content: "Adresse : 15 rue François Guisol, 06300 Nice",
            price: "$3.99",
            rating: "3.9",
            reviews: "26",
            url: "#"
        },
        {
            imageSrc:
                "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
            title: "Guacamole Mex",
            content: "Adresse : 15 rue François Guisol, 06300 Nice",
            price: "$3.99",
            rating: "4.2",
            reviews: "95",
            url: "#"
        },
        {
            imageSrc:
                "https://images.unsplash.com/photo-1550461716-dbf266b2a8a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
            title: "Chillie Cake",
            content: "Adresse : 15 rue François Guisol, 06300 Nice",
            price: "$2.99",
            rating: "5.0",
            reviews: "61",
            url: "#"
        },
        {
            imageSrc:
                "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327??ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
            title: "Nelli",
            content: "Adresse : 15 rue François Guisol, 06300 Nice",
            price: "$7.99",
            rating: "4.9",
            reviews: "89",
            url: "#"
        },
        {
            imageSrc:
                "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
            title: "Jalapeno Poppers",
            content: "Adresse : 15 rue François Guisol, 06300 Nice",
            price: "$8.99",
            rating: "4.6",
            reviews: "12",
            url: "#"
        },
        {
            imageSrc:
                "https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
            title: "Cajun Chicken",
            content: "Adresse : 15 rue François Guisol, 06300 Nice",
            price: "$7.99",
            rating: "4.2",
            reviews: "19",
            url: "#"
        }
    ];

    // Shuffle array
    return cards.sort(() => Math.random() - 0.5);
};
