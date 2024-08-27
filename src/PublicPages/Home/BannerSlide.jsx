import React from "react";
import PropTypes from "prop-types";
import { Player } from '@lottiefiles/react-lottie-player';
const BannerSlide = ({img, title, desc, link}) => {
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="lg:w-1/2">
          
          <Player src={ img ? img : 'https://lottie.host/a43fb890-5ef4-4d77-aa05-1ce880626035/Q2ZZ1hdeuE.json'} className="player"
          loop
          autoplay
          />
          </div>
          <div>
            <h1 className="text-5xl font-bold">{title? title : 'Are you Student?'}</h1>
            <p className="py-6">
              {desc? desc: 'Get started with us to unlocked you TRUE POTENTIAL and discover the LARGE JOB market waiting for you.'}
            </p>
            
            <a href={link? link:'/employee/login'} className="btn btn-primary">Get Started</a>
          </div>
        </div>
      </div>
    </div>
  );
};

BannerSlide.propTypes = {};

export default BannerSlide;
