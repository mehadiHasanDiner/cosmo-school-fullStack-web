import { Outlet } from "react-router";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <Navbar />
      <main className="-mt-26">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
