import { Link, useLocation, useNavigate } from "react-router";
import Button from "../../components/common/Button";
import SocialLogin from "./SocialLogin";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";

const Register = () => {
  const [error, setError] = useState("");
  const { registerUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm();

  const password = useWatch({
    control,
    name: "password",
  });

  const handleSignUp = (data) => {
    setError("");
    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(location.state || "/dashboard");
      })
      .catch((error) => {
        setError(error);
      });
  };

  //prev এটার কাজ হলো আগের state-এর উল্টো value করা।
  const handleShowPassword = (type) => {
    if (type === "password") {
      setShowPassword((prev) => !prev);
    }
    if (type === "confirmPassword") {
      setShowConfirmPassword((prev) => !prev);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen flex-col  body-font mt-20">
      <div className="bg-green-200 px-8 py-5 rounded-2xl shadow-2xl">
        <form onSubmit={handleSubmit(handleSignUp)}>
          <fieldset className="fieldset">
            <h2 className="text-4xl font-bold heading-font mb-2 text-center">
              {" "}
              Sign Up
            </h2>
            {/* name */}
            <label className="label">Name</label>
            <input
              type="name"
              className="input"
              placeholder="Your name"
              {...register("name", { required: true })}
            />
            {errors.name?.type === "required" && (
              <p className="text-red-600">Name is required</p>
            )}

            {/* email */}
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Email"
              {...register("email", { required: "Email Address is required" })}
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}

            {/* password */}
            <label className="label">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input "
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be more than 6 character",
                  },
                })}
              />
              {showPassword ? (
                <span
                  onClick={() => handleShowPassword("password")}
                  className="absolute right-3 top-3 text-green-800/80 cursor-pointer"
                >
                  <FaRegEye size={18} />
                </span>
              ) : (
                <span
                  onClick={() => handleShowPassword("password")}
                  className="absolute right-3 top-3 text-green-800/80 cursor-pointer"
                >
                  <FaEyeSlash size={18} />
                </span>
              )}
            </div>
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}

            {/* confirm password */}
            <label className="label">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="input"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Password didn't match",
                })}
              />
              {showConfirmPassword ? (
                <span
                  onClick={() => handleShowPassword("confirmPassword")}
                  className="absolute right-3 top-3 text-green-800/80 cursor-pointer"
                >
                  <FaRegEye size={18} />
                </span>
              ) : (
                <span
                  onClick={() => handleShowPassword("confirmPassword")}
                  className="absolute right-3 top-3 text-green-800/80 cursor-pointer"
                >
                  <FaEyeSlash size={18} />
                </span>
              )}
            </div>
            {errors.confirmPassword && (
              <p className="text-red-600">{errors.confirmPassword.message}</p>
            )}

            <div className="text-center">
              <a className="link link-hover">Forgot password?</a>
            </div>
            <Button variant="primary" className=" mt-2 cursor-pointer">
              Register
            </Button>
            <p className="text-red-600 text-center">{error?.message}</p>

            <p className="my-2 text-center">
              Already have an account?{" "}
              <Link
                state={location?.state}
                to="/login"
                className="text-blue-600 cursor-pointer hover:font-bold"
              >
                Login
              </Link>
            </p>
          </fieldset>
        </form>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;
