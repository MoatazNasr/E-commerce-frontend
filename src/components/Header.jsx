import React from "react";
import Navbar from "./Navbar";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
const HeaderX = styled.header`
  height: max-content;
`;
const Div = styled.div`
  position: relative;
  top: 0rem;
  width: 86%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  & img {
    object-fit: cover;
    max-height: 600px;
  }
  & img:nth-of-type(2) {
    width: 100%;
  }
`;
const Header = () => {
  const location = useLocation();
  return (
    <HeaderX>
      <Navbar header={location.pathname === "/newarrivals" ? false : true} />
      {location.pathname === "/newarrivals" ? (
        <Div>
          <img src="/assets/images/istockphoto-1152188321-612x612.jpg" alt='newarrivals-header-background'/>
          <img src="/assets/images/freestocks-8hAsLeE6Fbo-unsplash.jpg" alt='newarrivals-header-background'/>
        </Div>
      ) : (
        <img src="/assets/images/pexels-dziana-hasanbekava-5480696.jpg" alt='header-background'/>
      )}
    </HeaderX>
  );
};

export default Header;
