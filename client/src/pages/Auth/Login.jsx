import { Link, useLocation, useNavigate } from "react-router";
import Button from "../../components/common/Button";
import SocialLogin from "./SocialLogin";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();

  const handleSignIn = (data) => {
    signInUser(data.email, data.password).then((result) => {
      console.log(result.user);
      navigate("/").catch((error) => {
        console.log(error.message);
      });
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen flex-col  body-font mt-5">
      <div className="bg-base-200 px-8 py-5 rounded-2xl shadow-2xl">
        <form onSubmit={handleSubmit(handleSignIn)}>
          <fieldset className="fieldset">
            <h2 className="text-4xl font-bold heading-font mb-2 text-center">
              {" "}
              Login
            </h2>
            {/* email */}
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}

            {/* password */}
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be more than 6 character",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
            <div className="text-center">
              <a className="link link-hover">Forgot password?</a>
            </div>
            <Button variant="primary" className=" mt-2 cursor-pointer">
              Login
            </Button>
            <p className="my-2 text-center">
              Don't have an account?{" "}
              <Link
                state={location?.state}
                to="/register"
                className="text-blue-600 cursor-pointer hover:font-bold"
              >
                Sign Up
              </Link>
            </p>
          </fieldset>
        </form>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Login;
