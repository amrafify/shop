import React, { useContext, useEffect } from "react";
import style from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { UesrContext } from "../../context/TokenContext";
import { CartContext } from "../../context/CartContext";
export default function Layout() {
  let { getUesrCart, setNumsItem } = useContext(CartContext);
  let { setUesrToken } = useContext(UesrContext);
  useEffect(() => {
    if (localStorage.getItem("uesrToken") != null) {
      setUesrToken(localStorage.getItem("uesrToken"));
      getuesrCart();
    }
  }, []);
  async function getuesrCart() {
    let req = await getUesrCart().catch((err) => {
      console.log(err);
    });
    console.log(req);
    if (req?.data?.status == "success") {
      setNumsItem(req.data.numOfCartItems);
    }
  }
  return (
    <div>
      <Navbar />
      <div className=" container mt-3">
        <div className="pt-5">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
