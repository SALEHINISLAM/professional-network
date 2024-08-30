import React from "react";
import PropTypes from "prop-types";
import { Player } from "@lottiefiles/react-lottie-player";

const AdminHome = (props) => {
  return (
    <div className="container mx-auto">
        <h2 className="text-4xl font-bold">
            Welcome Our Admin
        </h2>
      <Player 
       src="https://d1jj76g3lut4fe.cloudfront.net/saved_colors/98631/ONAXnF7vwYOUhK9d.json"
      loop
      autoplay
      />
    </div>
  );
};

AdminHome.propTypes = {};

export default AdminHome;
