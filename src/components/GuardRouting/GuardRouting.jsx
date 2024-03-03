import React from "react";
import Home from "../Home/Home";
import Login from "../Login/Login";
import { Navigate } from "react-router-dom";
export default function GuardRouting({ children }) {
  if (localStorage.getItem("uesrToken") != null) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
}
