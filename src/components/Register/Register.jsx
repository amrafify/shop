import React, { useState } from "react";
import style from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Register() {
  let navg = useNavigate();
  let [erroMes, setErro] = useState("");
  let [loading, setLoading] = useState(true);
  let valid = Yup.object({
    name: Yup.string()
      .min(3, "min chra 3")
      .max(20, "max chra 20")
      .required("name required"),
    email: Yup.string().required("email required").email("enter valid email"),
    phone: Yup.string()
      .matches(/^01[1025][0-9]{8}$/, "enter valid phone")
      .required("ghone required"),
    password: Yup.string()
      .required("password required")
      .matches(/^[a-z0-9A-Z!@#$%^&*()_-]{6,16}?/, "enter valid password"),
    rePassword: Yup.string()
      .required("password required")
      .oneOf([Yup.ref("password")], "تأكد من تضابق كلمه المرور"),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: RegisterApi,
    validationSchema: valid,
  });
  async function RegisterApi(val) {
    setLoading(false);
    let req = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", val)
      .catch((err) => {
        setErro(err.response.data.message);
        setLoading(true);
      });
    if (req.data.message == "success") {
      setLoading(true);
      navg("/login");
    }
  }
  return (
    <div className="container py-5">
      <h2>Register Now......</h2>
      {erroMes != "" ? (
        <div className=" alert alert-danger">{erroMes}</div>
      ) : (
        ""
      )}

      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="text"
          className="form-control"
          name="name"
          id="name"
        />
        {formik.errors.name && formik.touched.name ? (
          <div className=" alert alert-danger mt-1">{formik.errors.name}</div>
        ) : (
          ""
        )}

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
        <label htmlFor="phone">phone:</label>
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="tel"
          className="form-control"
          name="phone"
          id="phone"
        />
        {formik.errors.phone && formik.touched.phone ? (
          <div className=" alert alert-danger mt-1">{formik.errors.phone}</div>
        ) : (
          ""
        )}
        <label htmlFor="password">password:</label>
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="password"
          className="form-control"
          name="password"
          id="password"
        />
        {formik.errors.password && formik.touched.password ? (
          <div className=" alert alert-danger mt-1">
            {formik.errors.password}
          </div>
        ) : (
          ""
        )}
        <label htmlFor="rePassword">rePassword:</label>
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="password"
          className="form-control"
          name="rePassword"
          id="rePassword"
        />
        {formik.errors.rePassword && formik.touched.rePassword ? (
          <div className=" alert alert-danger mt-1">
            {formik.errors.rePassword}
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
            Register
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
