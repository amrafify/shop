import React from "react";
import style from "./Notfound.module.css";
import notfoud from "../../error.svg";

export default function Notfound() {
  return (
    <div className="text-center my-5">
      <img src={notfoud} alt="" />
    </div>
  );
}
