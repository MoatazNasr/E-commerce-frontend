import React from "react";
import styled from "styled-components";
import { Button } from "../styles/GlobalStyles";
import { useNavigate } from "react-router-dom";
const Product = styled.li`
  position: relative;
  list-style: none;
  width: 95%;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.04);
  padding:0.5rem 0;
  & img {
    margin: 0 auto;
  }
`;
const Div = styled.div`
  display: grid;
  margin: 0.5rem 0.75rem;
  & p:nth-of-type(1) {
    font-weight: 700;
  }
  @media (max-width: 1024px) {
    text-align: center;
  }
`;
const BTN = styled(Button)`
  width:50%;
  z-index: 5;
  margin: 0 auto ;
  border-radius: 0.2rem;
  box-shadow: 0rem 0rem 0.5rem rgba(0, 0, 0, 0.7);
  color: white;
  background: black;
  padding: 0.5rem 0;
  position:relative ;
  z-index: 1;
  &:hover {
    background: white;
  }
`;
const ProductItem = ({ product }) => {
  const navigate = useNavigate()
  return (
    <Product >
      <img src={product.details[0].images[0]} alt="product-img" />
      <Div>
        <p className="fs-400">{product.title}</p>
        <p className="fs-400">${product.price} </p>        
        <BTN onClick={()=> navigate(`/product/${product._id}`)}>VIEW MORE</BTN>
      </Div>
    </Product>
  );
};

export default ProductItem;
