import React, { useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutStripe from "../components/CheckoutStripe";
import { useNavigate } from "react-router-dom";
import { setErrorMessage } from "../redux/errorMessageSlice";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
const stripePromise = loadStripe(
  "pk_test_51KWVT4CfVFZCKcENjcgn1RvUslbvj1fbQJCIeRlSerPfMn1rjoF79kX4rRRuYy1YoKjnKS3F2RL6WMgepiPEbhM000rjtT8Gm4"
);
const Section = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  & img {
    height: 100vh;
    width: 100%;
    object-fit: cover;
  }
`;
const Checkout = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (user.token === "") {
      navigate(-1);
      dispatch(setErrorMessage("Please Login to continue"));
    }
  });
  return (
    <Section>
      <img src="assets/images/offer_img.jpg" alt="" />
      <Elements stripe={stripePromise}>
        <CheckoutStripe />
      </Elements>
    </Section>
  );
};

export default Checkout;
