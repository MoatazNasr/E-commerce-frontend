import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InputLabel from "../components/Input&Label";
import { Button } from "../styles/GlobalStyles";
import { publicRequest } from "../utils/apiCallMethods.js";
import { createUserCart } from "../redux/cartSlice";
import { createUserWishlist } from "../redux/wishlistSlice";
import { useDispatch } from "react-redux";
import { setSuccessfulMessage } from "../redux/successfulMessageSlice";
import { setErrorMessage } from "../redux/errorMessageSlice";
const BTNSubmit = styled(Button)`
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
const BTNREGFORG = styled(Button)`
  margin-top: 1rem;
`;
const Title = styled.h2`
  text-align: center;
`;
const Signup = ({ handleSignin }) => {
  const [formData, setFormData] = useState();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ password: password, email: email, username: username ,phoneNumber });
  };
  useEffect(() => {
    if (formData) {
      publicRequest
        .post("/user/register", {
          ...formData,
        })
        .then((res) => {
          if (res.status === 201) {
            handleSignin();
            dispatch(createUserCart(res.data));
            dispatch(createUserWishlist(res.data));
            dispatch(setSuccessfulMessage("Successfuly registered !!"));
          }
        })
        .catch((err) => {
          dispatch(setErrorMessage("User already exists !!"));
        });
    }
  }, [formData]);
  return (
    <>
      <Title>Sign up</Title>
      <form onSubmit={(e) => handleSubmit(e)}>
        <InputLabel
          placeholder="Email"
          type="email"
          name="email"
          id="email"
          value={email}
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputLabel
          placeholder="Username"
          type="username"
          id="username"
          name="username"
          value={username}
          required={true}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputLabel
          placeholder="Phone Number"
          type="text"
          id="phonenumber"
          name="phonenumber"
          value={phoneNumber}
          required={true}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <InputLabel
          placeholder="Password"
          type="password"
          id="password"
          name="password"
          value={password}
          minLength={8}
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        <BTNSubmit type="submit">Sign up</BTNSubmit>
      </form>
      <BTNREGFORG onClick={() => handleSignin()}>Sign in</BTNREGFORG>
    </>
  );
};

export default Signup;
