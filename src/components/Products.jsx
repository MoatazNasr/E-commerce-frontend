import React, { Fragment, useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import styled from "styled-components";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import filterProducts from "../utils/filterProducts.js";
import countProductsCategories from '../utils/countProductsCategory.js'
const ProductsList = styled.ul` 
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 3rem;
  row-gap: 2rem;
  transition: 0.5s all;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 425px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
const Products = ({setProductsCategoriesQuantity,newProduct}) => {
  const filters = useSelector((state) => state.filters);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const location = useLocation();
  useEffect(async () => {
    const tempProducts = await axios.get("http://localhost:2002/api/product");
    setProducts(tempProducts.data);
    setProductsCategoriesQuantity(countProductsCategories(tempProducts.data,newProduct))
  }, []);
  useEffect(() => {
    const filterProductsResult = filterProducts(products, filters);
    setFilteredProducts(filterProductsResult);
  }, [filters, products]);
  return (
    <section>
      <ProductsList>
        {filteredProducts.map((product, key) => (
          <Fragment key={key + Math.random()}>
            {location.pathname === "/collection" ? (
              <>{product.feature !== "new" && <ProductItem product={product} />}</>
            ) : (
              <>{product.feature === "new" && <ProductItem product={product} />}</>
            )}
          </Fragment>
        ))}
      </ProductsList>
    </section>
  );
};

export default Products;
