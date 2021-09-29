import React from "react";
// import "../css/login.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
const schema = yup.object().shape({
  firstname: yup.string().required().min(2).max(30),
  lastname: yup.string().required().min(2).max(32),
  password: yup.string().required().min(8).max(32),
});
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmitHandler = (data) => {
    console.log({ data });
    reset();
  };

  return (
    <div className="container">
      <h2 className="heading">Login</h2>

      <form className="form" onSubmit={handleSubmit(onSubmitHandler)}>
        <label className="control-label" htmlFor="firstName">
          First Name
        </label>
        <div className="input-wrapper">
          <i className="fa fa-user"></i>
          <input
            {...register("firstname")}
            type="text"
            className="firstName"
            placeholder="First Name"
          />
        </div>
        <p>{errors.firstname?.message}</p>

        <label className="control-label" htmlFor="lastName">
          Last Name
        </label>

        <div className="input-wrapper">
          <i className="fa fa-user"></i>
          <input
            {...register("lastname")}
            type="text"
            className="lastName"
            placeholder="Last Name"
          />
        </div>
        <p>{errors.lastname?.message}</p>
        <label className="control-label" htmlFor="password">
          {" "}
          Password
        </label>

        <div className="input-wrapper">
          <i class="fas fa-lock"></i>
          <input
            {...register("password")}
            type="password"
            className="password"
            placeholder="Password"
          />
        </div>
        <p>{errors.password?.message}</p>
        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
