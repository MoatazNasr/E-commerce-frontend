import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import { Button } from "../styles/GlobalStyles";
import CloseIcon from "@mui/icons-material/Close";
import Select from "./Select";
import { colors, sizes, prices } from "../data";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateFilters } from "../redux/filtersSlice";
const Rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const BTN = styled(Button)`
  margin: 1rem 1rem 2rem 0;
  position: absolute;
  top: -4rem;
  z-index: 6;
  animation: ${(props) => (props.filterX ? Rotate : Rotate)} 0.2s;
  border-radius: 0.2rem;
  box-shadow: 0rem 0rem 0.5rem rgba(0, 0, 0, 0.5);
  color: white;
  background: black;
  &:hover {
    background: white;
  }
`;
const CloseBTN = styled(BTN)`
  position: fixed;
  top: 2rem;
  left: 2rem;
  @media (max-width: 768px) {
    top: 0.75rem;
    left: 0.5rem;
  }
`;
const BTNSaveFilter = styled(BTN)`
  padding: 0.5rem 0;
  position: absolute;
  width: 153.5px;
  right: 2rem;
  top: 75%;
  margin: 0;
  animation: none;
`;
const BTNClearFilter = styled(BTNSaveFilter)`
  width: 100px;
  padding: 0.5rem 0;
  top: 87%;
  text-align: center;
`;
const Down = keyframes`
  from {
    top:-100rem;
  }
  to {
    top:0rem;
  }
`;
const Up = keyframes`
  from {
    top:0rem;
  }
  to {
    top:-100rem;
  }
`;
const Div = styled.div`
  position: fixed;
  background: white;
  z-index: 6;
  left: 0;
  top: 0rem;
  height: max-content;
  width: 100%;
  display: flex;
  animation: ${(props) => (props.animation ? Down : Up)} 0.3s;
  @media (max-width: 768px) {
    padding: 2rem 0;
    height: 100vh;
  }
`;
const ColorSizePriceFilters = () => {
  const filters = useSelector((state) => state.filters);
  const [filter, setFilters] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [color, setColors] = useState([]);
  const [size, setSizes] = useState([]);
  const [price, setPrices] = useState([]);
  const [clear, setClear] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const showFilters = () => {
    setTimeout(() => setFilters(true), 250);
    setAnimation(true);
  };
  const hideFilters = () => {
    setTimeout(() => setAnimation(false), 200);
    setTimeout(() => setFilters(false), 250);
  };
  const clearFilters = () => {
    setColors([]);
    setPrices([]);
    setSizes([]);
    setClear(true);
  };
  const add = (state) => {
    const [arr, methodName] =
      state === "Color"
        ? [color, setColors]
        : state === "Size"
        ? [size, setSizes]
        : [price, setPrices];

    return (value) => {
      methodName(arr.concat(value));
    };
  };
  const remove = (state) => {
    const [arr, methodName] =
      state === "Color"
        ? [color, setColors]
        : state === "Size"
        ? [size, setSizes]
        : [price, setPrices];
    return (value) => {
      methodName(arr.filter((arrValue) => arrValue !== value));
    };
  };
  const updateFiltersState = () => {
    dispatch(
      updateFilters({
        colorState: color,
        sizeState: size,
        priceState: price,
        categoriesState: filters.categories,
      })
    );
    hideFilters();
  };
  useEffect(() => {
    return () => {
      dispatch(
        updateFilters({
          colorState: [],
          sizeState: [],
          priceState: [],
          categoriesState: filters.categories,
        })
      );
    };
  }, []);
  useEffect(() => {
    const resizeFunction = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeFunction);
    return () => {
      window.removeEventListener("resize", resizeFunction);
    };
  },[]);
  return (
    <>
      {filter ? (
        <>
          <Div animation={animation}>
            <Select
              filtersType={colors}
              add={add}
              remove={remove}
              name="Color"
              clear={clear}
              setClear={setClear}
              stateTypes={color}
            />
            <Select
              filtersType={sizes}
              add={add}
              remove={remove}
              name="Size"
              clear={clear}
              setClear={setClear}
              stateTypes={size}
            />
            <Select
              filtersType={prices}
              add={add}
              remove={remove}
              name="Price"
              clear={clear}
              setClear={setClear}
              stateTypes={price}
            />
            {(color.length > 0 || price.length > 0 || size.length > 0) && (
              <BTNClearFilter onClick={() => clearFilters()}>
                CLEAR
              </BTNClearFilter>
            )}
            <BTNSaveFilter onClick={() => updateFiltersState()}>
              SEE RESULTS
            </BTNSaveFilter>
          </Div>
          <CloseBTN filterX={filter} onClick={() => hideFilters()}>
            <CloseIcon />
          </CloseBTN>
        </>
      ) : (
        <>
          <BTN filterX={filter} onClick={() => showFilters()}>
            <FilterListOutlinedIcon />
          </BTN>
        </>
      )}
    </>
  );
};

export default ColorSizePriceFilters;
