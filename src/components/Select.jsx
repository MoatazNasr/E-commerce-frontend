import React from "react";
import styled from "styled-components";
import CheckBox from "./CheckBox";

const List = styled.ul`
  padding: 0;
  margin: 3rem auto;
  justify-self: right;
`;
const ListItem = styled.li`
  list-style: none;
  color: rgba(0, 0, 0, 0.65);
  display: flex;
  margin: 0.3rem 0;
  gap: 0.5rem;
  font-size: 0.88rem;
  justify-content: flex-start;
  align-items: center;
  & span {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      background-color: ${(props) => props.color};
      border: ${(props) =>
        props.color === "White" ? "1px solid black" : "none"};
      border-radius: 0.3rem;
      right: -1.5rem;
      bottom: 0.55rem;
      width: 15px;
      aspect-ratio: 4/1;
    }
  }
`;
const Title = styled.h4`
  margin-bottom: 0.5rem;
`;
const Select = ({
  filtersType,
  remove,
  add,
  name,
  clear,
  setClear,
  stateTypes,

}) => {
  return (
    <List>
      <Title>{name}</Title>
      {filtersType.map((data, index) => (
        <ListItem key={index } color={ name === 'Color' ? data : null }>
          <CheckBox
            id={data}
            name={name}
            value={data}
            add={add}
            remove={remove}
            clear={clear}
            setClear={setClear}
            stateTypes={stateTypes}

          />
          <span>
            {name === "Price" && <>Up To</>} {data}{" "}
          </span>
        </ListItem>
      ))}
    </List>
  );
};

export default Select;
