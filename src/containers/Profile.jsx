import React from 'react';
import styled from 'styled-components';
import { Button } from "../styles/GlobalStyles";
import { useDispatch } from 'react-redux';
import { signoutUser } from '../redux/userSlice';
import { useNavigate } from "react-router-dom";


const BTN = styled(Button)`
  width: 100%;
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

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = ()=>{
    dispatch(signoutUser())
    navigate(-1)
  }
  return <><BTN onClick={handleClick}>Log out</BTN></>;
};

export default Profile;
