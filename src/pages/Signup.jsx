import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { object, string } from "yup";
import { Formik } from "formik";
import { Link } from "react-router-dom";

function Signup() {
  let userSchema = object({
    username: string()
      .required("Username is required")
      .min(4, "Username must be at least 4 characters long"),
    email: string()
      .email()
      .typeError("not a valid email format")
      .required("Email is required"),
    password: string()
      .required()
      .min(8, "Password must be at least 8 characters long"),
  });

  const handlecustomSubmit = async (values) => {
    console.log("Submitting:", values); // Debugging log
    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            user_name: values.username,
          },
        },
      });
      console.log("Sign up result:", data, error); // Debugging log
    } catch (error) {
      console.error("Error during sign up:", error); // Debugging log
    }
    alert('check your email for verfication link')
  };

  return (
    <>
      <div className="flex flex-col gap-2 m-auto">
      <div>
            <h1 className=" text-4xl bg-blue-400 text-white  font-black p-2  rounded-b-lg  mt-0">TaskIte</h1>
          </div>

        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          validationSchema={userSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true); // Indicate that submission is in progress
            await handlecustomSubmit(values);
            setSubmitting(false); // Reset submission status
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form className="flex flex-col gap-4 items-center m-auto w-full p-4 max-w-[500px]">
              <div className="w-full max-w-[500px]">
                <h2 className="text-lg text-blue-300">Username</h2>
                <input
                  className="border-2 border-blue-200 rounded-lg p-2 w-full max-w-[500px] "
                  type="text"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                />
                {touched.username && errors.username && (
                  <div className="text-red-600">{errors.username}</div>
                )}
              </div>

              <div className="w-full max-w-[500px]">
                <h2 className="text-lg text-blue-300">Email</h2>
                <input
                  className="border-2 border-blue-200 rounded-lg p-2 w-full max-w-[500px] "
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
                {touched.email && errors.email && (
                  <div className="text-red-600">{errors.email}</div>
                )}
              </div>

              <div className="w-full max-w-[500px]">
                <h2 className="text-lg text-blue-300">Password</h2>
                <input
                  className="border-2 border-blue-200 rounded-lg p-2 w-full max-w-[500px] "
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                />
                {touched.password && errors.password && (
                  <div className="text-red-600">{errors.password}</div>
                )}
              </div>
              <div className='flex flex-row gap-4 items-center'>
          <p>Already Have an account?</p>
          <Link to={"/"}  className="font-bold text-blue-400">Login</Link>
        </div>
              <button className="bg-blue-300 uppercase p-2 rounded-lg text-white hover:bg-blue-400 w-[100px]" type="submit" onClick={handleSubmit}>Sign Up</button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default Signup;
