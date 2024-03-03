import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import $ from "jquery";
import img1 from "../../images/grocery-banner.png";
import img2 from "../../images/grocery-banner-2.jpeg";
import img3 from "../../images/slider-image-3.jpeg";

export default function Mainslider() {
  return (
    <div className="row g-0">
      <div className="col-md-9">
        <OwlCarousel items={1} loop autoplay autoplayTimeout={3000}>
          <div className="item">
            <img src={img1} className="w-100" height={400} />
          </div>
          <div className="item">
            <img src={img2} className="w-100" height={400} />
          </div>
          <div className="item">
            <img src={img3} className="w-100" height={400} />
          </div>
        </OwlCarousel>
      </div>
      <div className="col-md-3">
        <img src={img2} className="w-100" height={200} />
        <img src={img3} className="w-100" height={200} />
      </div>
    </div>
  );
}
