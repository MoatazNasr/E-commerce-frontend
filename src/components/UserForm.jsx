import React, { useState } from "react";
import styled from "styled-components";
import Signup from "./Signup";
import Signin from "./Signin";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "../styles/GlobalStyles";
const Aside = styled.aside`
  position: relative;
`;
const Div = styled.div`
  position: fixed;
  top: 175px;
  right: ${(props) => (props.appear ? "0.03%" : "-120%")};
  background: white;
  padding: 4rem;
  border-radius: 0.5rem;
  box-shadow: 0rem 0rem 0.5rem rgba(0, 0, 0, 0.7);
  z-index: 11;
  transition: 1s all;
  display: grid;
  place-content: center;
`;
const BTN = styled(Button)`
  padding: 0;
  position: absolute;
  right: 1rem;
  top: 1rem;
  & svg {
    font-size: 2rem;
  }
`;
const UserForm = ({ appear ,setAppear}) => {
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
    <Aside>
      <Div appear={appear}>
      <BTN onClick={ ()=> setAppear(false)}><CloseIcon/></BTN>
        {signin && !signup  ? (
           <Signin handleSignup={handleSignup}/>
        ) :  signup && !signin && (
          <Signup handleSignin={handleSignin} />
        )}
      </Div>
    </Aside>
  );
};

export default UserForm;
