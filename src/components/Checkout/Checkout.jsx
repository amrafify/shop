import { useFormik } from "formik";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { CartContext } from "../../context/CartContext";

export default function Checkout() {
  let { chickOutPayment } = useContext(CartContext);
  let { id } = useParams();
  let validationSchema = Yup.object({
    details: Yup.string()
      .required("details required")
      .matches(/^[\w- ]{3,}$/, "enter valid details"),
    phone: Yup.string()
      .required("phone required")
      .matches(/^01[1250][0-9]{8}$/, "enter valid phone"),
    city: Yup.string()
      .required("city required")
      .matches(/^[\w- ]{3,}$/, "enter valid city"),
  });
  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: checkPayment,
    validationSchema,
  });
  async function checkPayment(val) {
    let req = await chickOutPayment(id, val).catch((err) => {
      console.log(err);
    });
    if (req.data.status == "success") {
      window.open(req.data.session.url, "_self");
    }
    console.log(req);
  }
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          placeholder="enter your city"
          name="city"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className=" form-control mb-2"
        />
        {formik.touched.city && formik.errors.city ? (
          <p className=" text-danger">{formik.errors.city}</p>
        ) : (
          ""
        )}

        <input
          type="tel"
          placeholder="enter your phone"
          name="phone"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className=" form-control mb-2"
        />
        {formik.touched.phone && formik.errors.phone ? (
          <p className=" text-danger">{formik.errors.phone}</p>
        ) : (
          ""
        )}

        <textarea
          placeholder="enter details"
          name="details"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className=" form-control mb-2"
        ></textarea>
        {formik.touched.details && formik.errors.details ? (
          <p className=" text-danger">{formik.errors.details}</p>
        ) : (
          ""
        )}
        <button
          disabled={!(formik.isValid && formik.dirty)}
          type="submit"
          className="btn btn-danger"
        >
          pay <i className=" fa-brands fa-cc-visa"></i>
        </button>
      </form>
    </div>
  );
}
