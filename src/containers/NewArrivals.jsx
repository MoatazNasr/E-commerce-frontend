import React, {useState } from "react";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Footer from "../components/Footer";
import styled from "styled-components";
import Filters from "../components/Filters";
const H1 = styled.h1`
  text-align: center;
`;
const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr 4fr;
  text-align: center;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  & h2 {
    
  }
`;
const NewArrivals = () => {
  const [productsCategoriesQuantity, setProductsCategoriesQuantity] = useState(
    {}
  );
  return (
    <>
      <Navbar />
      <H1 className="fs-800">
        NEW ARRIVALS
      </H1>
      <Main>
        <Filters productsCategoriesQuantity={productsCategoriesQuantity} />
        <Products
          setProductsCategoriesQuantity={setProductsCategoriesQuantity}
          newProduct={true}
        />
      </Main>
      <Footer />
    </>
  );
};

export default NewArrivals;
