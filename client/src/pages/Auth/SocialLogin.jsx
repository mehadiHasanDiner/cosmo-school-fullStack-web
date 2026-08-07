import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
  return (
    <div className="text-center">
      <p className="">Or</p>
      {/* Google */}
      <button className="btn bg-neutral hover:bg-black text-white border-[#e5e5e5] w-full mt-2 transition-all hover:-translate-y-1 delay-50 duration-200 hover:shadow-lg shadow-gray-400 border-0">
        <FcGoogle color="" />
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
