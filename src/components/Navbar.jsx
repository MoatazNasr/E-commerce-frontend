import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Badge from "@mui/material/Badge";
import AnchorLink from "./AnchorLink";
import { Button } from "../styles/GlobalStyles";
import UserForm from "../components/UserForm";
import { useSelector, useDispatch } from "react-redux";
import { setErrorMessage } from "../redux/errorMessageSlice";
const Nav = styled.nav`
  font-family: ${(props) => props.fontFamily};
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  background-color: white ;
  position: ${(props) => (props.header === true ? "fixed" : "none")};
  z-index: 5;
  width: 100%;
  padding: 1.5rem 0;
  box-shadow: 0rem 0rem 0.5rem rgba(0, 0, 0, 0.5);
  & div:nth-of-type(1) {
    text-align: left;
  }
  & div:nth-of-type(2) {
    text-align: left;
  }
`;

const Div = styled.div`
  &:nth-of-type(3) li:hover {
    transform: scale(115%);
  }
  &:nth-of-type(2) ul li {
    margin: 0 1rem;
  }
`;
const List = styled.ul`
  padding: 0;
  display: flex;
`;

const ListItem = styled.li`
  list-style: none;
  margin: 0 0.3rem;
  cursor: pointer;
  transition: 0.5s all;
  & .inline {
    display: inline;
  }
  & a {
    text-decoration: none;
    color: black;
    transition: 0.5s all;
    cursor: pointer;
    &:hover{
      color: hsl(353, 100%, 78%);  
    }
  }
`;
const BTN = styled(Button)`
  padding: 0;
  display: flex;
  align-items: center;
  & .icon {
    margin-left: 0.5rem;
  }
`;
const Navbar = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const { user, cart, wishlist } = useSelector((state) => state);
  const dispatch = useDispatch();
  const showLogin = () => {
    setLoggedIn(!loggedIn);
  };
  useEffect(() => {
    if (user.token) {
      setLoggedIn(false);
    }
  }, [user]);
  return (
    <>
      <Nav
        className="fs-400"
        fontFamily="Shadows Into Light, cursive"
        header={props.header}
      >
        <Div className="fs-400">
          MAY&M <br /> Women's fashion with passion
        </Div>
        <Div>
          <List>
            <ListItem>
              <AnchorLink
                linkTo="/"
                children="HOME"
              />
            </ListItem>
            <ListItem>
              <AnchorLink
                linkTo="/shop"
                children="SHOP"
              />
            </ListItem>
            <ListItem>
              <AnchorLink
                linkTo="/newarrivals"
                children="NEW ARRIVALS"
              />
            </ListItem>
          </List>
        </Div>
        <Div>
          <List>
            <ListItem>
              {user.token ? (
                <AnchorLink
                  linkTo="/settings"
                  passedClassName="nav-link"
                  children={
                    <img
                      src="../../assets/icons/person-outline.svg"
                      className='icons'
                      alt="wishlist-icon"
                    />
                  }
                />
              ) : (
                <BTN className="nav-link inline" onClick={() => showLogin()}>
                  <img
                    src="../../assets/icons/person-outline.svg"
                    className='icons'
                    alt="wishlist-icon"
                  />
                </BTN>
              )}
            </ListItem>
            <ListItem>
              {user.token !== "" ? (
                <AnchorLink
                  linkTo="/wishlist"
                  passedClassName="nav-link"
                  children={
                    <Badge
                      badgeContent={wishlist.products.length}
                      sx={{
                        "& .MuiBadge-badge": {
                          backgroundColor: "hsl(353, 100%, 78%)",
                          color: "white",
                          marginRight:'-6px'    
                        },
                      }}
                    >
                      <img
                        src="../../assets/icons/heart-outline.svg"
                        alt="wishlist-icon"
                        className='icons'
                        
                      />
                    </Badge>
                  }
                />
              ) : (
                <BTN
                  onClick={() =>
                    dispatch(setErrorMessage("Please login to continue !!"))
                  }
                >
                  {" "}
                  <img
                    src="../../assets/icons/heart-outline.svg"
                    alt="wishlist-icon"
                    className='icons'
                  />
                </BTN>
              )}
            </ListItem>
            <ListItem>
              {user.token !== "" ? (
                <AnchorLink
                  linkTo="/cart"
                  passedClassName="nav-link"
                  children={
                    <Badge
                      badgeContent={cart.products.length}
                      sx={{
                        "& .MuiBadge-badge": {
                          backgroundColor: "hsl(353, 100%, 78%)",
                          color: "white",
                          marginRight:'-6px'
                          },
                      }}
                    >
                      <img
                        src="../../assets/icons/bag-outline.svg"
                        alt="cart-icon"
                        className='icons'
                      />
                    </Badge>
                  }
                />
              ) : (
                <BTN
                  onClick={() =>
                    dispatch(setErrorMessage("Please login to continue !!"))
                  }
                >
                  {" "}
                  <img
                    src="../../assets/icons/bag-outline.svg"
                    alt="cart-icon"
                    className='icons'
                  />
                </BTN>
              )}
            </ListItem>
          </List>
        </Div>
      </Nav>
      <UserForm appear={loggedIn} />
    </>
  );
};

export default Navbar;
