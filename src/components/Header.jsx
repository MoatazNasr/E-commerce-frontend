import React from "react";
import Navbar from "./Navbar";
import styled from "styled-components";

const HeaderX = styled.header`
  height: max-content;
`;

const Header = () => {
  return (
    <HeaderX>
      <Navbar header={true} />
      <img src="/assets/images/pexels-dziana-hasanbekava-5480696.jpg" />
    </HeaderX>
  );
};

export default Header;
