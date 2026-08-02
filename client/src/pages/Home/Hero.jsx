import heroVideo from "../../assets/hero.webm";
import thumbnail from "../../assets/hero-thumbnail.jpg";
import { useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import Button from "../../components/common/Button";

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  return (
    <section className="relative h-screen w-full overflow-hidden body-font">
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
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight heading-font">
            Welcome To <br />
            Cosmo School
          </h1>

          <p className="mt-6 max-w-xl text-lg text-gray-200 body-font">
            Empowering students through quality education and innovation.
          </p>

          <div className="flex items-center space-x-2">
            <Link
              to="/admission"
              className=" mt-8
              group relative isolate flex min-h-11
              items-center gap-2 overflow-hidden
              rounded-full border border-accent
              bg-accent px-5 text-sm font-bold text-white
              shadow-[0_10px_24px_rgba(229,43,50,0.24)]
              transition-all duration-300
              hover:-translate-y-1
              hover:shadow-[0_16px_30px_rgba(229,43,50,0.30)]
              active:translate-y-0 active:scale-[0.97]
            "
            >
              <span
                aria-hidden="true"
                className="
                  absolute inset-y-0 -left-16 -z-10
                  w-12 -skew-x-12 bg-white/25
                  transition-all duration-700
                  group-hover:left-[115%]
                "
              />
              Limited Time Offer
              <ArrowUpRight
                className="
                  size-4 transition-transform duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </Link>
            <Button
              variant="primary"
              onClick={() =>
                window.open(
                  "https://www.youtube.com/watch?v=dbYLiacxDq0",
                  "_blank",
                )
              }
              className="btn btn-primary mt-8 rounded-full px-8 body-font transition-all duration-300 hover:-translate-y-1 bg-transparent text-white text-sm"
            >
              Watch Full Video
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
