import ScrollReveal from "../../components/common/ScrollReveal";
import Container from "../../components/layout/Container";
import studentsImg from "../../assets/students.jpg";
import { motion } from "motion/react";

const EduEnlightenment = () => {
  return (
    <section className="torn-both bg-[linear-gradient(110deg,#469bea_0%,#29b7d4_50%,#08cda8_100%)] py-16 my-4">
      <Container className="">
        <ScrollReveal
          direction="zoom"
          delay={0.2}
          duration={2}
          once={false}
          className=" grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="">
            <div className="flex mb-5">
              {" "}
              <h2 className="text-4xl heading-font font-bold me-2">
                Education for
              </h2>
              <span className="relative inline-block text-primary">
                <h2 className="text-4xl heading-font font-bold text-green-200 mb-1">
                  Enlightenment
                </h2>

                <motion.span
                  className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-linear-to-r from-primary via-secondary to-accent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.75,
                    delay: 0.25,
                  }}
                  style={{ transformOrigin: "left" }}
                />
              </span>
            </div>
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
          <div className="group relative h-full min-h-112 overflow-hidden rounded-2xl border border-[#009bba] bg-white/10 ">
            <img
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              src={studentsImg}
              alt=""
            />
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
};

export default EduEnlightenment;
