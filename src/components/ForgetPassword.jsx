import React from "react";
import styled from "styled-components";
import InputLabel from "../components/Input&Label";
import { Button } from "../styles/GlobalStyles";

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
const Forgetpassword = ({ handleSignin }) => {
  return (
    <>
      <Title>Forget password</Title>
      <Form>
        <InputLabel placeholder="Email" type="email" name="email" id="email" />
        <BTNSubmit type="submit">Send!!</BTNSubmit>
      </Form>
      <BTNREGFORG onClick={()=>handleSignin()}>Sign in</BTNREGFORG>

    </>
  );
};

export default Forgetpassword;
