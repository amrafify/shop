import React from "react";
import { Link } from "react-router-dom";

export default function Allorder() {
  return (
    <div>
      <p className=" alert alert-success">Order Done</p>
      <Link to={"/home"} className="btn bg-main text-white">
        Back to home
      </Link>
    </div>
  );
}
