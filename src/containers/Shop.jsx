import React,{useState} from "react";
import ColorSizePriceFilters from "../components/ColorSizePriceFilters";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Footer from "../components/Footer";
import CategoryFilters from "../components/CategoryFilters";
import styled from "styled-components";
const Div = styled.div`
  display: grid;
  grid-template-columns: 0.75fr 3fr;
  text-align:center ;
  & h2{
    margin-top:2rem ;
  }
`;
const Shop = () => {
  const [productsCategoriesQuantity,setProductsCategoriesQuantity] = useState({})
  return (
    <>
      <Navbar />
      <Div>
        <div>
        <h2>Filters</h2>
          <ColorSizePriceFilters />
          <CategoryFilters />
        </div>
        <div>
          <Products />
        </div>
      </Div>
      <Footer />
    </>
  );
};

export default Shop;
