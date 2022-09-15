import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { userRequest } from "../utils/apiCallMethods";
import { useSelector } from "react-redux";
import AnchorLink from "./AnchorLink";
const Div = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr;
  @media (max-width: 768px){
    grid-template-columns: 1fr;
    & img {
      margin-bottom: 1rem;
    }
  }
  padding: 1rem;
  & .nav-link {
    position: relative;
    left: 0;
    top: 0;
    width: 100px;
    aspect-ratio: 1;
  }
`;
const Div3 = styled.div`
  & p {
    margin: 1rem 0;
  }
  @media (max-width: 768px){
    padding:0 1rem;
  }
`;
const Color = styled.span`
  position: relative;
  top: 0.15rem;
  width: 15px;
  aspect-ratio: 1/1;
  display: inline-block;
  margin: 0 0.25rem;
  background-color: ${(props) => props.color};
  border: ${(props) =>
    props.color === "White" ? "1px solid rgba(0,0,0,0.4)" : "none"};
  border-radius: 50%;
`;
const Ul = styled.ul`
  margin: 1.5rem auto;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 1rem;
  width: 95%;
`;
const Li = styled.li`
  border: 1px solid rgba(0, 0, 0, 0.25);
  position: relative;
  display: grid;
  grid-template-columns: 4fr 1fr;
  & p {
    & span {
      font-weight: 700;
    }
  }
  @media (max-width: 768px){
    text-align: left;
    grid-template-columns: 1fr;
  }
`;
const Orders = () => {
  const { id, token } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const api = userRequest(token);
  const handleSetImage = (product) => {
    let image = "";
    product.details.forEach((details) => {
      if (product.selectedColor === details.color) image = details.images[0];
    });
    return image;
  };
  useEffect(() => {
    api.get(`/order/${id}`).then((res) => {
      setOrders(res.data);
    });
  }, []);
  return (
    <Ul>
      {orders.length === 0 && <h1>No Orders </h1>}
      {orders.map((order, index) => (
        <Li key={index + Math.random()}>
          <div>
            {order.products.map((product, index) => (
              <Div key={index + Math.random()}>
                <AnchorLink
                  linkTo={`/product/${product._id}`}
                  passedClassName="nav-link"
                  children={
                    <img src={handleSetImage(product)} alt="product-img" />
                  }
                />
                <div>
                  <p>
                    {" "}
                    <span>Title</span>: {product.title}
                  </p>
                  <p>
                    <span>Category</span>: {product.category}
                  </p>
                  <p>
                    <span>Color</span>:
                    <Color color={product.selectedColor} />
                  </p>
                </div>
                <div>
                  <p>
                    <span>Price</span>: ${product.price}
                  </p>
                  <p>
                    <span>Size</span>: {product.selectedSize}
                  </p>
                  <p>
                    <span>Quantity</span>: {product.quantity}
                  </p>
                </div>
              </Div>
            ))}
          </div>
          <Div3>
            <p>
              <span>Order Date</span>: {order.updatedAt.split("-")[0]}/
              {order.updatedAt.split("-")[1]}/
              {order.updatedAt.split("-")[2].split(":")[0].split("T")[0]}
            </p>
            <p>
              <span>Total</span>: ${order.amount + 10}
            </p>
          </Div3>
        </Li>
      ))}
    </Ul>
  );
};

export default Orders;
