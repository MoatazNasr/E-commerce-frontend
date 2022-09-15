import React from "react";
import styled from "styled-components";
import { Button } from "../styles/GlobalStyles";
const Div1 = styled.div``;
const CategoryButton = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  margin: 0 4rem;
  width: 56%;
  padding: 1rem;
  border: 1px solid black;
  background: white;
  margin-top: 0.25rem;
  border-radius: 0.25rem;
  transition: 0.5s all;
  & .category-number {
    transition: 0.5s all;
    border-radius: 50%;
    min-width: 30px;
    aspect-ratio: 1/1;
    margin: 0 0.25rem;
    background: rgba(220, 220, 220, 0.7);
    color: black;
  }
  &:hover {
    background-color: rgba(255, 143, 156, 0.5);
    border-color: hsl(353, 100%, 78%);
    & .category-number {
      background: black;
      color: white;
    }
  }
  & p {
    text-align: center;
  }
`;
const BTN = styled(Button)`
  width: 55%;
  z-index: 5;
  margin: 0.25rem auto;
  border-radius: 0.2rem;
  box-shadow: 0rem 0rem 0.5rem rgba(0, 0, 0, 0.7);
  color: white;
  background: black;
  padding: 0.5rem 0;
  position: relative;
  &:hover {
    background: white;
  }
`;
const CategoryFilters = ({ productsCategoriesQuantity }) => {
  return (
    <>
      <Div1>
        <CategoryButton>
          <span>DRESSES</span>{" "}
          <span className="category-number">
            {productsCategoriesQuantity.Dresses}
          </span>
        </CategoryButton>
        <CategoryButton>
          {" "}
          <span>COATS</span>{" "}
          <span className="category-number">
            {productsCategoriesQuantity.Coats}
          </span>
        </CategoryButton>
        <CategoryButton>
          {" "}
          <span>JACKETS</span>{" "}
          <span className="category-number">
            {productsCategoriesQuantity.Jackets}
          </span>
        </CategoryButton>
        <CategoryButton>
          {" "}
          <span>HOODIES</span>{" "}
          <span className="category-number">
            {productsCategoriesQuantity.Hoodies}
          </span>
        </CategoryButton>
        <CategoryButton>
          {" "}
          <span>TROUSERS</span>{" "}
          <span className="category-number">
            {productsCategoriesQuantity.Trousers}
          </span>
        </CategoryButton>
        <CategoryButton>
          {" "}
          <span>FOOTWEAR</span>{" "}
          <span className="category-number">
            {productsCategoriesQuantity.Footwear}
          </span>
        </CategoryButton>
        <BTN>SEE RESULTS</BTN>
      </Div1>
    </>
  );
};

export default CategoryFilters;
