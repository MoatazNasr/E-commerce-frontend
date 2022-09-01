import React from 'react'
import Header from '../components/Header';
import Products from '../components/Products';
import ColorSizePriceFilters from '../components/ColorSizePriceFilters';
import Footer from '../components/Footer';

const NewArrivals = () => {
  return (
    <div>
        <Header />
        <ColorSizePriceFilters/>
        <Products/>
        <Footer/>
    </div>
  )
}

export default NewArrivals