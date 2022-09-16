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
  border-radius: 0.2rem;
  padding: 0.5rem 0;
  & img {
    margin: 0 auto;
  }
  ${(props) => {
    if (props.feature === "sale") {
      return `
         &::before{
            content: "SALE";
            padding: 0.25rem;
            position:absolute;
            color: white;
            border-radius: 0.2rem;
            top:0;
            right: 0rem;
            background-color: hsl(353, 100%, 78%);
         } 
        `;
    } else if (props.feature === "new") {
      return `
         &::before{
            content: "NEW";
            padding: 0.25rem;
            position:absolute;
            color: white;
            border-radius: 0.2rem;
            top:0;
            right: 0rem;
            background-color: hsl(353, 100%, 78%);
         } 
        `;
    }
  }}
`;
const Div = styled.div`
  display: grid;
  margin: 0.5rem 0.75rem;
  & p:nth-of-type(1) {
    font-weight: 700;
  }
  & .price-after-sale {
    color: #649d66;
    margin-left: 1.5rem;
  }
  & .price-before-sale {
    color: rgba(0, 0, 0, 0.5);
    position: relative;
    &::before {
      content: "";
      width: 100%;
      position: absolute;
      top: 0.75rem;
      border-bottom:2px solid black ;
    }
  }
  @media (max-width: 1024px) {
    text-align: center;
  }
`;
const BTN = styled(Button)`
  width: 50%;
  z-index: 5;
  margin: 0 auto;
  border-radius: 0.2rem;
  box-shadow: 0rem 0rem 0.5rem rgba(0, 0, 0, 0.7);
  color: white;
  background: black;
  padding: 0.5rem 0;
  position: relative;
  z-index: 1;
  &:hover {
    background: white;
  }
`;
const ProductItem = ({ product }) => {
  const navigate = useNavigate();
  return (
    <Product feature={product.feature}>
      <img src={product.details[0].images[0]} alt="product-img" />
      <Div>
        <p className="fs-400">{product.title}</p>
        <p className="fs-400">
          {product.feature === "sale" ? (
            <>
              <span className="price-before-sale">${product.price}</span>
              <span className="price-after-sale">
                ${product.price - product.price * 0.4}
              </span>
            </>
          ) : (
            <>${product.price}</>
          )}{" "}
        </p>
        <BTN onClick={() => navigate(`/product/${product._id}`)}>VIEW MORE</BTN>
      </Div>
    </Product>
  );
};

export default ProductItem;
