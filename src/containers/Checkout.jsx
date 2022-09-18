import React, { useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutStripe from "../components/CheckoutStripe";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import WestIcon from "@mui/icons-material/West";
import AnchorLink from "../components/AnchorLink";
import CheckoutSummary from "../components/CheckoutSummary";
const stripePromise = loadStripe(
  "pk_test_51KWVT4CfVFZCKcENjcgn1RvUslbvj1fbQJCIeRlSerPfMn1rjoF79kX4rRRuYy1YoKjnKS3F2RL6WMgepiPEbhM000rjtT8Gm4"
);
const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  & a {
    color: black;
  position: absolute;
  left: 1rem;
  top: 1rem;
  }
`;
const Checkout = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.token === "") {
      navigate(-1);
    }
  });
  return (
    <Main>
    <AnchorLink linkTo={"/cart"} children={<WestIcon fontSize="large" passedClassName="nav-link"/>} />
    <CheckoutSummary/>
      <Elements stripe={stripePromise}>
        <CheckoutStripe />
      </Elements>
    </Main>
  );
};

export default Checkout;
