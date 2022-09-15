import React from "react";
import styled from "styled-components";

const Section = styled.section`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  & div {
    text-align: center;
    & h1 {
      margin: 1rem 0;
    }
    & p {
      width: 40ch;
      margin: 0 auto;
      text-align: center;
    }
  }
  & img {
    object-fit: cover;
    object-position: center top;
    width: 57%;
    height: 628px;
  }
  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 0rem;
    & div p {
      width: 30ch;
    }
    & img {
      width: 100%;
      margin: 0 auto;
    }
  }
`;
const WhoAreWe = () => {
  return (
    <Section>
      <div>
        <h1 className="fs-800">WHO ARE WE</h1>
        <p className="fs-400">
          MAY&M is a leading women fashion brand, providing customers with
          innovative clothes to suit every occasion.
          <br />
          We pride ourselves on our unique product-range created by
          our-in-house design team and global brand partnership.
        </p>
      </div>
      <img
        src="/assets/images/mafer-benitez-AFIwJaulrsY-unsplash.jpg"
        alt="whatwedo-img"
      />
    </Section>
  );
};

export default WhoAreWe;
