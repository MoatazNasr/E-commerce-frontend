import React from "react";
import styled from "styled-components";
const CategoryBTN = styled.button`
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
    background-color: rgba(255, 143, 156, 0.8);
    border-color: white;
    & .category-number {
      background: black;
      color: white;
    }
  }
  ${(props) => {
    if (props.isActive) {
      return `
        background-color: rgba(255, 143, 156, 1);
        border-color: white;
        &:hover{
          background-color: rgba(255, 143, 156, 1);
        }
        & .category-number {
          background: black;
          color: white;
        `;
    }
  }}
  & p {
    text-align: center;
  }
`;
const CategoryButton = ({ aCategory, addCategory, removeCategory,isActive, children }) => {
    const handleCategory = () => {
        if (isActive) {
            removeCategory(aCategory);
        } else {
            addCategory(aCategory);
        }
    }
  return (
    <>
      <CategoryBTN isActive={isActive} onClick={() => handleCategory(aCategory)}>
        {children}
      </CategoryBTN>
    </>
  );
};

export default CategoryButton;
