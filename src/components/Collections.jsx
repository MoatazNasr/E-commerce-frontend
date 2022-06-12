import React from "react";
import styled from "styled-components";
import AnchorLink from "./AnchorLink";
import { Button } from "../styles/GlobalStyles";
const Img = styled.img`
  max-height: 750px;
  display: inline;
  margin: 0 auto;
  position: relative;
  z-index: -1;
`;
const BTN = styled(Button)`
  margin: 1rem auto;
  border-radius: 0.2rem;
  box-shadow: 0rem 0rem 0.5rem rgba(0, 0, 0, 0.7);
  color: white;
  background: black;
  padding: 1rem ;
  &:hover {
    background: white;
    color:#f3b2c2;
  }`;
const Section = styled.section`
  margin-top: 10rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  & > div:nth-of-type(1) {
    max-height: 100%;
    grid-row: 1 / span 2;
  }
`;
const Div1 = styled.div`
  & img {
    max-height: 100%;
  }
`;
const SubDiv = styled.div`
  margin: 4rem 0;
  display: grid;
  place-content: center;
  padding:2rem;
  background: url(/assets/images/pexels-dziana-hasanbekava-5480696.jpg) bottom right ;
  & p{
    margin-top:0.5rem;
  };
`;
const Div2 = styled.div`
  background: black;
  position: relative;
  z-index: 1;
  color: white;
  & p {
    width: 5ch;
    margin: 1rem auto;
    line-height: 3rem;
  }
  & img {
    position: absolute;
    top: -4rem;
    left: -3rem;
  }
`;
const H1 = styled.h1`
  text-align: center;
  color: #f3b2c2;
  & span {
    mix-blend-mode: difference;
  }
`;

const Div3 = styled.div`
  position: relative;
  z-index: 2;
  & img {
    max-height: 100%;
  }
`;
const Collections = () => {
  return (
    <>
      <Section>
        <Div1>
          <Img
            src="/assets/images/max-anderson-V1AwjLYMAwg-unsplash.jpg"
            alt="collection1-img"
          />
          <SubDiv>
            <p className="fs-500">Discover Our Latest Collection</p>
            <p className="fs-500">Sale Up To 70%</p>
            <AnchorLink
              linkTo="/shop"
              children={<BTN>SHOP NOW</BTN>}
              
            />
          </SubDiv>
        </Div1>
        <Div2 className="fs-500">
          <Img
            src="/assets/images/freestocks-8hAsLeE6Fbo-unsplash.jpg"
            alt="collection2-img"
          />
          <H1 className="fs-800">
            <span>COLLECT</span>IONS
          </H1>
          <p>WE GOT THE CLASSIC STYLISH CHARMING COLLECTIONS </p>
        </Div2>
        <Div3>
          <Img src="/assets/images/pexels-photo-2983464.jpeg" alt="collection3-img" />
        </Div3>
      </Section>
    </>
  );
};

export default Collections;
