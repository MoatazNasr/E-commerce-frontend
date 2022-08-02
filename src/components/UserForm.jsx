import React, { useState } from "react";
import styled from "styled-components";
import Signup from "./Signup";
import Signin from "./Signin";
import ForgetPassword from "./ForgetPassword";

const Section = styled.section`
  position: relative;
`;
const Div = styled.div`
  position: fixed;
  top:175px;
  right: ${(props) => (props.appear ? "0%" : "-100%")};
  background: white;
  padding: 5rem;
  border-radius: 0.2rem;
  box-shadow: 0rem 0rem 0.5rem rgba(0, 0, 0, 0.7);
  z-index: 1;
  transition: 1s all;
  display: grid;
  place-content: center;
`;

const UserForm = ({ appear }) => {
  const [signup, setSignup] = useState(false);
  const [signin, setSignin] = useState(true);
  const [forgetPass, setForgetPass] = useState(false);
  const handleSignup = () => {
    setSignup(true);
    setSignin(false);
    setForgetPass(false);
  };
  const handleSignin = () => {
    setSignin(true);
    setSignup(false);
    setForgetPass(false);
  };
  const handleForgetPass = () => {
    setSignin(false);
    setSignup(false);
    setForgetPass(true);
  };

  return (
    <Section>
      <Div appear={appear}>
        {signin && !signup && !forgetPass ? (
          <>
           <Signin handleForgetPass={handleForgetPass} handleSignup={handleSignup}/>
          </>
        ) : !forgetPass && signup && !signin ? (
          <Signup handleSignin={handleSignin} />
        ) : (
          <ForgetPassword handleSignin={handleSignin} />
        )}
      </Div>
    </Section>
  );
};

export default UserForm;
