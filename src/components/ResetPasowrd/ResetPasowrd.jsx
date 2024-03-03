import React, { useContext, useState } from "react";
import style from "./ResetPasowrd.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function ResetPasowrd() {
  let navg = useNavigate();
  let [erroMes, setErro] = useState("");
  let [loading, setLoading] = useState(true);
  let valid = Yup.object({
    email: Yup.string().required("email required").email("enter valid email"),
    newPassword: Yup.string()
      .required("password required")
      .matches(/^[a-z0-9A-Z!@#$%^&*()_-]{6,16}?/, "enter valid password"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: resetPassowrd,
    validationSchema: valid,
  });
  async function resetPassowrd(val) {
    setLoading(false);
    let req = await axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", val)
      .catch((err) => {
        setErro(err.response.data.message);
        setLoading(true);
      });
    if (req.statusText == "OK") {
      setLoading(true);
      navg("/login");
    }
  }
  return (
    <div className="container py-5">
      {erroMes != "" ? (
        <div className=" alert alert-danger">{erroMes}</div>
      ) : (
        ""
      )}
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">email:</label>
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="email"
          className="form-control"
          name="email"
          id="email"
        />
        {formik.errors.email && formik.touched.email ? (
          <div className=" alert alert-danger mt-1">{formik.errors.email}</div>
        ) : (
          ""
        )}

        <label htmlFor="newPassword">new Password:</label>
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="password"
          className="form-control"
          name="newPassword"
          id="newPassword"
        />
        {formik.errors.password && formik.touched.password ? (
          <div className=" alert alert-danger mt-1">
            {formik.errors.password}
          </div>
        ) : (
          ""
        )}
        {loading ? (
          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className="btn bg-main text-white mt-3"
          >
            Reset Password
          </button>
        ) : (
          <button type="button" className=" btn bg-main text-white mt-3">
            <i className=" fa-solid fa-spinner fa-spin"></i>
          </button>
        )}
      </form>
    </div>
  );
}
