import axios from "axios";
import { createContext, useState } from "react";
import Swal from "sweetalert2";

export let CartContext = createContext();
export function CartContextProvid({ children }) {
  let [numsItem, setNumsItem] = useState(0);
  function getUesrCart() {
    let option = {
      headers: {
        token: localStorage.getItem("uesrToken"),
      },
    };
    return axios.get("https://ecommerce.routemisr.com/api/v1/cart", option);
  }

  async function addCart(productId) {
    let body = {
      productId,
    };
    let option = {
      headers: {
        token: localStorage.getItem("uesrToken"),
      },
    };
    let req = await axios
      .post("https://ecommerce.routemisr.com/api/v1/cart", body, option)
      .catch((erro) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      });
    if (req.data.status == "success") {
      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
      });
      setNumsItem(req.data.numOfCartItems);
    }
    console.log(req);
  }
  function removeCart(id) {
    let option = {
      headers: {
        token: localStorage.getItem("uesrToken"),
      },
    };
    return axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      option
    );
  }
  function clearCart() {
    let option = {
      headers: {
        token: localStorage.getItem("uesrToken"),
      },
    };
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, option);
  }
  function updateCart(id, count) {
    let option = {
      headers: {
        token: localStorage.getItem("uesrToken"),
      },
    };
    let body = {
      count,
    };
    return axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      body,
      option
    );
  }
  function chickOutPayment(id, data) {
    let option = {
      headers: {
        token: localStorage.getItem("uesrToken"),
      },
    };
    let body = {
      shippingAddress: data,
    };
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=https://amrafify.github.io/shop/#`,
      body,
      option
    );
  }
  return (
    <CartContext.Provider
      value={{
        removeCart,
        clearCart,
        getUesrCart,
        setNumsItem,
        addCart,
        updateCart,
        numsItem,
        chickOutPayment,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
