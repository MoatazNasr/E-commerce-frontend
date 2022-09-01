import React from "react";
import styled from "styled-components";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CopyrightOutlinedIcon from "@mui/icons-material/CopyrightOutlined";
const FooterX = styled.footer`
  margin-top: 5rem;
  background: rgb(33,33,33);
  font-family: ${(props) => props.fontFamily};
  color:white;
`;

const List = styled.ul`
  padding: 0;
  margin: 1rem auto;
  & li:nth-of-type(1) {
    font-weight: 700;
    color:hsl(353, 100%, 78%);
  }
  &:where(:not(:nth-of-type(1))) {
    & li:where(:not(:nth-of-type(1))) {
      cursor: pointer;
    }
  }
  &:nth-of-type(4) {
    & li:where(:not(:nth-of-type(1))) {
      display: flex;
      align-items: center;
      cursor: text;
    }
  }
`;

const ListItem = styled.li`
  list-style: none;
  margin: 0 0.3rem;
  margin: 0.6rem 0;
  & a{
    color:inherit;
    text-decoration:none;
    display: flex;
  }
  & span {
    cursor: pointer;
    margin: 0 0.25rem;
    transition: 0.5s all;
    &:hover {
      color:hsl(353, 100%, 78%);
    }
  }
`;
const Div = styled.div`
  margin: 0 auto;
  width: 98%;
  &:nth-of-type(1) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
  &:nth-of-type(2) {
    border-top: 1px solid rgba(0, 0, 0, 0.5);
    position: relative;
    padding: 1rem 0;
    & ul {
      display: flex;
      gap: 2rem;
      & li {
        font-weight: normal;
        cursor: pointer;
      }
    }
    & p,
    img {
      display: flex;
      align-items: center;
      position: absolute;
      right: 1rem;
      bottom: 3rem;
    }
    & img {
      bottom: 1rem;
    }
  }
`;
const Footer = () => {
  return (
    <FooterX fontFamily="Shadows Into Light, cursive">
      <Div>
        <List>
          <ListItem className="fs-500">MAY&M</ListItem>
          <ListItem className="fs-300">
            We are MAY&M <br /> A store specialized in women's fashion with
            passion
          </ListItem>
          <ListItem>
            <span>
              <FacebookOutlinedIcon />
            </span>
            <span>
              <InstagramIcon />
            </span>
            <span>
              <PinterestIcon />
            </span>
            <span>
              <TwitterIcon />
            </span>
          </ListItem>
        </List>
        <List>
          <ListItem>HELP</ListItem>
          <ListItem className="fs-300">Payment</ListItem>
          <ListItem className="fs-300">FAQ</ListItem>
          <ListItem className="fs-300">Returns </ListItem>
        </List>
        <List>
          <ListItem>INTERESTED IN</ListItem>
          <ListItem className="fs-300">Dresses </ListItem>
          <ListItem className="fs-300">Trousers </ListItem>
          <ListItem className="fs-300">Jackets </ListItem>
          <ListItem className="fs-300">Sweaters </ListItem>
          <ListItem className="fs-300">Coats </ListItem>
          <ListItem className="fs-300">Footwear </ListItem>

        </List>
        <List>
          <ListItem>CONTACT</ListItem>
          <ListItem className="fs-300">
            <LocationOnOutlinedIcon sx={{ margin: "0 0.25rem" }} />
            Brooklyn, NY 11215
          </ListItem>
          <ListItem className="fs-300">
            <CallOutlinedIcon sx={{ margin: "0 0.25rem" }} />
            +1235489
          </ListItem>
          <ListItem className="fs-300">
            <a href="mailto:MAYM@gmail.com">
              <EmailOutlinedIcon sx={{ margin: "0 0.25rem" }} />
              MAYM@gmail.com
            </a>
          </ListItem>
        </List>
      </Div>

      <Div>
        <List>
          <ListItem className="fs-300">Terms and conditions</ListItem>
          <ListItem className="fs-300">Data policy</ListItem>
          <ListItem className="fs-300">Cookies policy</ListItem>
        </List>
        <img src="/assets/images/payment.png" alt='payments'/>
        <p className="fs-300">
            <CopyrightOutlinedIcon
              fontSize="sm"
              sx={{ margin: "0 0.125rem" }}
            />
            2022 MAY&M
        </p>
      </Div>
    </FooterX>
  );
};

export default Footer;
