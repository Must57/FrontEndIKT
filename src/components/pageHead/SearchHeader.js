import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { Container as ContainerBase, ContentWithPaddingXl } from "components/misc/Layouts";
import { SectionDescription } from "components/misc/Typography";
import styled from "styled-components";
import { ReactComponent as FavorisIcon } from "feather-icons/dist/icons/heart.svg";

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
    return (
        <Container>
            <ContentWithPaddingXl>
                <HeadingContainer>
                    <Heading>{heading}</Heading>
                    {description && <Description>{description}</Description>}

                    <IconContainer>
                        <FavorisIcon/>

                    </IconContainer>
                </HeadingContainer>

            </ContentWithPaddingXl>
        </Container>
    );
};
