import React ,{useEffect} from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Footer from "../components/Footer";
import WishlistProduct from "../components/WishlistProduct";
import { useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
const H1 = styled.h1`
  text-align: center;
`;
const Main = styled.main``;
const Products = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 1rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
const Title = styled.h2`
  margin: 2rem auto;
  text-align: center;
`;

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.token === "") {
      navigate(-1);
    }
  });
  return (
    <>
      <Navbar />
      <Main>
      <H1 className="fs-800" style={{textAlign:'center'}}>WISHLIST</H1>
        {wishlist.products.length > 0 ? (
          <Products>
            {wishlist.products.map((product, index) => (
              <WishlistProduct
                id={product.productID}
                title={product.title}
                price={product.price}
                imgSrc={product.details[0].images[0]}
                key={index}
              />
            ))}
          </Products>
        ) : (
          <Title className="fs-600">Your Wishlist Is Empty</Title>
        )}
      </Main>
      <Footer />
    </>
  );
};

export default Wishlist;
