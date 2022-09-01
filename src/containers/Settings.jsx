import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { NavLink } from "react-router-dom";
import UserPassword from "../components/UserPassword";
import UserData from "../components/UserData";
import styled from "styled-components";
import { Button } from "../styles/GlobalStyles";
import { useDispatch } from "react-redux";
import { signoutUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import Orders from '../components/Orders';
const BTN = styled(Button)`
  width: 100%;
  color: black;
  padding: 0.75rem 0;
`;
const Main = styled.main`
background: white !important;
height: 100vh;
color: black;
& a {
  color: black;
  position: absolute;
  left: 2rem;
  top: 2rem;
  display: flex;
  align-items: center;
}
& section {
  position: relative;
  top: 4rem;
  display: grid;
  grid-template-columns: 1fr 4fr;
  height: max-content;
  & ul:first-child {
    padding: 0;
    height: 100%;
    border-right: 1px solid black;
  }
}
& form {
  margin-top: 5rem;
  display: grid;
  place-content: center;
  gap: 1rem;
  color: black;
  & input {
    width: max(25vw, 200px);
    aspect-ratio: 9/1.01;
    padding: 0.2rem 1rem;
    outline: none;
    border-color: rgba(0, 0, 0, 0.3);
    border-radius: 0.25rem;
  }
}
`;
const Settings = () => {
  const [userData, setUserData] = useState(true);
  const [changePassword,setChangePassword] = useState(false);
  const [orders,setOrders] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    dispatch(signoutUser());
    navigate(-1);
  };
  const handlePagination = (paginationValue)=>{
     if (paginationValue === 'orders') {
      setUserData(false);
      setChangePassword(false);
      setOrders(true);
    }
    else if (paginationValue === 'password') {
      setUserData(false);    
      setChangePassword(true);
      setOrders(false);
    }
    else {
      setUserData(true);
      setChangePassword(false);
      setOrders(false);
    }
  }
  return (
    <Main>
      <NavLink className="nav-link" to={-1}>
        <ArrowBackIcon /> <span>Back</span>
      </NavLink>
      <section className="section-content">
        <ul className="section-content-select">
          <li>
            <BTN onClick={() => handlePagination('user')}>User Info</BTN>
          </li>
          <li>
            <BTN onClick={() => handlePagination('password')}>Change password</BTN>
          </li>
          <li>
          <BTN onClick={() => handlePagination('orders')}>Orders</BTN>
          </li>
          <li>
            <BTN onClick={handleClick}>Log out</BTN>
          </li>
        </ul>
        {userData && !changePassword && !orders && <UserData />}
        {!userData && changePassword && !orders && <UserPassword />}
        {!userData && !changePassword && orders && <Orders />}
      </section>
    </Main>
  );
};

export default Settings;
