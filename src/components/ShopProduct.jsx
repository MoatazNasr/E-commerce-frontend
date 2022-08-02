import React from "react";
import styled from "styled-components";
import AnchorLink from "./AnchorLink";
const Product = styled.li`
  position: relative;
  list-style: none;
  width: 85%;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.04);
  & img {
    margin: 0 auto;
  }
  &::before {
    ${(props) => {
      if (props.new)
        return `
    position:absolute ;
    right:0rem;
    padding:1rem ;
    background-color:#fae0e1 ;
    content: "New";`;
    }};
  }
`;
const Div = styled.div`
  display: flex;
  margin: 0.5rem 0.75rem;
  justify-content: space-between;
  & p span:nth-of-type(2) {
    font-weight: 700;
  }
`;
const ProductItem = ({ product }) => {
  return (
    <Product new={product.new}>
      <AnchorLink
        linkTo={`/product/${product._id}`}
        passedClassName="nav-link"
        children={<img src={product.details[0].images[0]} alt="product-img" />}
      />
      <Div>
        <p className="fs-400">
          <span>{product.title}</span>
          <br /> <span>${product.price}</span>
        </p>
      </Div>
    </Product>
  );
};

export default ProductItem;
