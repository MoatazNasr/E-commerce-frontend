import React from 'react'
import Header from '../components/Header';
import Products from '../components/Products';
import Filters from '../components/Filters';
import Footer from '../components/Footer';

const NewArrivals = () => {
  return (
    <div>
        <Header />
        <Filters/>
        <Products/>
        <Footer/>
    </div>
  )
}

export default NewArrivals