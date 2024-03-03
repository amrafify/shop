import React, { useContext } from "react";
import style from "./Navbar.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../freshcart-logo.svg";
import { UesrContext } from "../../context/TokenContext";
import { CartContext } from "../../context/CartContext";
export default function Navbar() {
  let { numsItem } = useContext(CartContext);
  let navg = useNavigate();
  let { uesrToken, setUesrToken } = useContext(UesrContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"home"}>
          <img src={logo} alt="Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {uesrToken != null ? (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to={"home"}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={"products"}>
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={"category"}>
                  Category
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={"cart"}>
                  Cart
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={"brands"}>
                  Brands
                </NavLink>
              </li>
            </ul>
          ) : (
            ""
          )}

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex justify-content-center align-items-center gap-2">
              <i className="fa-brands fa-facebook"></i>
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-youtube"></i>
              <i className="fa-brands fa-spotify"></i>
            </li>
            {uesrToken != null ? (
              <>
                <NavLink to={"/cart"} className=" position-relative me-4">
                  <i className=" fa-solid text-main fa-cart-shopping nav-link "></i>
                  <span className=" position-absolute translate-middle-y  text-main  numitem rounded-circle">
                    <div className=" d-flex justify-content-center align-items-center">
                      {numsItem}
                    </div>
                  </span>
                </NavLink>
                <li
                  className="nav-item"
                  onClick={() => {
                    localStorage.removeItem("uesrToken");
                    setUesrToken(null);
                    navg("/login");
                  }}
                >
                  <span className="nav-link cursor-pointer">Logout</span>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"login"}>
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/"}>
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
