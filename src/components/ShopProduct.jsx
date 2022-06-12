import React from "react";
import styled from "styled-components";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AnchorLink from "./AnchorLink";
import { Button } from "../styles/GlobalStyles";
const Product = styled.li`
  position: relative;
  list-style: none;
  width: 85%;
  margin: 0 auto;
  background: rgba(0,0,0,0.04);
  & img {
    margin: 0 auto;
  }
`;
const Div = styled.div`
  display: flex;
  margin:0.5rem 0.75rem;
  justify-content: space-between;
  & p span:nth-of-type(2) {
    font-weight: 700;
  }
`;
const ProductItem = ({product}) => {
  
  return (
    <Product>
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
