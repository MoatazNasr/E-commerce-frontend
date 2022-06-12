import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { Button } from "../styles/GlobalStyles";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../utils/apiCallMethods";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../redux/cartSlice";
import {
  addProductToWishlist,
  removeProductFromWishlist,
} from "../redux/wishlistSlice";
import checkWishlist from "../utils/checkWishlist";
import { setErrorMessage } from "../redux/errorMessageSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore, { Navigation, Pagination } from "swiper";
SwiperCore.use([Navigation, Pagination]);

const Div1 = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  gap: 4rem;
  position: relative;
  & img {
    max-width: 40%;
  }
  & .swiper {
    max-width: 40%;
    & img {
      max-width: 100%;
    }
  }
`;
const BTNCart = styled(Button)`
  margin: 0;
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
const BTNWishlist = styled(Button)`
  margin-left: 2rem;
`;
const Div2 = styled.div`
  margin: 2rem 0;
`;
const Title = styled.h1``;
const Description = styled.p`
  margin: 1rem 0;
  max-width: 70ch;
`;
const Price = styled.p``;
const Color = styled(Button)`
  width: 20px;
  aspect-ratio: 1/1;
  margin: 0 0.25rem;
  position: relative;
  top: ${(props) => (props.color === "White" ? "-0.1rem" : "none")};
  background-color: ${(props) => props.color};
  border: ${(props) =>
    props.color === "White" ? "1px solid rgba(0,0,0,0.4)" : "none"};
  border-radius: 50%;
`;
const Size = styled(Button)`
  min-width: 40px;
  aspect-ratio: 1/1;
  margin: 0 0.25rem;
  border: 1px solid rgba(0, 0, 0, 1);
  border-radius: 50%;
  &:hover {
    background: black;
    color: white;
  }
  background: ${(props) => (props.clicked ? "black" : "white")};
  color: ${(props) => (props.clicked ? "white" : "black")};
`;
const MainSection = styled.section`
  & .swiper-button-next,
  .swiper-button-prev {
    position: absolute;
    color: black !important ;
  }
  & .swiper-button-next {
    right: 0.5rem;
  }
  & .swiper-button-prev {
    left: 0.5rem;
  }
`;
const Product = () => {
  const user = useSelector((state) => state.user);
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const [product, setProduct] = useState();
  const [productDetails, setProductDetails] = useState();
  const [size, setSize] = useState();
  const productID = useLocation().pathname.split("/")[2];
  const [inWishlist, setInWishlist] = useState(false);
  const handleChangeColor = (e) => {
    product.data.details.forEach((details) => {
      if (details.color === e.target.dataset.color) setProductDetails(details);
    });
  };
  const handleWishlist = () => {
    if (user.token !== "" && inWishlist === false) {
      dispatch(addProductToWishlist(product.data));
    } else if (user.token !== "" && inWishlist === true) {
      dispatch(removeProductFromWishlist(productID));
    } else dispatch(setErrorMessage("Please login to continue !!"));
  };
  const handleAddToCart = () => {
    if (user.token !== "" && size) {
      dispatch(
        addProductToCart({
          ...product.data,
          selectedColor: productDetails.color,
          selectedSize: size,
        })
      );
    } else if (user.token === "") {
      dispatch(setErrorMessage("Please login to continue !!"));
    } else {
      dispatch(setErrorMessage("Please select a size !!"));
    }
  };
  const handleSize = (btnSize) => {
    setSize(btnSize);
  };
  useEffect(async () => {
    const tempProduct = await publicRequest.get(`/product/${productID}`);
    setProduct(tempProduct);
    setProductDetails(tempProduct.data.details[0]);
  }, []);
  //TODO: need to batched
  useEffect(() => {
    if (wishlist.userID) {
      setInWishlist(checkWishlist(wishlist.products, productID));
    }
  }, [wishlist]);
  return (
    <>
      <Navbar />
      {productDetails && (
        <MainSection>
          <Div1>
            {productDetails.images.length > 1 ? (
              <Swiper
                modules={[Pagination]}
                slidesPerView={1}
                loop
                navigation={true}
                className="swiper"
              >
                {productDetails.images.map((image, index) => (
                  <SwiperSlide key={Math.random() + index}>
                    <section>
                      <img src={image} alt="product-img" />
                    </section>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <img src={productDetails.images[0]} alt="product-img" />
            )}
            <Div2>
              <Title className="fs-700">{product.data.title}</Title>
              <Description className="fs-300">{product.data.desc}</Description>
              <Price className="fs-600">${product.data.price}</Price>
              <Div2>
                {product.data.details.map((product, index) => (
                  <Color
                    key={index + Math.random()}
                    data-color={product.color}
                    color={product.color}
                    onClick={(e) => handleChangeColor(e)}
                  />
                ))}
              </Div2>
              <Div2>
                {productDetails.sizes.map((btnSize, index) => (
                  <Size
                    onClick={() => handleSize(btnSize["size"])}
                    key={index + Math.random()}
                    clicked={size === btnSize["size"]}
                  >
                    {btnSize["size"]}
                  </Size>
                ))}
              </Div2>
              <BTNCart onClick={() => handleAddToCart()}>ADD TO CART</BTNCart>
              <BTNWishlist onClick={() => handleWishlist()}>
                {inWishlist ? <FavoriteOutlinedIcon /> : <FavoriteBorderIcon />}
              </BTNWishlist>
            </Div2>
          </Div1>
        </MainSection>
      )}
      <Footer />
    </>
  );
};

export default Product;
