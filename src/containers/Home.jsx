import React from "react";
import Categories from "../components/Categories";
import HomeHeader from "../components/HomeHeader";
import Newsletter from "../components/Newsletter";
import WhoAreWe from "../components/WhoAreWe";
import Sale from "../components/Sale";
import Footer from "../components/Footer";
const Home = () => {
  return (
    <>
      <HomeHeader />
      <main>
        <WhoAreWe />
        <Sale />
        <Categories />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
};

export default Home;
