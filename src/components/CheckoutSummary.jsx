import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
const Section = styled.section`
  margin: 4rem;
  @media (max-width: 768px) {
    margin: 4rem 0;
    & > div > div > p {
      margin-left: 0.25rem;
    }
  }
  & > div:nth-of-type(2) {
    text-align: center;
    margin-top: 2rem;
  }
  & .price {
    font-weight: bold;
  }
`;
const Div2 = styled.div`
  & img {
    width: 150px;
    height: 150px;
    margin-bottom: 1rem;
  }
  & > div {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  & > div > div {
    display: flex;
    align-items: center;
    & p {
      margin-left: 1rem;
    }
  }
`;
const CheckoutSummary = () => {
  const { products } = useSelector((state) => state.cart);
  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  let localStorageProducts = JSON.parse(
    window.localStorage.getItem("cartProducts")
  );
  const handleSetImage = (product) => {
    let image = "";
    product.details.forEach((details) => {
      if (product.selectedColor === details.color) image = details.images[0];
    });
    return image;
  };
  const handleSetQuantity = (product) => {
    let quantity = 1;
    localStorageProducts.forEach((LSProduct) => {
      if (
        LSProduct.productID === product._id &&
        LSProduct.selectedColor === product.selectedColor &&
        LSProduct.selectedSize === product.selectedSize
      ) {
        quantity = LSProduct.quantity;
      }
    });
    return quantity;
  };
  useEffect(() => {
    let tempTotal = 0;
    let tempSubTotal = 0;
    localStorageProducts.forEach((product) => {
      tempTotal += product.price * product.quantity;
      tempSubTotal += product.price * product.quantity;
    });
    setTotal(tempTotal + 10);
    setSubTotal(tempSubTotal);
  }, [setTotal, setSubTotal, localStorageProducts]);
  return (
    <Section>
      <Div2>
        {products.map((product, index) => (
          <div key={Math.random() + index}>
            <div>
              <img src={handleSetImage(product)} alt="product-img" />
              <p> {product.title}</p>
            </div>
            <p className="price">
              ${product.price * handleSetQuantity(product)}
            </p>
          </div>
        ))}
      </Div2>
      <div>
        <p>
          Subtotal: <span className="price">${subTotal}</span>
        </p>
        <p>
          Shipping: <span className="price">$10</span>
        </p>
        <p>
          Total: <span className="price">${total}</span>
        </p>
      </div>
    </Section>
  );
};

export default CheckoutSummary;
