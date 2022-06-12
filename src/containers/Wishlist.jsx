import React from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Footer from "../components/Footer";
import WishlistProduct from "../components/WishlistProduct";
import { useSelector } from "react-redux";

const Section = styled.section``;
const Products = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 0 auto;
  row-gap: 3rem;
`;
const Title = styled.h1`
  margin: 2rem auto;
  text-align: center;
`;

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist);
  return (
    <>
      <Navbar />
      <Section>
        <Title className="fs-700">Wishlist</Title>
        {wishlist.products.length > 0 ? (
          <Products>
            {wishlist.products.map((product, index) => (
              <WishlistProduct
                id={product.productID}
                title={product.title}
                price={product.price}
                imgSrc={product.details[0].images[0]}
                key={index}
              />
            ))}
          </Products>
        ) : (
          <Title className="fs-600">Your Wishlist Is Empty</Title>
        )}
      </Section>
      <Footer />
    </>
  );
};

export default Wishlist;
