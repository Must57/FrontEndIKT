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

export default ({
                    subheading = "",
                    heading = "Mes Préférences",

                }) => {
    return (
        <Container>
            <ContentWithPaddingXl>
                <HeadingContainer>
                    <Heading>{heading}</Heading>

                </HeadingContainer>

            </ContentWithPaddingXl>
        </Container>
    );
};
