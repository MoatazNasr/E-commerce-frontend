import React from "react";
import styled from "styled-components";
import AnchorLink from "./AnchorLink";
const Product = styled.li`
  position: relative;
  list-style: none;
  width: 70%;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.04);
  & img {
    margin: 0 auto;
  }
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0.75rem;
  justify-content: space-between;
  text-align: center;
  & p span:nth-of-type(2) {
    font-weight: 700;
    margin: 0 auto;
  }
  & a {
    color: black;
  }
  & img {
    margin-bottom:1rem;
  }
`;
const WishlistProduct = ({ title, price, imgSrc, id }) => {
  return (
    <Product>
      <Details>
        <img src={imgSrc} alt="" />
        <p className="fs-500">
          <span>{title}</span>
          <br /> <span>${price}</span>
        </p>
        <AnchorLink
          linkTo={`/product/${id}`}
          passedClassName="nav-link"
          children={
            <img
              src="../../assets/icons/navigate-outline.svg"
              className="icons"
              alt='navigate-icon'
            />
          }
        />{" "}
      </Details>
    </Product>
  );
};

export default WishlistProduct;
