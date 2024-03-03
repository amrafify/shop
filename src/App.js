import React, { useContext, useEffect } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Category from "./components/Category/Category";
import Brands from "./components/Brands/Brands";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Notfound from "./components/Notfound/Notfound";
import Cart from "./components/Cart/Cart";
import { UesrContext, UesrContextProvid } from "./context/TokenContext";
import GuardRouting from "./components/GuardRouting/GuardRouting";
import ForgetPassowrd from "./components/ForgetPassowrd/ForgetPassowrd";
import ResetPasowrd from "./components/ResetPasowrd/ResetPasowrd";
import { QueryClient, QueryClientProvider } from "react-query";
import Productsdetails from "./components/Productsdetails/Productsdetails";
import { CartContextProvid } from "./context/CartContext";
import Allorder from "./components/Allorder/Allorder";
import Checkout from "./components/Checkout/Checkout";

export default function App() {
  let queryClint = new QueryClient();
  let Routers = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "home",
          element: (
            <GuardRouting>
              <Home />
            </GuardRouting>
          ),
        },
        {
          path: "products",
          element: (
            <GuardRouting>
              <Products />
            </GuardRouting>
          ),
        },
        {
          path: "allorders",
          element: (
            <GuardRouting>
              <Allorder />
            </GuardRouting>
          ),
        },
        {
          path: "checkout/:id",
          element: (
            <GuardRouting>
              <Checkout />
            </GuardRouting>
          ),
        },
        {
          path: "productsdetails/:id",
          element: (
            <GuardRouting>
              <Productsdetails />
            </GuardRouting>
          ),
        },
        {
          path: "category",
          element: (
            <GuardRouting>
              <Category />
            </GuardRouting>
          ),
        },
        {
          path: "brands",
          element: (
            <GuardRouting>
              <Brands />
            </GuardRouting>
          ),
        },
        { path: "login", element: <Login /> },
        { index: true, element: <Register /> },
        { path: "*", element: <Notfound /> },
        { path: "forgetpassword", element: <ForgetPassowrd /> },
        {
          path: "cart",
          element: (
            <GuardRouting>
              <Cart />
            </GuardRouting>
          ),
        },
        { path: "resetpassword", element: <ResetPasowrd /> },
      ],
    },
  ]);

  return (
    <>
      <QueryClientProvider client={queryClint}>
        <CartContextProvid>
          <UesrContextProvid>
            <RouterProvider router={Routers} />
          </UesrContextProvid>
        </CartContextProvid>
      </QueryClientProvider>
    </>
  );
}
