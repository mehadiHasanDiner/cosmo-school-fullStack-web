import ScrollReveal from "../../components/common/ScrollReveal";
import Container from "../../components/layout/Container";
import SectionTitle from "../../components/common/SectionTitle";
import schoolBuilding from "../../assets/school-building.webp";
import Button from "../../components/common/Button";
import { ArrowRight } from "lucide-react";

const AboutUs = () => {
  return (
    <Container className="my-20 body-font">
      <ScrollReveal
        direction="up"
        delay={0.2}
        duration={2}
        once={false}
        className=" grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div className="">
          <div className="">
            <SectionTitle
              title="About"
              highlightedText="Us"
              description="Sha-go-tom!"
              className="mb-6"
            />
          </div>
          <div className="space-y-6">
            <p>
              About us We, the Cosmo School team has started our expedition in
              January 2013 with a view to making ideal students in terms of
              moral development, humanity and education. We prepare students to
              understand, contribute to, and succeed in a rapidly changing
              society, and thus make the world better and more just place.
            </p>
            <p>
              We follow the national curriculum in English version. We believe
              in a motto ‘First in Class, First in Life’. You are always welcome
              to our team.
            </p>
            <Button variant="outline" className="flex">
              Learn More{" "}
              <span>
                <ArrowRight />
              </span>{" "}
            </Button>
          </div>
        </div>
        <div className="group relative h-full min-h-112 overflow-hidden rounded-2xl border border-[#009bba] bg-white/10 ">
          <img
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            src={schoolBuilding}
            alt=""
          />
        </div>
      </ScrollReveal>
    </Container>
  );
};

export default AboutUs;
