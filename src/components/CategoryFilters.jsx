import React from "react";
import styled from "styled-components";
const H2 = styled.h2`
  text-align: center;
`;
const Div1 = styled.div``;
const Div2 = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  margin: 0 4rem;
  padding: 1rem;
  border: 1px solid black;
  background: white;
  margin-top: 0.25rem;
  border-radius: 0.25rem;
  transition: 0.5s all;
  & .category-number {
    transition: 0.5s all;
    border: 1px solid rgba(0, 0, 0, 1);
    border-radius: 50%;
    min-width: 30px;
    aspect-ratio: 1/1;
    margin: 0 0.25rem;
    background: black;
    color: white;
  }
  &:hover {
    /* background-color: hsl(353, 100%, 78%); */
    border-color: hsl(353, 100%, 78%);
    & .category-number {
      background: white;
      color: black ;
      border-color: hsl(353, 100%, 78%);
    }
  }
  & p {
    text-align: center;
  }
`;

const CategoryFilters = () => {
  return (
    <>
      <Div1>
        <Div2>
          <p>Dresses</p> <p className="category-number">5</p>
        </Div2>
        <Div2>
          {" "}
          <p>Coats</p> <p className="category-number">5</p>
        </Div2>
        <Div2>
          {" "}
          <p>Jackets</p> <p className="category-number">5</p>
        </Div2>
        <Div2>
          {" "}
          <p>Sweaters</p> <p className="category-number">5</p>
        </Div2>
        <Div2>
          {" "}
          <p>Trousers</p> <p className="category-number">5</p>
        </Div2>
        <Div2>
          {" "}
          <p>Footwear</p> <p className="category-number">5</p>
        </Div2>
      </Div1>
    </>
  );
};

export default CategoryFilters;
