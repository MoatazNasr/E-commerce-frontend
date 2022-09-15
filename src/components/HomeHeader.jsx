import React from "react";
import Navbar from "./Navbar";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import AnchorLink from "./AnchorLink";
import "swiper/css";
import "swiper/css/pagination";
import SwiperCore, { Pagination } from "swiper";
import { Button } from "../styles/GlobalStyles.js";
SwiperCore.use([Pagination]);
const HeaderX = styled.header`
  & .navbar-image {
    object-fit: cover;
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: -1;
    object-position: center center;
  }
`;
const BTN = styled(Button)`
  width: 200px;
  margin-top: 0.5rem;
  cursor: pointer;
  z-index: 5;
  border-radius: 0.2rem;
  box-shadow: 0rem 0rem 0.5rem rgba(0, 0, 0, 0.7);
  padding: 0.75rem 2rem;
  color: white;
  background-color: black;
  &:hover {
    background: white;
  }
`;
const DIV = styled.div`
  position: relative;
  top: 32.5%;
  left: 10%;
  color: white;
  &:nth-of-type(1) p:nth-of-type(1) {
    line-height: 65%;
    letter-spacing: 0.5rem;
    margin-bottom: 1.5rem;
  }
  & p span:nth-of-type(3) {
    color: hsl(353, 100%, 78%);
  }
  @media (max-width: 768px) {
    text-align: center;
    left: 0;
  }
`;
const Header = () => {
  const location = useLocation();
  return (
    <HeaderX>
      <Navbar color="white"/>
      {location.pathname === "/" && (
        <Swiper
          style={{ width: "100%", position: "relative" ,height:'100vh'}}
          modules={[Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          loop
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <img
              src="/assets/images/245219.jpg"
              alt="header-background"
              className="navbar-image"
            />
            <DIV>
              <p className="fs-700">
                <span>WE</span>
                <br /> <span>ARE</span> <br />
                <span>MAY&M</span>
              </p>
              <p className="fs-500">
                A BRAND SPECIALIZED <br /> IN WOMEN'S FASHION
              </p>
              <AnchorLink
                linkTo="/collection"
                children={<BTN>COLLECTION</BTN>}
              />
            </DIV>
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/assets/images/20504729.jpg"
              alt="header-background"
              className="navbar-image"
            />
            <DIV>
              <p className="fs-700">
                <span>WE</span>
                <br /> <span>ARE</span> <br />
                <span>MAY&M</span>
              </p>
              <p className="fs-500">
                WE GOT THE <br />
                LATEST
                <br />
                COLLECTION
              </p>
              <AnchorLink
                linkTo="/newarrivals"
                children={<BTN>NEW ARRIVALS</BTN>}
              />
            </DIV>
          </SwiperSlide>
        </Swiper>
      )}
    </HeaderX>
  );
};

export default Header;
