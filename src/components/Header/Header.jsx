import React, { useEffect, useState } from "react";
import logo from "../../image/866-8663932_face-paint-png-face-painting-clip-art-free.png";
import bg1 from "../../image/102c92df5e6221ad5b5a4817c4cbff161f7cbeed_slide_1.1.jpg";
import bg2 from "../../image/1f633d5b5e25e6aae97cecfd1d13ce4f3b2e7182_slide_1.3.jpg";
import bg3 from "../../image/ee4104090dce4214aa57f8289c4827dac9fca042_slide_1.2.jpg";
import user from "../../image/149071.png";
import AOS from "aos";
import "aos/dist/aos.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Header.css";
import MovingComponent from "react-moving-text";
import { useNavigate } from "react-router-dom";

function Header() {
  let navigate = useNavigate();
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  //react slick slider setting
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const backgroundImage = [bg1, bg2, bg3];

  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.querySelector(
      ".Header"
    ).style.backgroundImage = `url(${backgroundImage[count]})`;
    if (count > 2) {
      setCount(0);
    }
  }, [count]);

  const logOut = (e) => {
    e.preventDefault();
    fetch("https://login-system-ecommerce.herokuapp.com/logout", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/signUp");
      });
  };
  return (
    <div className="Header">
      <div className="flex">
        <div className="logo w-1/5">
          <img src={logo} alt="" />
        </div>
        <div className="menu flex justify-end items-center">
          <ul className="flex justify-end items-end">
            <li>
              <a href=" ">Home</a>
            </li>
            <li>
              <a href=" ">about</a>
            </li>
            <li>
              <a href=" ">Products</a>
            </li>
            <li>
              <a href=" ">Cart</a>
            </li>
            <li>
              <a onClick={logOut} href=" ">
                logout
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Slider className="slider" {...settings}>
        <div className="slide-item m-auto">
          <h1 className="text-center text-7xl font-medium text-white">
            <MovingComponent
              type="squeezeHorizontal"
              duration="1500ms"
              delay="1s"
              direction="normal"
              timing="ease"
              iteration="1"
              fillMode="none"
            >
              Summer Collection
            </MovingComponent>
          </h1>
          <p className="text-center w-3/5 m-auto mt-5 text-white">
            <MovingComponent
              type="slideInFromTop"
              duration="1500ms"
              delay="1s"
              direction="normal"
              timing="ease"
              iteration="1"
              fillMode="none"
            >
              Duis autem vel eum iriure dolor in hendrerit in vulputate velit
              esse molestie consequat, vel illum dolore eu feugiat nulla
              facilisis at vero eros.
            </MovingComponent>
          </p>
          <button
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500"
            className="shop-btn uppercase mt-5 table m-auto"
          >
            SHOPPING NOW
          </button>
        </div>
        <div className="slide-item m-auto">
          <h1
            data-aos="fade-up"
            data-aos-duration="1500"
            className="text-center text-7xl font-medium text-white"
          >
            Perfect Outerwear
          </h1>
          <p
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
            className="text-center w-3/5 m-auto mt-5 text-white"
          >
            Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
            molestie consequat, vel illum dolore eu feugiat nulla facilisis at
            vero eros.
          </p>
          <button
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="1500"
            className="shop-btn uppercase mt-5 table m-auto"
          >
            SHOPPING NOW
          </button>
        </div>
        <div className="slide-item m-auto">
          <h1 className="text-center text-7xl font-medium text-white">
            Dress Shirt Nego
          </h1>
          <p className="text-center w-3/5 m-auto mt-5 text-white">
            Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
            molestie consequat, vel illum dolore eu feugiat nulla facilisis at
            vero eros.
          </p>
          <button className="shop-btn uppercase mt-5 table m-auto">
            SHOPPING NOW
          </button>
        </div>
      </Slider>
    </div>
  );
}

export default Header;
