import React, { useState } from "react";
import ColorSizePriceFilters from "../components/ColorSizePriceFilters";
import styled from "styled-components";
import CategoryFilters from "../components/CategoryFilters";
import StartIcon from '@mui/icons-material/Start';
import { Button } from "../styles/GlobalStyles";
import CloseIcon from "@mui/icons-material/Close";
const Sidebar = styled.aside`
  @media (max-width: 768px) {
    position: fixed;
    left: ${(props) => (props.showFilter ? "0%" : "-100%")};
    top: 0;
    z-index: 5;
    color: white;
    background-color: rgba(0, 0, 0, 0.7);
    transition: 1s all;
    @media (max-width: 425px) {
      width: 100%;
      height: 100vh;
    }
    & > button {
      display: inline-block;
    }
  }
  & > div {
    position: relative;
    display: flex;
    justify-content: center;
    text-align: center;
    padding: 2rem 0;
  }
  & h2 {
    margin-bottom: 3rem;
  }
  & .close {
    color: white;
  }
`;
const BTN = styled(Button)`
  z-index: 5;
  position: fixed;
  top: 1.5rem;
  left: 0;
  color: black;
  background: transparent;
  display: none;
`;
const Filters = ({ productsCategoriesQuantity }) => {
  const [showFilter, setShowFilters] = useState(false);
  return (
    <Sidebar showFilter={showFilter}>
      <h2 className="fs-600">FILTERS</h2>
      <div>
        <ColorSizePriceFilters />
        <CategoryFilters
          productsCategoriesQuantity={productsCategoriesQuantity}
        />
      </div>
      {showFilter ? (
        <BTN onClick={() => setShowFilters(!showFilter)} className='close'>
          <CloseIcon fontSize="large" />
        </BTN>
      ) : (
        <BTN onClick={() => setShowFilters(!showFilter)}>
          <StartIcon fontSize="large"/>
        </BTN>
      )}
    </Sidebar>
  );
};

export default Filters;
