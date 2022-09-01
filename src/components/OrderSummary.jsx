import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../styles/GlobalStyles";
import AnchorLink from "./AnchorLink";
import cartTotal from "../utils/cartTotal";

const Div = styled.div`
  flex: 1;
  border: 2px solid rgba(0, 0, 0, 0.6);
  height: max-content;
  border-radius: 1rem;
  padding: 2rem 1.2rem;
`;
const Title = styled.h2``;
const SubTitle = styled.p`
  margin: 1rem 0;
  & span {
    margin-right: 0.5rem;
  }
  &:nth-of-type(4) {
    font-weight: 700;
  }
`;
const BTN = styled(Button)`
  width: 100%;
  z-index: 5;
  border-radius: 0.2rem;
  box-shadow: 0rem 0rem 0.5rem rgba(0, 0, 0, 0.7);
  color: white;
  background: black;
  padding: 0.75rem 2rem;
  &:hover {
    background: white;
  }
`;
const OrderSummary = ({changeOrderSummary,cart}) => {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(cartTotal());
    console.log(total)
  },[changeOrderSummary,total,cart]);
  return (
    <Div>
      <Title className="fs-600">ORDER SUMMARY</Title>
      <SubTitle>
        <span>Subtotal :</span>${total}
      </SubTitle>
      <SubTitle>
        <span>Estimated Shipping :</span>$10
      </SubTitle>
      <SubTitle className="fs-500">
        <span>Total :</span>${total + 10}
      </SubTitle>
      <AnchorLink linkTo="/checkout" children={<BTN>CHECK OUT</BTN>} />
    </Div>
  );
};

export default OrderSummary;
