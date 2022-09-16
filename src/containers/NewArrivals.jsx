import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Footer from "../components/Footer";
import styled from "styled-components";
import Filters from "../components/Filters";

const H1 = styled.h1`
  text-align: center;
`;
const Section = styled.section`
  display: grid;
  grid-template-columns: 1fr auto;
  text-align: center;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
const NewArrivals = () => {
  const [productsCategoriesQuantity, setProductsCategoriesQuantity] = useState(
    {}
  );
  return (
    <>
      <Navbar />
      <H1 className="fs-800" style={{ textAlign: "center" }}>
        NEW ARRIVALS
      </H1>
      <Section>
        <Filters productsCategoriesQuantity={productsCategoriesQuantity} />
        <Products
          setProductsCategoriesQuantity={setProductsCategoriesQuantity}
          newProduct={true}
        />
      </Section>
      <Footer />
    </>
  );
};

export default NewArrivals;
