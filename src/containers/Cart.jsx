import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import CartSummary from "../components/CartSummary";
import CartProduct from "../components/CartProduct";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCartAsync } from "../redux/cartSlice";
import { Button } from "../styles/GlobalStyles";

const Main = styled.main`
  width: 95%;
  margin: 0 auto;
`;
const H1 = styled.h1`
  text-align: center;
`;
const BTN = styled(Button)`
  margin-left: 2rem;
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
const Title = styled.h2`
  margin: 2rem 0;
  text-align: center;
`;
const Div = styled.div`
  margin: 2rem 0;
  position: relative;
  display: flex;
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;
const Products = styled.div`
  flex: 3;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [changeCartSummary, setChangeCartSummary] = useState(0);
  const handleSetImage = (product) => {
    let image = "";
    product.details.forEach((details) => {
      if (product.selectedColor === details.color) image = details.images[0];
    });
    return image;
  };
  const clearCart = () => {
    dispatch(clearCartAsync());
  };
  useEffect(() => {
    if (user.token === "") {
      navigate(-1);
    }
  });
  return (
    <>
      <Navbar />
      <Main>
        <H1 className="fs-800">CART</H1>
        {cart.products.length > 0 && (
          <BTN onClick={() => clearCart()}>CLEAR CART</BTN>
        )}
        {cart.products.length > 0 ? (
          <Div>
            <Products>
              {cart.products.length > 0 &&
                cart.products.map((product, index) => (
                  <CartProduct
                    cart={cart}
                    id={product.productID}
                    title={product.title}
                    price={product.price}
                    size={product.selectedSize}
                    color={product.selectedColor}
                    key={index}
                    imgSrc={handleSetImage(product)}
                    setChangeCartSummary={setChangeCartSummary}
                  />
                ))}
            </Products>
            <CartSummary cart={cart} changeCartSummary={changeCartSummary} />
          </Div>
        ) : (
          <Title className="fs-600">Your Cart Is Empty</Title>
        )}
      </Main>
      <Footer />
    </>
  );
};

export default Cart;
