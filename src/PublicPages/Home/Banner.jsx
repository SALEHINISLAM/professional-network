import React from "react";
import PropTypes from "prop-types";
import { Player } from '@lottiefiles/react-lottie-player';
const Banner = (props) => {
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="lg:w-1/2">
          
          <Player src={'https://lottie.host/a43fb890-5ef4-4d77-aa05-1ce880626035/Q2ZZ1hdeuE.json'} className="player"
          loop
          autoplay
          />
          </div>
          <div>
            <h1 className="text-5xl font-bold">Are you Student?</h1>
            <p className="py-6">
              Get started with us to unlocked you TRUE POTENTIAL and discover the LARGE JOB market waiting for you.
            </p>
            
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

Banner.propTypes = {};

export default Banner;
