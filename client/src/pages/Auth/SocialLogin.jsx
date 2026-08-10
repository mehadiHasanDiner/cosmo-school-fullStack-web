import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";

const SocialLogin = () => {
  const { signInGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInGoogle();
      console.log(result.user);
      alert("User Logged in Successfully");
      navigate(location?.state || "/");
    } catch (err) {
      console.log(err?.message);
    }
  };
  return (
    <div className="text-center">
      <p className="">Or</p>
      {/* Google */}
      <button
        onClick={handleGoogleSignIn}
        className="btn bg-neutral hover:bg-black text-white border-[#e5e5e5] w-full mt-2 transition-all hover:-translate-y-1 delay-50 duration-200 hover:shadow-lg shadow-gray-400 border-0"
      >
        <FcGoogle color="" />
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
