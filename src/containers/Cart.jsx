import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { Button } from "../styles/GlobalStyles";
import AnchorLink from "../components/AnchorLink";
import OrderSummary from "../components/OrderSummary";
import CartProduct from "../components/CartProduct";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
const Section = styled.section`
  width: 90%;
  margin: 0 auto;
`;
const Title = styled.h1`
  margin: 2rem 0;
  text-align: center;
`;
const BTN = styled(Button)`
  margin: 0 3rem;
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
const Div = styled.div`
  margin: 2rem 0;
  position: relative;
  &:nth-of-type(2) {
    display: flex;
  }
`;
const Products = styled.div`
  flex: 3;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const handleSetImage = (product) => {
    let image = "";
    product.details.forEach((details) => {
      if (product.selectedColor === details.color) image = details.images[0];
    });
    return image;
  };
  return (
    <>
      <Navbar />
      <Section>
        <Div>
          <Title className="fs-700">Cart</Title>
          <AnchorLink linkTo="/shop" children={<BTN>GO TO SHOP</BTN>} />
        </Div>
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
                    quantity={product.quantity}
                    key={index}
                    imgSrc={handleSetImage(product)}
                  />
                ))}
            </Products>
            <OrderSummary cart={cart} />
          </Div>
        ) : (
          <Title className="fs-600">Your Cart Is Empty</Title>
        )}
      </Section>
      <Footer />
    </>
  );
};

export default Cart;
