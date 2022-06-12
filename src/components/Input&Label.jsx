import React from "react";
import styled from "styled-components";

const Input = styled.input`
  display: block;
  border: none;
  border-bottom: 1px solid black;
  padding: 0.5rem;
  margin: 0 0 1.5rem 0;
  &:focus {
    outline: none;
  }
`;
const Label = styled.label`
  font-weight: 700;
  display: ${(props) => (props.label ? "block" : "none")};
`;

const InputLabel = ({
  name,
  id,
  value,
  onChange,
  type,
  placeholder,
  label,
  labelText,
  labelFor,
}) => {
  return (
    <>
      <Label label={label} htmlFor={labelFor}>
        {labelText}hey
      </Label>
      <Input
        name={name}
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required
      />
    </>
  );
};

export default InputLabel;
