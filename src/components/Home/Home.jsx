import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Mainslider from "../Mainslider/Mainslider";
import Catagaryslider from "../Catagaryslider/Catagaryslider";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
export default function Home() {
  let { addCart } = useContext(CartContext);
  let [page, setpage] = useState(1);
  function getAllProduct(quaryData) {
    console.log(quaryData);
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?page=${quaryData.queryKey[1]}`
    );
  }
  let { isLoading, isError, isFetching, data } = useQuery(
    ["productApi", page],
    getAllProduct
  );
  function getNumberPage(page) {
    setpage(page);
  }
  return (
    <>
      <Mainslider />
      <Catagaryslider />

      {isLoading ? (
        <div className=" loading d-flex justify-content-center align-items-center bg-main position-fixed top-0 end-0 start-0 bottom-0">
          <span className="loader"></span>
        </div>
      ) : (
        <>
          <div className=" container py-5">
            <div className="row g-5">
              {data?.data.data.map((el) => {
                return (
                  <div className="col-md-3" key={el.id}>
                    <div className="product h-100">
                      <Link to={"/productsdetails/" + el.id}>
                        <img
                          src={el.imageCover}
                          alt={el.title}
                          className="w-100"
                        />
                        <h6 className=" text-main">{el.category.name}</h6>
                        <h5>{el.title.split(" ").slice(0, 2).join(" ")}</h5>
                        <div className=" d-flex justify-content-between">
                          <span>{el.price} EGP</span>
                          <span>
                            <i className=" fa-solid fa-star rating-color">
                              {" "}
                              {el.ratingsAverage}
                            </i>
                          </span>
                        </div>
                      </Link>
                      <button
                        className="btn bg-main text-white d-block w-100"
                        onClick={() => addCart(el.id)}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                );
              })}
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center my-5">
                  <li className="page-item">
                    <a className="page-link" aria-label="Previous">
                      <span aria-hidden="true">«</span>
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" onClick={() => getNumberPage(1)}>
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" onClick={() => getNumberPage(2)}>
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">»</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
}
