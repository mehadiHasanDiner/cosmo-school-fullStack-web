import ScrollReveal from "../../components/common/ScrollReveal";
import Container from "../../components/layout/Container";
import studentsImg from "../../assets/students.jpg";

const WhyChoose = () => {
  return (
    <section className="torn-both bg-[linear-gradient(110deg,#469bea_0%,#29b7d4_50%,#08cda8_100%)] py-32 my-4 ">
      <Container className="">
        <ScrollReveal className="space-y-3 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl heading-font">
              Education for Enlightenment
            </h2>
            <p className="border-3 w-1/12 text-red-600 my-4"></p>
            <ol className="body-font list-decimal list-inside space-y-3">
              <li>
                To provide all required facilities for students (curricular and
                extra curricular) under one roof.
              </li>

              <li>
                To help students introduce to their unique power of self and
                inspire to explore their great potentials.
              </li>

              <li>
                To inspire students to aim for individual and national goals.
              </li>
              <li>
                To nurture students creativity and prepare them for a
                competitive world through a unique system of education.
              </li>
              <li>To make students technologically sensible and smart.</li>
              <li>
                To make responsible human beings through moral and ethicalvalue
                based education.
              </li>
              <li>To help the children grow as enlightened human beings.</li>
            </ol>
          </div>
          <div
            className="group relative h-full
                overflow-hidden rounded-2xl
                border border-white/15
                bg-white/10
                shadow-[0_20px_50px_rgba(0,0,0,0.20)]"
          >
            <img
              className="absolute inset-0 h-full w-full object-cover
                                transition-transform duration-700
                                group-hover:scale-110"
              src={studentsImg}
              alt=""
            />
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
};

export default WhyChoose;
