import React,{useEffect, useState} from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import OrderSummary from "../components/OrderSummary";
import CartProduct from "../components/CartProduct";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
const Section = styled.section`
  width: 95%;
  margin: 0 auto;
`;
const H1 = styled.h1`
  text-align: center;
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
  const [changeOrderSummary,setChangeOrderSummary] = useState(false)
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
        <H1 className="fs-800">CART</H1>
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
                    setChangeOrderSummary={setChangeOrderSummary}
                  />
                ))}
            </Products>
            <OrderSummary cart={cart} changeOrderSummary={changeOrderSummary}/>
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
