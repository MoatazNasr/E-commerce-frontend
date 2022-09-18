import React, { useState } from "react";
import styled from "styled-components";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useDispatch } from "react-redux";
import { setSuccessfulMessage } from "../redux/successfulMessageSlice";
const H1 = styled.h1`
  text-align: center;
  margin: 2rem 0;
`;
const Section = styled.section`
  background-color: rgba(255, 255, 255, 0.1);
  display: grid;
  place-content: center;
  text-align: center;
  color: black;
`;
const Form = styled.form`
  display: flex;
  align-items: center;
  margin: 1rem auto;
  width: max-content;
  border-bottom: 2px solid black;
`;
const Button = styled.button.attrs({ type: "submit" })`
  cursor: pointer;
  border: none;
  transition: 0.5s all;
  background: transparent;
  &:hover {
    transform: translateX(10%);
    color: hsl(353, 100%, 78%);
  }
`;
const Input = styled.input`
  border: none;
  padding: 1rem;
  text-align: center;
  &:focus {
    outline: none;
  }
  &::placeholder {
    text-align: center;
  }
`;

const Newsletter = () => {
  const [email, setEmail] = useState();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setSuccessfulMessage("Thank you for subscription"));
    setEmail("");
  }
  return (
    <>
      <Section>
        <H1 className="fs-600">Join Our Newsletter</H1>
        <p className="fs-300">
          Be the first to receive the latest news on fashion, promotions and
          more!
        </p>
        <Form
          onSubmit={(e) => handleSubmit(e)}
        >
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit">
            <ArrowRightAltIcon fontSize="large" />
          </Button>
        </Form>
      </Section>
    </>
  );
};

export default Newsletter;
