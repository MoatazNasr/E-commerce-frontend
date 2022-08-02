import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { userRequest } from "../utils/apiCallMethods";
import { useSelector } from "react-redux";
const Div = styled.div`
  margin: 1.5rem;
  & p span{
    font-weight: 700;
  }
`;
const Wallet = () => {
  const user = useSelector((state) => state.user);
  return (
    <Div>
      <h1>
        Any canceled order it's total amount will be refunded to your wallet
      </h1>
      <p> <span>Current Balance</span>: ${user.wallet}</p>
    </Div>
  );
};

export default Wallet;
