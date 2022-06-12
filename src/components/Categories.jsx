import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore, { Navigation, Pagination } from "swiper";
SwiperCore.use([Navigation, Pagination]);

const Img = styled.img`
  height: 750px;
  width: 500px;
  object-fit: cover;
`;
const H1 = styled.h1`
  text-align: center;
  margin: 2rem 0;
`;
const Section = styled.section`
  position: relative;
  margin: 0;
  color: white;
  display: grid;
  place-content: center;
  text-align: center;
  transition: 0.8s all;
  & p {
    background: black;
  }
  &:hover {
    transform: scale(110%);
  }
`;
const MainSection = styled.section`
  & .swiper-button-next,
  .swiper-button-prev {
    background-color: black;
    position: absolute;
    padding: 2rem;
    color: #fff !important ;
  }
  & .swiper-button-next {
    right: 3.7rem;
  }
  & .swiper-button-prev {
    left: 3.7rem;
  }
`;
const Categories = () => {
  return (
    <MainSection className="categories">
      <H1 className="fs-800">CATEGORIES</H1>
      <Swiper
        style={{ width: "1300px", marginInline: "auto" }}
        modules={[Pagination]}
        spaceBetween={-40}
        slidesPerView={2}
        loop
        navigation={true}
      >
        <SwiperSlide>
          <Section>
            <Img
              src="/assets/images/pexels-cottonbro-7494681.jpg"
              alt="slider1-img"
            />
            <p className="fs-700">JACKETS</p>
          </Section>
        </SwiperSlide>
        <SwiperSlide>
          <Section>
            <Img
              src="/assets/images/mafer-benitez-AFIwJaulrsY-unsplash.jpg"
              alt="slider2-img"
            />
            <p className="fs-700">SWEATERS</p>
          </Section>
        </SwiperSlide>
        <SwiperSlide>
          <Section>
            <Img
              src="/assets/images/pexels-photo-5886041.jpeg"
              alt="slider3-img"
            />
            <p className="fs-700">SHIRTS</p>
          </Section>
        </SwiperSlide>
        <SwiperSlide>
          <Section>
            <Img
              src="/assets/images/2017-New-Fashion-Winter-Coats-Women-Europe-Long-font-b-Jacket-b-font-font-b-Green.webp"
              alt="slider4-img"
            />
            <p className="fs-700">COATS</p>
          </Section>
        </SwiperSlide>

        <SwiperSlide>
          <Section>
            <Img
              src="/assets/images/pac-portrait-2022-06-07t134213767.jpg"
              alt="slider4-img"
            />
            <p className="fs-700">DRESSES</p>
          </Section>
        </SwiperSlide>
      </Swiper>
    </MainSection>
  );
};

export default Categories;
