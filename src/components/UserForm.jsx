import React, { useState } from "react";
import styled from "styled-components";
import Signup from "./Signup";
import Signin from "./Signin";

const Section = styled.section`
  position: relative;
`;
const Div = styled.div`
  position: fixed;
  top:175px;
  right: ${(props) => (props.appear ? "0.03%" : "-100%")};
  background: white;
  padding: 4rem;
  border-radius: 0.5rem;
  box-shadow: 0rem 0rem 0.5rem rgba(0, 0, 0, 0.7);
  z-index: 6;
  transition: 1s all;
  display: grid;
  place-content: center;
`;

const UserForm = ({ appear }) => {
  const [signup, setSignup] = useState(false);
  const [signin, setSignin] = useState(true);
  const handleSignup = () => {
    setSignup(true);
    setSignin(false);
  };
  const handleSignin = () => {
    setSignin(true);
    setSignup(false);
  };

  return (
    <Section>
      <Div appear={appear}>
        {signin && !signup  ? (
           <Signin handleSignup={handleSignup}/>
        ) :  signup && !signin && (
          <Signup handleSignin={handleSignin} />
        )}
      </Div>
    </Section>
  );
};

export default UserForm;
