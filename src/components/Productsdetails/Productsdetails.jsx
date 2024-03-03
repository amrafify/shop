import React, { useContext, useEffect, useState } from "react";
import style from "./Productsdetails.module.css";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { CartContext } from "../../context/CartContext";
export default function Productsdetails() {
  let { addCart } = useContext(CartContext);
  let { id } = useParams();
  let [productId, setProductId] = useState();
  useEffect(() => {
    // let imgs = document.querySelectorAll(".imgs");
    // imgs.forEach((el) => {
    //   el.addEventListener("click", (e) => {
    //     let imgPath = e.target.getAttribute("src");
    //     document.querySelector("#myImg").setAttribute("src", imgPath);
    //   });
    // });
    setProductId(id);
  }, []);

  let { data, isLoading } = useQuery(
    ["productDetails", productId],
    getProductDitalis
  );
  function getProductDitalis(quary) {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${quary.queryKey[1]}`
    );
  }
  function getSrc(e) {
    let imgPath = e.target.getAttribute("src");
    document.querySelector("#myImg").setAttribute("src", imgPath);
  }
  return (
    <>
      {isLoading ? (
        <div className=" loading d-flex justify-content-center align-items-center bg-main position-fixed top-0 end-0 start-0 bottom-0">
          <span className="loader"></span>
        </div>
      ) : (
        <div className=" container py-5">
          <div className="row align-items-center">
            <div className="col-md-4">
              <div className="row align-items-center">
                <div className="col-md-3">
                  <div className=" overflow-hidden border border-2 rounded-2 border-black">
                    {data?.data.data.images.map((el) => {
                      return (
                        <img src={el} className="w-100 imgs" onClick={getSrc} />
                      );
                    })}
                  </div>
                </div>
                <div className="col-md-9">
                  <img
                    src={data?.data.data.imageCover}
                    className="w-100"
                    id="myImg"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <h2>{data?.data.data.title}</h2>
              <p className=" text-muted">{data?.data.data.description}</p>
              <h6 className=" text-main">{data?.data.data.category.name}</h6>
              <div className=" d-flex justify-content-between">
                <span>{data?.data.data.price} EGP</span>
                <span>
                  <i className=" fa-solid fa-star rating-color">
                    {" "}
                    {data?.data.data.ratingsAverage}
                  </i>
                </span>
              </div>
              <button
                className="btn bg-main text-white d-block w-100 my-2"
                onClick={() => {
                  addCart(data?.data.data.id);
                }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
