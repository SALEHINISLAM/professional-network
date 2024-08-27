import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import {
  Autoplay,
  FreeMode,
  Navigation,
  Pagination,
  Thumbs,
} from "swiper/modules";
import BannerSlide from "../BannerSlide";
import { Player } from "@lottiefiles/react-lottie-player";
import './Banner.css'

const Banner = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const banner = [
    {
      title: "Are you Student?",
      lottieLink:
        "https://lottie.host/a43fb890-5ef4-4d77-aa05-1ce880626035/Q2ZZ1hdeuE.json",
      description:
        "Get started with us to unlocked you TRUE POTENTIAL and discover the LARGE JOB market waiting for you.",
      loginLink: "/employee/login",
    },
    {
      title: "Are you Job Seeker?",
      lottieLink:
        "https://lottie.host/744b629e-0c08-4ef7-bafd-efa053d9d246/iyxYKT1cF0.json",
      description:
        "Get started with us to unlocked you TRUE POTENTIAL and discover the LARGE JOB market waiting for you.",
      loginLink: "/employee/login",
    },
    {
      title: "Are you Employer?",
      lottieLink:
        "https://lottie.host/30b76a3c-a9c8-4196-862e-a8bf9828ff54/KYan2MGt3s.json",
      description:
        "Getting stuck with searching HIGH TALENTED people ? Come here to sind your RIGHT candidate and develop your company.",
      loginLink: "/employer/login",
    },
    {
      title: "Are you Entrepreneur?",
      lottieLink:
        "https://lottie.host/efc48875-08bb-4813-a198-427ef482f6dd/Vd1qLkUvgC.json",
      description:
        "Search the correct co-founder for your business growth, connect the right investor to boost your future TRILLION DOLLAR business.",
      loginLink: "/entrepreneur/login",
    },
  ];
  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
        modules={[FreeMode, Navigation, Thumbs, Autoplay, Pagination]}
        className="mySwiper2"
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: true,
        }}
        loop
      >
        {banner.map((ban, index) => (
          <SwiperSlide key={index}>
            <BannerSlide
              img={ban.lottieLink}
              title={ban.title}
              desc={ban.description}
              link={ban.loginLink}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {banner.map((ban, index) => (
          <SwiperSlide key={index}>
            <Player
              src={
                ban.lottieLink
              }
              className="player"
              loop
              autoplay
              style={{width:'8rem'}}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Banner;
