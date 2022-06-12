import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Button } from "../styles/GlobalStyles";
import CloseIcon from "@mui/icons-material/Close";
import Select from "./Select";
import { colors, sizes, prices } from "../data";
import {useDispatch } from 'react-redux';
import {updateFilters} from '../redux/filtersSlice';
const Rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const BTN = styled(Button)`
  margin: 2rem 1rem;
  position: relative;
  z-index: 5;
  top: 1rem;
  animation: ${(props) => (props.filterX ? Rotate : Rotate)} 0.2s;
  border-radius: 0.2rem;
  box-shadow: 0rem 0rem 0.5rem rgba(0, 0, 0, 0.7);
  color: white;
  background: black;
  &:hover {
    background: white;
  }
`;
const BTNSaveFilter = styled(BTN)`
  padding: 0.75rem 2rem;
  position: absolute;
  right: 2rem;
  top: 80%;
  margin: 0;
  animation: none;
`;
const BTNClearFilter = styled(BTNSaveFilter)`
  padding: 0.7rem;
  top: 65%;
  font-size:0.8rem;
  display: flex;
  align-items: center;
`;
const Down = keyframes`
  from {
    top:-100rem;
  }
  to {
    top:10rem;
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
  position: absolute;
  background: white;
  z-index: 1;
  left: 0;
  top: 10rem;
  height: max-content;
  width: 100%;
  display: flex;
  animation: ${(props) => (props.animation ? Down : Up)} 0.3s;
  box-shadow: 0rem 0rem 0.5rem rgba(0, 0, 0, 0.7);
`;
const Filters = () => {
  const [filter, setFilters] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [color, setColors] = useState([]);
  const [size, setSizes] = useState([]);
  const [price, setPrices] = useState([]);
  const [clear, setClear] = useState(false);
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
  const updateFiltersState= ()=>{
    dispatch(updateFilters({colorState:color,sizeState:size,priceState:price}))
    hideFilters();
  }
  useEffect(()=>{

    return ()=>{
      dispatch(updateFilters({colorState: [],sizeState:[],priceState:[]}))
    }
  },[]);
  return (
    <section>
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
                <DeleteOutlineOutlinedIcon /> CLEAR
              </BTNClearFilter>
            )}
            <BTNSaveFilter onClick={() => updateFiltersState()}>
              SEE RESULTS
            </BTNSaveFilter>
          </Div>
          <BTN filterX={filter} onClick={() => hideFilters()}>
            <CloseIcon />
          </BTN>
        </>
      ) : (
        <BTN filterX={filter} onClick={() => showFilters()}>
          <FilterListOutlinedIcon />
        </BTN>
      )}
    </section>
  );
};

export default Filters;
