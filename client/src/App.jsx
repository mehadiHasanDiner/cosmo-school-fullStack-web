import "./App.css";
import Button from "./components/ui/Button";

function App() {
  return (
    <div className="">
      <section className="relative min-h-screen">
        {/* Background */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0B8F4D_0%,#16A34A_40%,#F5C400_100%)]"></div>

        {/* Overlay */}
        {/* <div className="absolute inset-0 bg-black/30"></div> */}

        {/* Content */}
        <div className="relative z-10 flex min-h-screen items-center justify-center text-white">
          <div className="text-center">
            <h1 className="heading-font text-6xl font-bold">
              Welcome to Cosmo School
            </h1>

            <p className="body-font text-2xl mt-4">
              First in Class, First in Life
            </p>
            {/* <button className="btn btn-xl text-white mt-4 bg-[linear-gradient(135deg,#0B8F4D,#08703C)] text-xl">
              Apply Online
            </button> */}
            <Button variant="danger">Apply Online</Button>
          </div>
        </div>
      </section>

      <div className="card"></div>
    </div>
  );
}

export default App;
