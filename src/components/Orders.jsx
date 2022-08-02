import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { userRequest } from "../utils/apiCallMethods";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../styles/GlobalStyles";
import AnchorLink from "./AnchorLink";
import { refundUserMoney } from "../redux/userSlice";

const BTN = styled(Button)`
  position: relative;
  top: -0.1rem;
  z-index: 5;
  border-radius: 0.2rem;
  box-shadow: 0rem 0rem 0.5rem rgba(0, 0, 0, 0.7);
  color: white;
  background: black;
  padding: 0.5rem 1.5rem;
  &:hover {
    background: white;
  }
`;
const Div = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr;
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
  align-self: center;
  & p {
    margin: 0.5rem 0;
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
`;
const OrderStatus = styled.span`
  color: ${(props) =>
    props.status === "pending"
      ? "rgba(0,0,255,0.75)"
      : props.status === "canceled"
      ? "rgba(255,0,0,0.75)"
      : "rgb(13, 176, 13)"};
`;
const Orders = () => {
  const { id, token } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
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
  const handleButtonClick = (order) => {
    const { _id } = order;
    api
      .put(`/order/${_id}/${id}`, {
        ...order,
        status: "canceled",
      })
      .then((res) => {
        setOrders(
          orders.map((order) => {
            const tempOrder = Object.assign({}, order);
            if (order._id === _id) {
              tempOrder.status = "canceled";
            }
            return tempOrder;
          })
        );
        dispatch(refundUserMoney(order.amount + 10));
      });
  };
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
              <span>Order Status</span>:
              <OrderStatus status={order.status}> {order.status}</OrderStatus>
            </p>
            <p>
              <span>Total</span>: ${order.amount + 10}
            </p>
            {order.status !== "canceled" && order.status !== "delivered"&&  (
              <BTN onClick={() => handleButtonClick(order)}>Cancel Order</BTN>
            )}
          </Div3>
        </Li>
      ))}
    </Ul>
  );
};

export default Orders;
