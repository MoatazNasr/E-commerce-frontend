import React from "react";
import styled from "styled-components";
import { Button } from "../styles/GlobalStyles";
import AnchorLink from "./AnchorLink";
const BTN = styled(Button)`
  width: 200px;
  margin-top: 0.5rem;
  cursor: pointer;
  z-index: 5;
  border-radius: 0.2rem;
  box-shadow: 0rem 0rem 0.5rem rgba(0, 0, 0, 0.7);
  padding: 0.75rem 2rem;
  color: white;
  background-color: black;
  &:hover {
    background: white;
  }
`;
const Section = styled.section`
  position: relative;
  display: grid;
  text-align: center;
  align-items: center;
  height: 692px;
  background: url("../../assets/images/thumb-1920-1059881.jpg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  & div {
    position: absolute;
    margin-left: 2rem;
  }
`;

const Sale = () => {
  return (
    <Section>
      <div>
        <h1 className="fs-800">SALE UP TO 40%</h1>
        <p className="fs-600">CHECK THE SALE BEFORE IT ENDS</p>
        <AnchorLink
          linkTo="/collection"
          children={<BTN>COLLECTION</BTN>}
        />{" "}
      </div>
    </Section>
  );
};

export default Sale;
