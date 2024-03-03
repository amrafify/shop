import React, { useState } from "react";
import style from "./ForgetPassowrd.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function ForgetPassowrd() {
  let [erroMes, setErro] = useState("");
  let [loading, setLoading] = useState(true);
  let [formState, setForm] = useState(true);
  let navg = useNavigate();
  let valid = Yup.object({
    email: Yup.string().required("email required").email("enter valid email"),
  });
  let valid2 = Yup.object({
    resetCode: Yup.string()
      .required("Code required")
      .matches(/^[0-9]{3,6}$/, "Enter Code"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: forgetPassword,
    validationSchema: valid,
  });
  async function forgetPassword(val) {
    setLoading(false);
    let req = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", val)
      .catch((err) => {
        // console.log(err);
        setErro(err.response.data.message);
      });
    if (req.data.statusMsg == "success") {
      setLoading(true);
      setForm(false);
    }
    // console.log(req);
  }
  let formik2 = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: resetcode,
    validationSchema: valid2,
  });
  async function resetcode(val) {
    let req = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", val)
      .catch((err) => {
        setErro(err.response.data.message);
      });
    if (req.data.status == "Success") {
      navg("/resetpassword");
    }
    console.log(req);
  }
  return (
    <div className=" container py-5">
      {erroMes != "" ? (
        <div className=" alert alert-danger">{erroMes}</div>
      ) : (
        ""
      )}
      {formState ? (
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Enter your email</label>
          <input
            type="email"
            name="email"
            id="emai"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className=" form-control"
          />
          {formik.errors.email && formik.touched.email ? (
            <p className=" text-danger">{formik.errors.email}</p>
          ) : (
            ""
          )}
          {loading ? (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn bg-main text-white mt-3"
            >
              Send Email
            </button>
          ) : (
            <button type="button" className=" btn bg-main text-white mt-3">
              <i className=" fa-solid fa-spinner fa-spin"></i>
            </button>
          )}
        </form>
      ) : (
        <form onSubmit={formik2.handleSubmit}>
          <label htmlFor="resetCode">Enter Reset Code</label>
          <input
            onChange={formik2.handleChange}
            onBlur={formik2.handleBlur}
            type="text"
            name="resetCode"
            value={formik2.values.resetCode}
            className=" form-control"
          />
          {formik2.errors.resetCode && formik2.touched.resetCode ? (
            <p className=" text-danger">{formik2.errors.resetCode}</p>
          ) : (
            ""
          )}
          {loading ? (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn bg-main text-white mt-3"
            >
              Send Code
            </button>
          ) : (
            <button type="button" className=" btn bg-main text-white mt-3">
              <i className=" fa-solid fa-spinner fa-spin"></i>
            </button>
          )}
        </form>
      )}
    </div>
  );
}
