import ScrollReveal from "../../components/common/ScrollReveal";
import Container from "../../components/layout/Container";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiUsers,
  FiBookOpen,
  FiAward,
  FiArrowRight,
} from "react-icons/fi";

const AdmissionOffer = () => {
  const benefits = [
    {
      title: "Quality Education",
      description: "National curriculum in English version",
      icon: FiBookOpen,
    },
    {
      title: "Expert Faculty",
      description: "Dedicated and experienced teachers",
      icon: FiUsers,
    },
    {
      title: "Holistic Development",
      description: "Focus on moral, academic & extracurricular growth",
      icon: FiAward,
    },
  ];

  return (
    <section className="my-8 bg-green-700">
      <ScrollReveal direction="zoom" delay="0.5" duration="1">
        <Container className="grid min-h-screen items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:px-8 lg:py-24 body-font">
          {/* Left side content */}
          <div className="text-white">
            <h1
              className=" inline-flex items-center rounded-full
              bg-secondary px-5 py-2 
              text-xs font-black uppercase tracking-wide
              text-neutral shadow-lg "
            >
              Limited Time Offer
            </h1>

            <h1
              className="mt-8 max-w-xl text-4xl font-black
              leading-tight sm:text-5xl lg:text-6xl heading-font"
            >
              Get Up To 10%
              <span className="block">Discount</span>
            </h1>

            <h2 className="mt-7 text-xl font-bold sm:text-2xl">
              On Your Child&apos;s Admission!
            </h2>

            <p
              className="
              mt-5 max-w-xl text-base leading-8
              text-white/90 sm:text-lg
            "
            >
              Submit your inquiry today and receive an exclusive discount on
              admission fees. Join the Cosmo School family and give your child
              the best education they deserve.
            </p>

            {/* Benefits */}
            <div className="mt-9 space-y-5">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <div
                    key={benefit.title}
                    className="group flex items-start gap-4"
                  >
                    <div
                      className="
                      grid size-11 shrink-0 place-items-center
                      rounded-xl bg-white/15
                      text-white backdrop-blur-sm
                      transition-all duration-300
                      group-hover:-translate-y-1
                      group-hover:bg-secondary
                      group-hover:text-neutral
                    "
                    >
                      <Icon className="text-xl" />
                    </div>

                    <div>
                      <h3 className="text-base font-black sm:text-lg">
                        {benefit.title}
                      </h3>

                      <p className="mt-1 text-sm text-white/80 sm:text-base">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="rounded-[28px] border border-white/30
            bg-white p-6
            shadow-[0_30px_80px_rgba(0,45,36,0.35)]
            sm:p-8 lg:p-10"
          >
            <div>
              <h2 className=" text-3xl font-black text-[#034b43]">
                Inquiry Form
              </h2>
              <p className="mt-2 text-base text-neutral/70">
                Fill in your details to get discount information
              </p>
            </div>
          </div>
        </Container>
      </ScrollReveal>
    </section>
  );
};

export default AdmissionOffer;
