import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UesrContext } from "../../context/TokenContext";
export default function Login() {
  let { setUesrToken } = useContext(UesrContext);
  let navg = useNavigate();
  let [erroMes, setErro] = useState("");
  let [loading, setLoading] = useState(true);
  let valid = Yup.object({
    email: Yup.string().required("email required").email("enter valid email"),
    password: Yup.string()
      .required("password required")
      .matches(/^[a-z0-9A-Z!@#$%^&*()_-]{6,16}?/, "enter valid password"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: LoginApi,
    validationSchema: valid,
  });
  async function LoginApi(val) {
    setLoading(false);
    let req = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", val)
      .catch((err) => {
        setErro(err.response.data.message);
        setLoading(true);
      });
    if (req.data.message == "success") {
      setLoading(true);
      setUesrToken(req.data.token);
      localStorage.setItem("uesrToken", req.data.token);
      navg("/home");
    }
  }
  return (
    <div className="container py-5">
      <h2>Login Now......</h2>
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
        <div className="d-flex justify-content-between align-items-center">
          <Link to={"/forgetpassword"} className=" fw-bolder">
            Forget Password .......
          </Link>
          {loading ? (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn bg-main text-white mt-3"
            >
              Login
            </button>
          ) : (
            <button type="button" className=" btn bg-main text-white mt-3">
              <i className=" fa-solid fa-spinner fa-spin"></i>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
