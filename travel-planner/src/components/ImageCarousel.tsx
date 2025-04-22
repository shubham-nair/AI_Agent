import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/ImageCarousel.css';

const images = [
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://plus.unsplash.com/premium_photo-1723936846310-38f4c1cf044e?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
];

const ImageCarousel: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    fade: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 100,
    autoplaySpeed: 4000,
  };

  return (
    <div className="carousel-background">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <div
              className="carousel-bg-slide"
              style={{ backgroundImage: `url(${img})` }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
