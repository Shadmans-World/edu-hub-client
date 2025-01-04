import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "./Slider.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BestServiceSlider = () => {
  const [sliderContent, setSliderContent] = useState([]);

  useEffect(() => {
    axios
      .get("https://edu-hub-bangla-server.vercel.app/services/bestServices")
      .then((res) => setSliderContent(res.data))
      .catch((error) => {
        // console.error("Error fetching data:", error.message);
      });
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {sliderContent.map((content) => (
          <div
            key={content._id}
            className="movie-card"
            data-aos="fade-up"  // Apply fade-up animation when scrolled into view
            data-aos-duration="1000" // Animation duration
            data-aos-easing="ease-in-out" // Easing for smoothness
          >
            <img src={content.image} alt={content.serviceName} />
            <p className="movie-info">
              {content.serviceName}
              <br />
              <strong>Price:</strong> {content.price}
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BestServiceSlider;
