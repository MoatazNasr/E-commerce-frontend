import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../styles/GlobalStyles";
import { updateUser } from "../redux/userSlice";
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
const UserData = () => {
  const { successfulMessage, errorMessage, user } = useSelector(
    (state) => state
  );

  const dispatch = useDispatch();
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userData = {
      email,
      username,
      phoneNumber,
    };
    dispatch(updateUser(userData));
  };
  useEffect(() => {
    setLoading(false);
  }, [successfulMessage,errorMessage]);
  return (
    <form className="settings-form" onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="phoneNumber">Phone</label>

      <input
        id="phoneNumber"
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <BTN type="submit">{loading ? "Loading..." : "Update"}</BTN>
    </form>
  );
};

export default UserData;
