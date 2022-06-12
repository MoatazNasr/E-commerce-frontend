import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Badge from "@mui/material/Badge";
import AnchorLink from "./AnchorLink";
import { Button } from "../styles/GlobalStyles";
import UserForm from "../components/UserForm";
import { useSelector ,useDispatch} from "react-redux";
import { setErrorMessage } from "../redux/errorMessageSlice";
const Nav = styled.nav`
  font-family: ${(props) => props.fontFamily};
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  position: ${(props) => (props.header == true ? "absolute" : "none")};
  z-index: 5;
  width: 100%;
  background-color: ${(props) =>
    props.header == true ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0.9)"};
  padding: 2rem 5rem;
`;

const Div = styled.div`
  color: white;
  &:nth-of-type(3) li:hover {
    transform: scale(115%);
  }
  &:nth-of-type(2) ul li {
    margin: 0 1rem;
  }
  &:nth-of-type(2) {
    position: relative;
    top: 1rem;
    left: -2rem;
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
`;
const BTN = styled(Button)`
  padding: 0;
  display: flex;
  align-items: center;
  color: white;
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
        className="fs-300"
        fontFamily="Shadows Into Light, cursive"
        header={props.header}
      >
        <Div>
          <List>
            <ListItem className="fs-400">
              <BTN className="nav-link">
                We Got Your Desire
                <SearchOutlinedIcon className="icon" />
              </BTN>
            </ListItem>
          </List>
        </Div>
        <Div>
          <AnchorLink
            linkTo="/"
            passedClassName="fs-500 nav-link"
            children="MAY&M"
          />
          <List>
            <ListItem>
              <AnchorLink
                linkTo="/shop"
                passedClassName="nav-link"
                children="SHOP"
              />
            </ListItem>
            <ListItem>
              <AnchorLink
                linkTo="/newarrivals"
                passedClassName="nav-link"
                children="NEW ARRIVALS"
              />
            </ListItem>
            <ListItem>
              <AnchorLink
                linkTo="/about"
                passedClassName="nav-link"
                children="ABOUT"
              />
            </ListItem>
          </List>
        </Div>
        <Div>
          <List>
            <ListItem>
              {user.token ? (
                <AnchorLink
                  linkTo="/profile"
                  passedClassName="nav-link"
                  children={<PersonOutlineOutlinedIcon />}
                />
              ) : (
                <BTN className="nav-link inline" onClick={() => showLogin()}>
                  <PersonOutlineOutlinedIcon />
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
                          backgroundColor: "transparent",
                          color: "white",
                        },
                      }}
                    >
                      <FavoriteBorderIcon />
                    </Badge>
                  }
                />
              ) : (
                <BTN
                  onClick={() => dispatch(setErrorMessage("Please login to continue !!"))}
                >
                  {" "}
                  <FavoriteBorderIcon />
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
                          backgroundColor: "transparent",
                          color: "white",
                        },
                      }}
                    >
                      <ShoppingBagOutlinedIcon />
                    </Badge>
                  }
                />
              ) : (
                <BTN
                  onClick={() => dispatch(setErrorMessage("Please login to continue !!"))}
                >
                  {" "}
                  <ShoppingBagOutlinedIcon />
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
