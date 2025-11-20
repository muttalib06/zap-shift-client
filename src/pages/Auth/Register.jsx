import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthProvider";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Spinner from "../../components/common/Spinner";
import authImg from "../../assets/authImage.png";
import axios from "axios";

const Register = () => {
  const { createUser, signInGoogle, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  console.log(location)
  const from = location.state?.from?.pathname || "/";

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const formSubmit = (data) => {
    // get image file;
    const profileImage = data.image[0];
    setError("");
    setLoading(true);
    createUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", profileImage);

        // send the to imageBB and get the url;
        const key = import.meta.env.VITE_IMAGEBB_API_KEY;
        const uploadImgURL = `https://api.imgbb.com/1/upload?key=${key}`;
        axios.post(uploadImgURL, formData).then((response) => {
          const imageUrl = response.data.data.url;
          const name = data.name;
          updateUserProfile(name, imageUrl)
            .then(() => {})
            .catch((error) => {
              if (error.code === "auth/network-request-failed") {
                setError(
                  "Network error! Please check your internet connection."
                );
              } else if (error.code === "auth/user-token-expired") {
                setError("Session expired. Please sign in again.");
              } else if (error.code === "auth/invalid-user-token") {
                setError(
                  "Your session is invalid. Try logging out and signing in again."
                );
              } else {
                setError("Profile update failed! Please try again later.");
              }
            });
        });

        navigate(from, { replace: true });
      })
      .catch((error) => {
        let message = "";

        if (error.code === "auth/email-already-in-use") {
          message =
            "This email is already registered. Please login or use a different email.";
        } else if (error.code === "auth/invalid-email") {
          message =
            "The email address is not valid. Please check and try again.";
        } else if (error.code === "auth/weak-password") {
          message = "Password is too weak. Please use at least 6 characters.";
        } else if (error.code === "auth/user-not-found") {
          message = "No account found with this email. Please sign up first.";
        } else {
          message = "Something went wrong. Please try again.";
        }
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSignUpGoogle = () => {
    setLoading(true);
    setError("");
    signInGoogle()
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((error) => {
        let message;

        if (error.code === "auth/popup-closed-by-user") {
          message = "Google sign-in was cancelled. Please try again.";
        } else if (error.code === "auth/network-request-failed") {
          message = "Network error. Please check your connection.";
        } else if (
          error.code === "auth/account-exists-with-different-credential"
        ) {
          message =
            "An account already exists with the same email using a different sign-in method.";
        } else if (error.code === "auth/cancelled-popup-request") {
          message = "Another sign-in attempt was cancelled.";
        } else {
          message =
            "Something went wrong during Google sign-in. Please try again later.";
        }

        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  if (loading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className="flex items-center flex-col md:flex-row">
      <div className="flex-1">
        <div>
          <h2 className="font-extrabold text-4xl">Create an Account</h2>
          <p>Register with ZapShift</p>
        </div>

        <form onSubmit={handleSubmit(formSubmit)} className="mt-4">
          <fieldset className="fieldset">
            {/* name */}
            <label className="label">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="input "
              placeholder="Name"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
            {/* photo */}
            <label className="label">Photo</label>
            <input
              type="file"
              {...register("image", { required: "Image is required" })}
              className="file-input"
            />
            {errors.image && (
              <p className="text-red-500">{errors.image.message}</p>
            )}
            {/* email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email formate",
                },
              })}
              className="input "
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
                  message:
                    "Password must include uppercase, lowercase, number & special character",
                },
              })}
              className="input"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>

            <p className="my-2 text-red-500">{error}</p>
            <button className="input btn bg-primary mt-4">Register</button>
          </fieldset>
        </form>
        <p className="mt-4">
          Already have an account?
          <NavLink state={location.state} className="text-blue-500 mx-2" to="/login">
            Login
          </NavLink>
        </p>

        <div className="flex items-center  input border-none">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-1 text-gray-500 font-semibold">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button
          onClick={handleSignUpGoogle}
          className="btn bg-gray-300 text-black border-[#e5e5e5] input"
        >
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
          Register with Google
        </button>
      </div>

      <div className="flex-1">
        <img src={authImg} alt="" />
      </div>
    </div>
  );
};

export default Register;
