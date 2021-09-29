import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import * as yup from "yup";
const schema = yup.object().shape({
  name: yup.string().required().min(2).max(30),
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
  const onSubmitHandler = async (data) => {
    const res = await axios.post("http://localhost:3001/login", data);
    if ((res.statusText = "OK")) {
      console.log(res.data.data);
      alert("login successful");
      window.location.href = "http://localhost:3000/";
    } else {
      alert("invalid username or password");
    }
    console.log({ data });
    reset();
  };

  return (
    <div className="container">
      <h2 className="heading">Login</h2>

      <form className="form" onSubmit={handleSubmit(onSubmitHandler)}>
        <label className="control-label" htmlFor="Name">
          Name
        </label>
        <div className="input-wrapper">
          <i className="fa fa-user"></i>
          <input
            {...register("name")}
            type="text"
            className="Name"
            placeholder="Name"
          />
        </div>
        <p>{errors.name?.message}</p>

        <label className="control-label" htmlFor="password">
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
