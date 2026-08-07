import { Link } from "react-router";
import Button from "../../components/common/Button";
import SocialLogin from "./SocialLogin";

const Register = () => {
  return (
    <div className="flex justify-center items-center min-h-screen flex-col  body-font mt-20">
      <div className="bg-green-200 px-8 py-5 rounded-2xl shadow-2xl">
        <form>
          <fieldset className="fieldset">
            <h2 className="text-4xl font-bold heading-font mb-2 text-center">
              {" "}
              Sign Up
            </h2>
            {/* name */}
            <label className="label">Name</label>
            <input type="name" className="input" placeholder="Your name" />

            {/* email */}
            <label className="label">Email</label>
            <input type="email" className="input" placeholder="Email" />

            {/* password */}
            <label className="label">Password</label>
            <input type="password" className="input" placeholder="Password" />

            {/* password */}
            <label className="label">Confirm Password</label>
            <input
              type="password"
              className="input"
              placeholder="Confirm Password"
            />

            <div className="text-center">
              <a className="link link-hover">Forgot password?</a>
            </div>
            <Button variant="primary" className=" mt-2">
              Register
            </Button>
            <p className="my-2 text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 cursor-pointer hover:font-bold"
              >
                Login
              </Link>
            </p>
          </fieldset>
          <SocialLogin></SocialLogin>
        </form>
      </div>
    </div>
  );
};

export default Register;
