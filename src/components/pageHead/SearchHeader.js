import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { Container as ContainerBase, ContentWithPaddingXl } from "components/misc/Layouts";
import { SectionDescription } from "components/misc/Typography";
import styled from "styled-components";
import { ReactComponent as FavorisIcon } from "feather-icons/dist/icons/heart.svg";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "state/store/userReducer/selector/userSelector";
import { addFavourites, removeFavourites } from "state/store/userReducer/actions/userAction";
import axios from "axios";
import { toast } from "react-toastify";
import { Spin } from "antd";

const Container = tw(ContainerBase)`my-8  lg:my-10 bg-gray-100 text-gray-100 -mx-8 px-8 text-center`;
const HeadingContainer = tw.div``;
const Heading = tw(SectionHeading)`sm:text-3xl md:text-4xl lg:text-5xl`;
const Subheading = tw(SubheadingBase)`text-gray-100 text-center`;
const Description = tw(SectionDescription)`text-black text-center mx-auto max-w-screen-md`;

const StatsContainer = tw.div`mt-8 flex flex-col sm:flex-row items-center justify-center flex-wrap max-w-screen-md justify-between mx-auto`
const Stat = tw.div`flex flex-col text-center p-4 tracking-wide`
const StatKey = tw.div`text-xl font-medium`
const StatValue = tw.div`text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-black`
const IconContainer = styled.div`
  ${tw`inline-block mx-auto  rounded-full p-2 bg-orange-400 text-gray-100 mt-6`}
  svg {
    ${tw`w-5 h-5`}
  }
`;
export default ({
                    subheading = "",
                    heading = "Nice",
                    city,
                    description = "🏠 ➞ 506 km ",
                    /*
                    stats = [
                        {
                            key: "Clients",
                            value: "2500+",
                        },
                        {
                            key: "Revenue",
                            value: "$100M+",
                        },
                        {
                            key: "Employees",
                            value: "150+",
                        },
                    ]*/
                }) => {
                    const user = useSelector(userSelector)
                    const dispatch = useDispatch()
                    const [inFav, setInFav] = useState(false)
                    const [loading, setLoading] = useState(false)
                 
                    const addFavourite = async (e) => 
                    {
                        let req
                        if (user.favourites.includes(city)) {
                            try {
                                setLoading(true)
                             req = await axios.post('http://localhost:8000/user-service/deleteFavourite',{userId: user._id, city},{headers:{'Authorization':'Bearer '+user.token}})
                        if (req.data.message === "Updated"){
                            dispatch(removeFavourites(city))
                            console.log(user)
                            localStorage.setItem('user_info',JSON.stringify(user))
                         toast.success('Retiré des favoris !')
                         
                        }  
                         }catch(err){
 
                            }
                            setLoading(false)
                            
                        }else {
                           
                           try {
                               setLoading(true)
                            req = await axios.post('http://localhost:8000/user-service/addFavourite',{userId: user._id, city},{headers:{'Authorization':'Bearer '+user.token}})
                       if (req.data.message === "Updated"){
                        dispatch(addFavourites(city))
                        console.log(user)
                        localStorage.removeItem('user_info')
                        localStorage.setItem('user_info',JSON.stringify(user))
                        toast.success('Ajouté dans les favoris !')
                        
                       }  
                        }catch(err){

                           }
                        setLoading(false)   
                    }
                }

                    useEffect(() => {
                        if(user.token !== undefined) {
                            setInFav(user.favourites.includes(city))
                        }
                    }, [user])
                    
    return (
        <Container>
            <ContentWithPaddingXl>
                <HeadingContainer>
                    <Heading>{city}</Heading>
                    {description && <Description>{description}</Description>}

                    <IconContainer onClick={addFavourite}>
                        {loading && (<Spin size="large" />)}
                        {!loading && inFav && (    <FavorisIcon fill="red" />)}
                        {!loading && !inFav && (<FavorisIcon />)}

                    </IconContainer>
                </HeadingContainer>

            </ContentWithPaddingXl>
        </Container>
    );
};
