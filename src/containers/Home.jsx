import React from 'react';
import Categories from '../components/Categories';
import Header from '../components/Header';
import Collection from '../components/Collections';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
const Home = () => {

  return (
    <>
      <Header />
      <Categories />
      <Collection/>
      <Newsletter/>
     <Footer/>
    </>
  )
};

export default Home;