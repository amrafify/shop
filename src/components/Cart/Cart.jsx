import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import { CartContext } from "../../context/CartContext";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Cart() {
  let { getUesrCart, clearCart, removeCart, setNumsItem, updateCart } =
    useContext(CartContext);
  async function getuesrdata() {
    setLoading(true);
    let req = await getUesrCart().catch((erro) => {
      if (erro.response.data.statusMsg == "fail") {
        setcartData(null);
      }
      setLoading(false);
      console.log(erro);
    });
    if (req?.data.status == "success") {
      setLoading(false);
      setcartData(req?.data.data);
    }
  }
  let [cartData, setcartData] = useState(null);
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    getuesrdata();
  }, []);
  async function emptyCart() {
    let req = await clearCart().catch((erro) => {
      console.log(erro);
    });
    if (req?.data?.message == "success") {
      setNumsItem(req?.data.numOfCartItems);
      setcartData(req?.data.data);
    }
    console.log(req);
  }
  async function RemoveItem(id) {
    let req = await removeCart(id).catch((erro) => {
      console.log(erro);
    });
    if (req?.data.status == "success") {
      setNumsItem(req.data.numOfCartItems);
      setcartData(req?.data.data);
    }
  }
  async function UpdateCart(id, count) {
    if (count == 0) {
      RemoveItem(id);
    } else {
      let req = await updateCart(id, count).catch((erro) => {
        console.log(erro);
      });
      if (req?.data.status == "success") {
        setcartData(req?.data.data);
      }
    }
  }
  return (
    <>
      {loading ? (
        <div className=" loading d-flex justify-content-center align-items-center bg-main position-fixed top-0 end-0 start-0 bottom-0">
          <span className="loader"></span>
        </div>
      ) : (
        <>
          {cartData == null ? (
            <div className=" alert alert-danger">Cart Empty</div>
          ) : (
            <div className=" container bg-light-subtle">
              <button className="btn btn-danger mb-5 mt-3" onClick={emptyCart}>
                Clear cart
              </button>
              {cartData?.products?.map((el) => {
                return (
                  <div className="row align-items-center mb-3">
                    <div className="col-md-10">
                      <div className="row align-items-center">
                        <div className="col-md-2">
                          <img
                            src={el.product.imageCover}
                            className="w-100"
                            alt=""
                          />
                        </div>
                        <div className="col-md-10">
                          <h6>{el.product.title}</h6>
                          <h5 className=" text-muted">price: {el.price}EGP</h5>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                              RemoveItem(el.product._id);
                            }}
                          >
                            Remove <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <span
                        className="btn btn-success btn-sm"
                        onClick={() => {
                          UpdateCart(el.product._id, el.count + 1);
                        }}
                      >
                        <i className=" fa-solid fa-plus"></i>
                      </span>
                      <span className="mx-2">{el.count}</span>
                      <span
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          UpdateCart(el.product._id, el.count - 1);
                        }}
                      >
                        <i className=" fa-solid fa-minus"></i>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
      <h3>Total price: {cartData?.totalCartPrice}EGP</h3>
      <Link
        to={"/checkout/" + cartData?._id}
        className="btn bg-main btn-sm text-white"
      >
        Check Out
      </Link>
    </>
  );
}
