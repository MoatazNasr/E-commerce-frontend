import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import styled from "styled-components";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import filterProducts from "../utils/filterProducts.js";
import countProductsCategories from "../utils/countProductsCategory.js";
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
const Products = ({ setProductsCategoriesQuantity, newProduct }) => {
  const { collectionFilters, newArrivalsFilters } = useSelector(
    (state) => state.filters
  );
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [collectionProducts, setCollectionProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const location = useLocation();
  useEffect(async () => {
    const tempProducts = await axios.get("https://e-commerce-back-byqu.onrender.com/api/product");
    setProducts(tempProducts.data);
    setProductsCategoriesQuantity(
      countProductsCategories(tempProducts.data, newProduct)
    );
  }, []);
  useEffect(() => {
    let filterProductsResult;
    if (location.pathname === "/newarrivals") {
      filterProductsResult = filterProducts(products, newArrivalsFilters);
    } 
    else {
      filterProductsResult = filterProducts(products, collectionFilters);
    }
    setFilteredProducts(filterProductsResult);
  }, [collectionFilters, newArrivalsFilters, products]);
  useEffect(() => {
    let tempNewProducts = [];
    let tempCollectionProducts = [];
    filteredProducts.forEach((product) => {
      if (product.feature === "new") tempNewProducts.push(product);
      else tempCollectionProducts.push(product);
    });
    setNewProducts(tempNewProducts);
    setCollectionProducts(tempCollectionProducts);
  }, [filteredProducts]);
  return (
    <section>
      {location.pathname === "/collection" &&
        collectionProducts.length <= 0 && (
          <h2 className="fs-700">NO PRODUCTS FOUND</h2>
        )}
      {location.pathname === "/newarrivals" && newProducts.length <= 0 && (
        <h2 className="fs-700">NO PRODUCTS FOUND</h2>
      )}
      <ProductsList>
        {location.pathname === "/collection"
          ? collectionProducts.map((product, index) => (
              <ProductItem product={product} key={Math.random() + index} />
            ))
          : newProducts.map((product, index) => (
              <ProductItem product={product} key={Math.random() + index} />
            ))}
      </ProductsList>
    </section>
  );
};

export default Products;
