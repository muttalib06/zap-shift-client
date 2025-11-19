import React from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router";
import { AuthContext } from "../../context/AuthProvider";
import authImg from "../../assets/authImage.png";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log("after submit", data);
  };
  return (
    <div className="flex items-center">
      <div className="flex-1">
        <div>
          <h2 className="font-extrabold text-4xl">Welcome Back!</h2>
          <p>Login with ZapShift</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: "email is required" })}
              className="input "
              placeholder="Email"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "password is required",
              })}
              className="input"
              placeholder="Password"
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="input btn bg-primary mt-4">Login</button>
          </fieldset>
        </form>
        <p className="mt-4">
          Don't have any account?
          <NavLink className="text-blue-500 mx-2" to="/register">
            Register
          </NavLink>
        </p>

        <div className="flex items-center  input border-none">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-1 text-gray-500 font-semibold">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button className="btn bg-gray-300 text-black border-[#e5e5e5] input">
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
      </div>

      <div className="flex-1">
        <img src={authImg} alt="" />
      </div>
    </div>
  );
};

export default Login;
