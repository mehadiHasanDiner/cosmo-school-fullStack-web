import Button from "../../components/common/Button";
import ScrollReveal from "../../components/common/ScrollReveal";

const Hero = () => {
  return (
    <div>
      <h3 className=""></h3>
      <section className="relative -mt-24">
        {/* Background */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0B8F4D_0%,#16A34A_40%,#F5C400_100%)]"></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Content */}
        <div className="relative z-10 flex min-h-screen items-center justify-center text-white">
          <div className="text-center">
            <h1 className="heading-font text-6xl font-bold">
              <ScrollReveal direction="zoom" delay={0.2}>
                <h2>Welcome to Cosmo School</h2>
              </ScrollReveal>
            </h1>

            <p className="body-font text-2xl mt-4">
              First in Class, First in Life
            </p>
            {/* <button className="btn btn-xl text-white mt-4 bg-[linear-gradient(135deg,#0B8F4D,#08703C)] text-xl">
              Apply Online
            </button> */}
            <div className="space-x-2 mt-5">
              <Button>Apply Online</Button>
              <Button variant="outline" className="text-green-950">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
