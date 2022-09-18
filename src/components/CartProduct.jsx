import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "../styles/GlobalStyles";
import AnchorLink from "./AnchorLink";
import { useDispatch } from "react-redux";
import { removeProductFromCart } from "../redux/cartSlice";
const Product = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr 1.5fr;
  margin: 2rem;
  & img {
    max-width: 300px;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;    
    text-align: center;
    & img {
      max-width:100%;
    }
  }
`;
const BTN = styled(Button)`
  margin: 0 3rem;
  z-index: 5;
  border-radius: 0.2rem;
  box-shadow: 0rem 0rem 0.5rem rgba(0, 0, 0, 0.7);
  color: white;
  background: black;
  padding: 0.75rem 2rem;
  &:hover {
    background: white;
  }
`;
const Color = styled.span`
  width: 20px;
  aspect-ratio: 1/1;
  display: inline-block;
  margin: 0 0.25rem;
  background-color: ${(props) => props.color};
  border: ${(props) =>
    props.color === "White" ? "1px solid rgba(0,0,0,0.4)" : "none"};
  border-radius: 50%;
`;
const Details = styled.ul`
  padding: 0;
  margin: 1.75rem 1rem;
  @media (max-width: 768px) {
    margin:0 1rem;
    font-size: clamp(1rem, 3vw, 1.75rem);
  }
`;
const ProductDetail = styled.li`
  list-style: none;
  margin-top: 1.1rem;
  & span {
    font-weight: 700;
  }
  & button {
    background: none;
    border: none;
    cursor: pointer;
  }
`;
const Transfer = styled.div`
  margin-top: 2rem;
  @media (max-width: 768px) {
    margin:0;
  }
`;
const ProductDetailsBTN = styled(BTN)`
  display: flex;
  align-items: center;
  margin: 0;
  background: transparent;
  box-shadow: none;
  color: black;
  & span {
    margin-right: 0.5rem;
  }
  & a {
    color: black;
  }
  @media (max-width: 768px) {
    margin: 0 auto ;  
  }
`;
const RemoveFromCart = styled(ProductDetailsBTN)``;

const CartProduct = ({
  cart,
  id,
  title,
  color,
  size,
  price,
  imgSrc,
  setChangeCartSummary,
}) => {
  let [productQuantity, setProductQuantity] = useState(0);
  const dispatch = useDispatch();
  const incproductQuantity = () => {
    setProductQuantity((prevQuan) => prevQuan + 1);
    setChangeCartSummary((prevValue) => !prevValue);
  };
  const decproductQuantity = () => {
    setProductQuantity((prevQuan) => {
      if (prevQuan === 1) return 1;
      else return prevQuan - 1;
    });
    setChangeCartSummary((prevValue) => !prevValue);
  };
  const handleRemoveFromtCart = () => {
    dispatch(
      removeProductFromCart({
        productID: id,
        selectedSize: size,
        selectedColor: color,
      })
    );
  };
  useEffect(()=>{
    setProductQuantity(0);
  },[cart])
  useEffect(() => {
    let products = JSON.parse(window.localStorage.getItem("cartProducts"));
    if (productQuantity === 0) {
      products.forEach((product) => {
        if (
          product.productID === id &&
          product.selectedSize === size &&
          product.selectedColor === color
        ) {
          if (product.quantity > 1) setProductQuantity(product.quantity);
          else setProductQuantity(1);
        }
      });
      // check when first render happens to the product , then check if that product has quantity in LocalS
    } else {
      products.forEach((product) => {
        if (
          product.productID === id &&
          product.selectedSize === size &&
          product.selectedColor === color
        ) {
          product.quantity = productQuantity;
          // issue in product.quantity value
        }
      });
      window.localStorage.setItem("cartProducts", JSON.stringify(products));
    }
  }, [productQuantity]);
  return (
    <>
      <Product>
        <img alt="" src={imgSrc} />
        <Details className="fs-400">
          <ProductDetail>
            <span>Product</span>: {title}
          </ProductDetail>
          <ProductDetail>
            {" "}
            <Color color={color} />
          </ProductDetail>
          <ProductDetail>
            {" "}
            <span>Size</span>: {size}
          </ProductDetail>
          <ProductDetail>
            {" "}
            <span>Price</span>: ${price}
          </ProductDetail>
          <ProductDetail className="fs-600">
            <button onClick={() => incproductQuantity()}>+</button>
            {productQuantity}
            <button onClick={() => decproductQuantity()}>-</button>
          </ProductDetail>
        </Details>
        <Transfer>
          <RemoveFromCart onClick={() => handleRemoveFromtCart()}>
          <img src='../../assets/icons/close-circle-outline.svg' className="icons"/>
          </RemoveFromCart>
          <ProductDetailsBTN>
            <AnchorLink
              linkTo={`/product/${id}`}
              passedClassName="nav-link"
              children={
                <>
                  <img src='../../assets/icons/navigate-outline.svg' className="icons"/>
                </>
              }
            />
          </ProductDetailsBTN>
        </Transfer>
      </Product>
    </>
  );
};

export default CartProduct;
