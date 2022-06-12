import React from "react";
import styled from "styled-components";

const Div = stlyed.div`
position: absolute;
right: ${(props) => (props.appear ? "0%" : "-50%")};
background: white;
padding: 5rem 6rem;
border-radius: 0.2rem;
box-shadow: 0rem 0rem 0.5rem rgba(0, 0, 0, 0.7);
z-index: 1;
transition: 1s all;
display: grid;
place-content: center;
`;

const Popup = ({status}) => {
  return (
    <Div>
      <p></p>
    </Div>
  );
};

export default Popup;
