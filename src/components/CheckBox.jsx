import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Box = styled.input`
  cursor: pointer;
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  &:checked {
    position: relative;
    border: none;
    &::before {
      content: url(/assets/images/correct.png);
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
`;

const CheckBox = ({
  name,
  id,
  value,
  add,
  remove,
  clear,
  setClear,
  stateTypes,
}) => {
  const [checked, setChecked] = useState(false);
  const handleChecked = (e) => {
    setChecked(!checked);
    setClear(false);
    if (!checked) {
      add(e.target.name)(e.target.value);
    } else {
      remove(e.target.name)(e.target.value);
    }
  };

  useEffect(() => {
    stateTypes.forEach((element) => {
      if (element === value) {
        setChecked(true);
      }
    });
  }, [stateTypes]);

  if (clear && checked) {
    setChecked(false);
  }
  return (
    <Box
      type="checkbox"
      name={name}
      id={id}
      value={value}
      checked={checked}
      onChange={handleChecked}
    />
  );
};

export default CheckBox;
