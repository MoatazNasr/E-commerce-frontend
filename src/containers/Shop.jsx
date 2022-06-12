import React from 'react';
import Filters from '../components/Filters';
import Navbar from '../components/Navbar';
import Products from '../components/Products';
import Footer from '../components/Footer';
const Shop = () => {
  return (
    <>
    <Navbar/>
    <Filters/>
    <Products/>
    <Footer/>
    </>
  )
}

export default Shop;