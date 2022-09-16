import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../styles/GlobalStyles";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateFilters } from "../redux/filtersSlice";
import CategoryButton from "./CategoryButton";
const BTN = styled(Button)`
  width: 55%;
  z-index: 5;
  margin: 0.5rem auto;
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
const SaveBTN = styled(BTN)``;
const ClearBTN = styled(BTN)`
  display: block;
  width: 100px;
`;
const categoriesArray = [
  "Dresses",
  "Coats",
  "Jackets",
  "Hoodies",
  "Trousers",
  "Footwear",
];
const CategoryFilters = ({ productsCategoriesQuantity }) => {
  const [categories, setCategories] = useState([]);
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const categoryExists = (category) => {
    return categories.includes(category);
  };
  const addACategory = (category) => {
    let tempCategories = [];
    tempCategories.push(category);
    tempCategories = tempCategories.concat(categories);
    setCategories(tempCategories);
  };
  const removeCategory = (category) => {
    let tempCategories = categories.filter((cat) => cat !== category);
    setCategories(tempCategories);
  };
  const addCategories = () => {
    dispatch(
      updateFilters({
        colorState: filters.colors,
        sizeState: filters.sizes,
        priceState: filters.prices,
        categoriesState: categories,
      })
    );
  };
  const clearCategories = () => {
    setCategories([]);
  };
  return (
    <div>
      {categoriesArray.map((aCategory, index) => (
        <CategoryButton
          addCategory={addACategory}
          removeCategory={removeCategory}
          aCategory={aCategory}
          isActive={categoryExists(aCategory)}
          key={Math.random() + index}
          children={
            <>
              <span>{aCategory.toLocaleUpperCase()}</span>
              <span className="category-number">
                {productsCategoriesQuantity[aCategory]}
              </span>
            </>
          }
        />
      ))}
      <SaveBTN onClick={() => addCategories()}>SEE RESULTS</SaveBTN>
      {categories.length > 0 && (
        <ClearBTN onClick={() => clearCategories()}>CLEAR</ClearBTN>
      )}
    </div>
  );
};

export default CategoryFilters;
