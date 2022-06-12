import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import styled from "styled-components";
import { Button } from "../styles/GlobalStyles";
import InputLabel from "./Input&Label";
import { userRequest } from "../utils/apiCallMethods";
import cartTotal from "../utils/cartTotal";
const Section = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const BTN = styled(Button)`
  margin: 3rem;
  z-index: 5;
  border-radius: 0.2rem;
  box-shadow: 0rem 0rem 0.5rem rgba(0, 0, 0, 0.7);
  color: white;
  background: black;
  padding: 0.75rem 6rem;
  &:hover {
    background: white;
  }
`;
const Title = styled.h1`
  margin: 2rem 0;
  text-align: center;
`;
const Form = styled.form`
  display: grid;
  place-content: center;
`;
const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#f3b2c2",
      background: "black",
      color: "black",
      fontWeight: 500,
      fontSize: "16px",
      "::placeholder": { color: "black" },
    },
    invalid: {
      iconColor: "red",
      color: "red",
    },
  },
};
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [successfulREQ, setSUCCREQ] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      try {
        const { id } = paymentMethod;
        const api = userRequest(user.token);
        const successfulStripe = await api.post(`/checkout/${user.id}`, {
          amount: cartTotal(cart) * 100,
          paymentID: id,
          shippingData: {
            address: {
              country: country,
              city: city,
              postal_code: zip,
              line1: address,
            },
            name: user.username,
            email: user.email,
          },
        });

        if (successfulStripe) {
          const successfulOrder = await api.post(`/order/${user.id}`, {
            userToken: user.token,
            products: cart.products,
            userID: user.id,
            amount: cartTotal(cart),
          });
          if (successfulOrder) {
            setSUCCREQ(true);
          }
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log(error);
    }
  };
  const handleCountry = (e) => {
    const value = e.target.value;
    setCountry(value);
  };
  const handleCity = (e) => {
    const value = e.target.value;
    setCity(value);
  };
  const handleZip = (e) => {
    const value = e.target.value;
    setZip(value);
  };
  const handleAddress = (e) => {
    const value = e.target.value;
    setAddress(value);
  };
  return (
    <Section>
      {!successfulREQ ? (
        <div>
          <Title className="fs-700">Checkout</Title>
          <Form onSubmit={handleSubmit}>
            <InputLabel
              name="country"
              type="text"
              id="country"
              placeholder="Country"
              value={country}
              onChange={(e) => handleCountry(e)}
            />
            <InputLabel
              name="city"
              type="text"
              id="city"
              placeholder="City"
              value={city}
              onChange={(e) => handleCity(e)}
            />
            <InputLabel
              name="zipcode"
              type="text"
              id="zipcode"
              placeholder="Zip Code"
              value={zip}
              onChange={(e) => handleZip(e)}
            />
            <InputLabel
              name="address"
              type="text"
              id="address"
              placeholder="Address"
              value={address}
              onChange={(e) => handleAddress(e)}
            />
            <CardElement options={CARD_OPTIONS} />
            <BTN type="submit">PAY</BTN>
          </Form>
        </div>
      ) : (
        <div>Successful Payment Congrats!</div>
      )}
      <img src="assets/images/pexels-alena-shekhovtcova-6995902.jpg" alt=''/>
    </Section>
  );
};

export default CheckoutForm;
