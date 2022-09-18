import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../styles/GlobalStyles";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  updateCollectionFilters,
  updateNewArrivalsFilters,
} from "../redux/filtersSlice";
import CategoryButton from "./CategoryButton";
import { useLocation } from "react-router-dom";
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
const SEEBTN = styled(BTN)``;
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
  const { collectionFilters, newArrivalsFilters } = useSelector(
    (state) => state.filters
  );
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();
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
  const handleSeeCategories = () => {
    if (location.pathname === "/collection") {
      dispatch(
        updateCollectionFilters({
          colorState: collectionFilters.colors,
          sizeState: collectionFilters.sizes,
          priceState: collectionFilters.prices,
          categoriesState: [...categories],
        })
      );
    }
    else {
      dispatch(
        updateNewArrivalsFilters({
          colorState: newArrivalsFilters.colors,
          sizeState: newArrivalsFilters.sizes,
          priceState: newArrivalsFilters.prices,
          categoriesState: [...categories],
        })
      );
    }
  };
  const clearCategories = () => {
    setCategories([]);
    if (location.pathname === "/collection") {
      dispatch(
        updateCollectionFilters({
          colorState: collectionFilters.colors,
          sizeState: collectionFilters.sizes,
          priceState: collectionFilters.prices,
          categoriesState: [],
        })
      );
    }
    else {
      dispatch(
        updateNewArrivalsFilters({
          colorState: newArrivalsFilters.colors,
          sizeState: newArrivalsFilters.sizes,
          priceState: newArrivalsFilters.prices,
          categoriesState: [],
        })
      );
    }
  };
  useEffect(() => {
    if (location.pathname === "/collection") {
      setCategories(collectionFilters.categories);
    } else {
      setCategories(newArrivalsFilters.categories);
    }
  }, [collectionFilters.categories, newArrivalsFilters.categories, location.pathname]);
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
      <SEEBTN onClick={() => handleSeeCategories()}>SEE RESULTS</SEEBTN>
      {categories.length > 0 && (
        <ClearBTN onClick={() => clearCategories()}>CLEAR</ClearBTN>
      )}
    </div>
  );
};

export default CategoryFilters;
