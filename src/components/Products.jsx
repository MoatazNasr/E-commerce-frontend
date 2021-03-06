import React, { useEffect, useState } from "react";
import ShopProduct from "./ShopProduct";
import styled from "styled-components";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const ProductsList = styled.ul`
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 3rem;
  row-gap: 2rem;
`;
const Products = () => {
  const filters = useSelector((state) => state.filters);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const searchedProducts = location.pathname.split("/")[2];
  useEffect(async () => {
    const tempProducts = await axios.get("http://localhost:2002/api/product");
    setProducts(tempProducts.data);
  }, []);
  useEffect(() => {
    let Products = products.filter((product) => {
      let c, s, p;
      c = s = p = true;
      if (Object.values(filters)[0].length > 0)
        c = Object.values(filters)[0].some((color) =>
          product.details.some(
            (productDetails) => productDetails.color === color
          )
        );
      if (Object.values(filters)[1].length > 0)
        s = Object.values(filters)[1].some((size) =>
          product.details.some((productDetails) =>
            productDetails.sizes.some(
              (productDetailsObj) => productDetailsObj.size === size
            )
          )
        );
      if (Object.values(filters)[2].length > 0)
        p = Object.values(filters)[2].some(
          (filteredPrice) => product.price <= filteredPrice
        );
      if (c && s && p) return product;
    });
    setFilteredProducts(Products);
  }, [filters, products]);
  return (
    <section>
      <ProductsList>
        {filteredProducts.map((product, key) => (
          <ShopProduct key={key + Math.random()} product={product} />
        ))}
      </ProductsList>
    </section>
  );
};

export default Products;
