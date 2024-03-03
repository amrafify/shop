import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

export default function Catagaryslider() {
  function getCata() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  let { data } = useQuery("catagary", getCata);
  return (
    <div>
      <OwlCarousel items={6} autoplay autoplayTimeout={3000} loop>
        {data?.data.data.map((el) => {
          return (
            <div className="item">
              <img src={el.image} className="w-100" height={200} />
              <h5>{el.name}</h5>
            </div>
          );
        })}
      </OwlCarousel>
    </div>
  );
}
