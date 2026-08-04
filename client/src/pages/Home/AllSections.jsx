import ScrollReveal from "../../components/common/ScrollReveal";
import Container from "../../components/layout/Container";
import img1 from "./../../assets/image1.webp";
import img2 from "./../../assets/image2.webp";
import img3 from "./../../assets/image3.webp";
import img4 from "./../../assets/image4.webp";
import AnimatedCard from "../../components/cards/AnimatedCard";
import SectionTitle from "../../components/common/SectionTitle";

const allSections = [
  {
    id: 1,
    image: img1,
    title: "Pre-School",
    description: "2-4 Years",
  },
  {
    id: 2,
    image: img2,
    title: "Pre-Primary",
    description: "Prep I & Prep II",
  },
  {
    id: 3,
    image: img3,
    title: "Primary",
    description: "Class 1 to 5",
  },
  {
    id: 4,
    image: img4,
    title: "Secondary",
    description: "Class 6 to 10",
  },
];

const AllSections = () => {
  return (
    <section className="torn-both bg-[linear-gradient(120deg,#6bad77,#b1ffbc,#ffea95)] py-16 my-4 body-font">
      <SectionTitle
        eyebrow="Our Sections"
        title="Sections &   "
        highlightedText="Classes"
        description="All sections according to the classes"
        className="mb-6"
      />
      <Container className="">
        <ScrollReveal
          direction="zoom"
          delay={0.2}
          duration={2}
          once={false}
          className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {allSections.map((section) => (
            <AnimatedCard
              key={section.id}
              image={section.image}
              title={section.title}
              description={section.description}
            ></AnimatedCard>
          ))}
        </ScrollReveal>
      </Container>
    </section>
  );
};

export default AllSections;
