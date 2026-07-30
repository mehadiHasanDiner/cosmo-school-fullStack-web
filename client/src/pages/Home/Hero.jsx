import heroVideo from "../../assets/hero.webm";
import thumbnail from "../../assets/hero-thumbnail.jpg";
import { useState } from "react";

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  return (
    <section className="relative h-screen w-full overflow-hidden body-font -mt-25">
      {/* loading state */}
      {!loaded && (
        <div className="absolute inset-0">
          <img src={thumbnail} className="h-full w-full object-cover" alt="" />

          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <span className="loading loading-spinner loading-lg text-white"></span>
          </div>
        </div>
      )}

      {/* Background Video */}
      <video
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        src={heroVideo}
        type="video/webm"
        autoPlay
        muted
        loop
        playsInline
        poster={thumbnail}
        onCanPlay={() => setLoaded(true)}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight heading-font">
            Welcome To <br />
            Cosmo School
          </h1>

          <p className="mt-6 max-w-xl text-lg text-gray-200 body-font">
            Empowering students through quality education and innovation.
          </p>

          <button
            onClick={() =>
              window.open(
                "https://www.youtube.com/watch?v=dbYLiacxDq0",
                "_blank",
              )
            }
            className="btn btn-primary mt-8 rounded-full px-8 body-font"
          >
            Watch Full Video
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
