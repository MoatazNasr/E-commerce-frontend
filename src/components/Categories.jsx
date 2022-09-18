import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { updateCollectionFilters } from "../redux/filtersSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SwiperCore, { Navigation, Pagination } from "swiper";
SwiperCore.use([Navigation, Pagination]);
const MainSection = styled.section`
  @media (max-width: 425px) {
    & .cat-swiper {
      max-width: 100%;
    }
    & img {
      width: 100%;
      height: 425px;
    }
    & h1 {
      font-size: 3.25rem;
    }
  }
  & .swiper-button-next,
  .swiper-button-prev {
    background-color: black;
    position: absolute;
    padding: 2rem;
    color: #fff;
    transition: 0.5s all;
    @media (max-width: 425px) {
      padding: 1.5rem;
    }
  }
  & .swiper-button-next {
    right: 0;
    &:hover {
      background-color: white;
      color: hsl(353, 100%, 78%);
    }
  }
  & .swiper-button-prev {
    left: 0;
    &:hover {
      background-color: white;
      color: hsl(353, 100%, 78%);
    }
  }
`;
const Img = styled.img`
  height: 625px;
  width: 500px;
  object-fit: cover;
  border-radius: 1rem 1rem 0 0;
`;
const H1 = styled.h1`
  text-align: center;
  margin: 2rem 0;
`;
const Div = styled.div`
  position: relative;
  cursor: pointer;
  margin: 0;
  color: white;
  display: grid;
  place-content: center;
  text-align: center;
  transition: 0.5s all;
  & p {
    background: black;
    border-radius: 0rem 0rem 1rem 1rem;
  }
  &:hover {
    transform: scale(105%);
  }
`;
const Categories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChooseCategory = (category) => {
    dispatch(
      updateCollectionFilters({
        colorState: [],
        sizeState: [],
        priceState: [],
        categoriesState: [category],
      })
    );
    navigate("/collection");
    window.scrollTo(0,0);
  };
  return (
    <MainSection className="categories">
      <H1 className="fs-800">CATEGORIES</H1>
      <Swiper
        className="cat-swiper"
        style={{ maxWidth: "90%" }}
        modules={[Pagination]}
        loop
        navigation={true}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        }}
      >
        <SwiperSlide>
          <Div onClick={() => handleChooseCategory("Jackets")}>
            <Img
              src="/assets/images/emeline-light-down-puffer-jacket.jpg"
              alt="slider1-img"
            />
            <p className="fs-700">JACKETS</p>
          </Div>
        </SwiperSlide>
        <SwiperSlide>
          <Div onClick={() => handleChooseCategory("Hoodies")}>
            <Img src="/assets/images/WM034W-5-2.jpg" alt="slider2-img" />
            <p className="fs-700">HOODIES</p>
          </Div>
        </SwiperSlide>
        <SwiperSlide>
          <Div onClick={() => handleChooseCategory("Trousers")}>
            <Img
              src="/assets/images/Bestselling-Pants-Favorite-Daughter-Favorite-Pant.webp"
              alt="slider3-img"
            />
            <p className="fs-700">TROUSERS</p>
          </Div>
        </SwiperSlide>
        <SwiperSlide>
          <Div onClick={() => handleChooseCategory("Coats")}>
            <Img
              src="/assets/images/23816cc5-e6b8-470e-8ec2-31c7e45b063e1648012987995-MANGO-Women-Coats-7271648012987219-1.jpg"
              alt="slider4-img"
            />
            <p className="fs-700">COATS</p>
          </Div>
        </SwiperSlide>
        <SwiperSlide>
          <Div onClick={() => handleChooseCategory("Dresses")}>
            <Img src="/assets/images/b1.jpg" alt="slider4-img" />
            <p className="fs-700">DRESSES</p>
          </Div>
        </SwiperSlide>
        <SwiperSlide>
          <Div onClick={() => handleChooseCategory("Footwear")}>
            <Img src="/assets/images/b4.jpg" alt="slider4-img" />
            <p className="fs-700">FOOTWEAR</p>
          </Div>
        </SwiperSlide>
      </Swiper>
    </MainSection>
  );
};

export default Categories;
