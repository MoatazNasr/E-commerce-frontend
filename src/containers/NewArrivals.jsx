import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Footer from "../components/Footer";
import styled from "styled-components";
import Filters from "../components/Filters";

const Div = styled.div`
  display: grid;
  grid-template-columns: 0.75fr 3fr;
  text-align: center;
  & h2 {
    margin-top: 2rem;
  }
`;
const NewArrivals = () => {
  const [productsCategoriesQuantity, setProductsCategoriesQuantity] = useState({});
  console.log(productsCategoriesQuantity)
  return (
    <>
      <Navbar />
      <Div>
        <div>
          <h2>Filters</h2>
          <Filters productsCategoriesQuantity={productsCategoriesQuantity}/>
        </div>
        <div>
          <Products setProductsCategoriesQuantity={setProductsCategoriesQuantity} newProduct={true}/>
        </div>
      </Div>
      <Footer />
    </>
  );
};

export default NewArrivals;
