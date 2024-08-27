import React from "react";
import { Helmet } from "react-helmet-async";
import Banner from "./Banner";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Professional Network | Home</title>
      </Helmet>
      <Banner/>
    </div>
  );
};

export default Home;
