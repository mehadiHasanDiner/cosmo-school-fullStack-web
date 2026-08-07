import { Outlet } from "react-router";
import Navbar from "../components/layout/Navbar";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[linear-gradient(110deg,#469bea_0%,#29b7d4_50%,#08cda8_100%)] text-base-content">
      <Navbar />
      <main className="-mt-26">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
