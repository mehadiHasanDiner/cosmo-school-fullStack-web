import { useNavigate } from "react-router";
import pageNotFound from "./../assets/errorpage.jpg";
import { ArrowLeft } from "lucide-react";
const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white flex flex-col items-center justify-center h-screen">
      <title>Error - 404</title>
      <div className="w-11/12 mx-auto ">
        <img className="w-5/12 block mx-auto" src={pageNotFound} alt="" />
      </div>
      <h3 className="text-3xl text-center font-bold text-error my-2">
        Page Not Found 😱
      </h3>
      <p className="text-center text-gray-500 italic text-lg">
        The page your are looking for is not found
      </p>

      <button
        onClick={() => navigate("/")}
        className="btn btn-secondary rounded-full mx-auto my-3 flex transition-all hover:-translate-y-1 delay-100 duration-300"
      >
        <span>
          <ArrowLeft></ArrowLeft>
        </span>{" "}
        Home Page
      </button>
    </div>
  );
};

export default ErrorPage;
