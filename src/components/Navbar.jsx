import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Badge from "@mui/material/Badge";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import AnchorLink from "./AnchorLink";
import { Button } from "../styles/GlobalStyles";
import UserForm from "../components/UserForm";
import { useSelector, useDispatch } from "react-redux";
import { setErrorMessage } from "../redux/errorMessageSlice";
import { useLocation } from "react-router-dom";
const Nav = styled.nav`
  font-family: ${(props) => props.fontFamily};
  justify-content: space-around;
  align-items: center;
  text-align: center;
  display: flex;
  position: ${(props) => (props.position ? "fixed" : "none")};
  top: 0;
  left: ${(props) => (props.openNav ? "0.03%" : "-120%")};
  z-index: 10;
  width: 100%;
  padding: 1.25rem 0;
  transition: 1s all;
  & div:nth-of-type(1) {
    text-align: left;
    color: ${(props) => (props.color === "white" ? "white" : "black")};
  }
  & div:nth-of-type(2) {
    text-align: left;
    & ul li a {
      color: ${(props) => (props.color === "white" ? "white" : "black")};
    }
  }
  @media (max-width: 768px) {
    flex-direction: column;
    background: rgba(0, 0, 0, 0.9);
    height: 100vh;
    & .open-nav-button,
    .close-nav-button {
      position: absolute;
      top: 0.25rem;
      right: 1rem;
      color: white;
    }
    & div {
      font-size: clamp(1.25rem, 3vw + 1rem, 2rem);
      & p {
        text-align: center;
        color: white;
      }
      & ul {
        flex-direction: column;
        text-align: center;
        color: white;
        & li {
          margin: 0.25rem 0;
          & a {
            color: white !important;
          }
        }
      }
    }
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
    transition: 0.5s all;
    cursor: pointer;
    &:hover {
      color: hsl(353, 100%, 78%) !important;
    }
  }
`;
const BTN = styled(Button)`
  padding: 0;
  & svg {
    color: ${(props) => props.svgColor};
  }
`;
const Navbar = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const { user, cart, wishlist } = useSelector((state) => state);
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();
  const dispatch = useDispatch();
  const showLogin = () => {
    setLoggedIn(!loggedIn);
  };
  const scrollFunction = () => {
    const navbarElement = document.getElementById("navbar");
    if (window.scrollY >= 120 && location.pathname === "/") {
      navbarElement.classList.add("navbar-background-black");
    } else {
      navbarElement.classList.remove("navbar-background-black");
    }
    setWindowHeight(window.scrollY);
  };
  useEffect(() => {
    const resizeFunction = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeFunction);
    return () => {
      window.removeEventListener("resize", resizeFunction);
    };
  },[]);
  useEffect(() => {
    if (location.pathname === "/" && windowWidth > 768) {
      window.addEventListener("scroll", scrollFunction);
    };
    return () => {
      window.removeEventListener("scroll", scrollFunction);
    };
  },[]);
  useEffect(() => {
    if (user.token) {
      setLoggedIn(false);
    }
  }, [user]);
  return (
    <>
      {openNav === false ? (
        <BTN
          className="open-nav-button"
          svgColor={location.pathname === "/" ? "white" : "black"}
        >
          <MenuIcon onClick={() => setOpenNav(true)} fontSize="large" />
        </BTN>
      ) : (
        <BTN
          className="close-nav-button"
          svgColor={location.pathname === "/" ? "white" : "black"}
        >
          <CloseIcon onClick={() => setOpenNav(false)} fontSize="large" />
        </BTN>
      )}
      <Nav
        fontFamily ="Shadows Into Light, cursive"
        position ={windowWidth <= 768 || location.pathname === "/"}
        color ={props.color}
        openNav ={windowWidth <= 768 ? (openNav ? true : false) : true}
        id="navbar"
      >
        <Div className="fs-400">
          <p>
            MAY&M <br /> Women's fashion with passion
          </p>
        </Div>
        <Div>
          <List>
            <ListItem>
              <AnchorLink linkTo="/" children="HOME" />
            </ListItem>
            <ListItem>
              <AnchorLink linkTo="/collection" children="COLLECTION" />
            </ListItem>
            <ListItem>
              <AnchorLink linkTo="/newarrivals" children="NEW ARRIVALS" />
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
                      src={`../../assets/icons/${
                        windowWidth <= 768
                          ? "icons8-person-64 (1)"
                          : location.pathname !== "/" && windowHeight < 120
                          ? "icons8-person-64"
                          : "icons8-person-64 (1)"
                      }.png`}
                      className="icons"
                      alt="person-icon"
                    />
                  }
                />
              ) : (
                <BTN className="nav-link inline" onClick={() => showLogin()}>
                  <img
                    src={`../../assets/icons/${
                      windowWidth <= 768
                        ? "icons8-person-64 (1)"
                        : location.pathname !== "/" && windowHeight < 120
                        ? "icons8-person-64"
                        : "icons8-person-64 (1)"
                    }.png`}
                    className="icons"
                    alt="person-icon"
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
                          marginRight: "-6px",
                        },
                      }}
                    >
                      <img
                        src={`../../assets/icons/${
                          windowWidth <= 768
                            ? "icons8-heart-50 (1)"
                            : location.pathname !== "/" && windowHeight < 120
                            ? "icons8-heart-50"
                            : "icons8-heart-50 (1)"
                        }.png`}
                        className="icons"
                        alt="wishlist-icon"
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
                  <img
                    src={`../../assets/icons/${
                      windowWidth <= 768
                        ? "icons8-heart-50 (1)"
                        : location.pathname !== "/" && windowHeight < 120
                        ? "icons8-heart-50"
                        : "icons8-heart-50 (1)"
                    }.png`}
                    className="icons"
                    alt="wishlist-icon"
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
                          marginRight: "-6px",
                        },
                      }}
                    >
                      <img
                        src={`../../assets/icons/${
                          windowWidth <= 768
                            ? "icons8-shopping-bag-50 (1)"
                            : location.pathname !== "/" && windowHeight < 120
                            ? "icons8-shopping-bag-50"
                            : "icons8-shopping-bag-50 (1)"
                        }.png`}
                        className="icons"
                        alt="shopping-bag-icon"
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
                  <img
                    src={`../../assets/icons/${
                      windowWidth <= 768
                        ? "icons8-shopping-bag-50 (1)"
                        : location.pathname !== "/" && windowHeight < 120
                        ? "icons8-shopping-bag-50"
                        : "icons8-shopping-bag-50 (1)"
                    }.png`}
                    className="icons"
                    alt="shopping-bag-icon"
                  />
                </BTN>
              )}
            </ListItem>
          </List>
        </Div>
      </Nav>
      <UserForm appear={loggedIn} setAppear={setLoggedIn}/>
    </>
  );
};

export default Navbar;
