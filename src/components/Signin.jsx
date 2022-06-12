import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InputLabel from "./Input&Label";
import { Button } from "../styles/GlobalStyles";
import { useDispatch, useSelector } from "react-redux";
import { signinUser } from "../redux/userSlice";
import { getUserCart } from "../redux/cartSlice";
import { getUserWishlist } from "../redux/wishlistSlice";
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
const Form = styled.form``;
const Title = styled.h2`
  text-align: center;
`;
const Signin = ({ handleSignup, handleForgetPass }) => {
  const user = useSelector((state) => state.user);
  const [formData, setFormData] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ password: password, email: email });
  };
  useEffect(() => {
    if (formData) {
      dispatch(signinUser(formData));
    }
  }, [formData]);
  useEffect(() => {
    if (user.id !== "") {
      dispatch(getUserCart(user));
      dispatch(getUserWishlist(user));
    }
  }, [user]);
  return (
    <>
      <Title>Sign in</Title>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <InputLabel
          placeholder="Email"
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputLabel
          placeholder="Password"
          type="password"
          id="password"
          name="password"
          value={password}
          minLength={8}
          onChange={(e) => setPassword(e.target.value)}
        />
        <BTNSubmit type="submit">Sign in</BTNSubmit>
      </Form>
      <BTNREGFORG onClick={() => handleForgetPass()}>
        Forget password?
      </BTNREGFORG>
      <BTNREGFORG onClick={() => handleSignup()}>Create an account</BTNREGFORG>
    </>
  );
};

export default Signin;
