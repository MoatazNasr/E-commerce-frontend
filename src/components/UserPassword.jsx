import React, { useRef, useEffect, useState } from "react";
import { Button } from "../styles/GlobalStyles";
import styled from "styled-components";
import { updateUser } from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import {setErrorMessage} from '../redux/errorMessageSlice';
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
const UserPassword = () => {
  const password = useRef();
  const confirmPassword = useRef();
  const [loading, setLoading] = useState(false);
  const {successfulMessage,errorMessage} = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password.current.value === confirmPassword.current.value) {

    const userData = {
      password: password.current.value,
    };
    dispatch(updateUser(userData));
  }
  else {
    setLoading(false);
    dispatch(setErrorMessage("Passwords do not match !!"));
  }
  };
  useEffect(() => {
    setLoading(false);
  }, [successfulMessage,errorMessage]);
  return (
    <form onSubmit={handleSubmit} className="settings-form">
      <input
        type="password"
        placeholder="New password"
        required={true}
        minLength={8}
        ref={password}
      />
      <input
        type="password"
        placeholder="Confirm password"
        required={true}
        minLength={8}
        ref={confirmPassword}
      />
      <BTN type="submit">{loading ? "Loading..." : "Update"}</BTN>
    </form>
  );
};

export default UserPassword;
