import ScrollReveal from "../../components/common/ScrollReveal";
import Container from "../../components/layout/Container";

const WhyChoose = () => {
  return (
    <Container className="mt-20">
      <ScrollReveal>
        <h2 className="text-3xl heading-font ">Education for Enlightenment</h2>
        <p className="border w-1/2 mt-1 mb-5 border-red-500"></p>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <ol className="body-font list-decimal list-inside space-y-2">
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
              To nurture students creativity and prepare them for a competitive
              world through a unique system of education.
            </li>
            <li>To make students technologically sensible and smart.</li>
            <li>
              To make responsible human beings through moral and ethicalvalue
              based education.
            </li>
            <li>To help the children grow as enlightened human beings.</li>
          </ol>
        </div>
      </ScrollReveal>
    </Container>
  );
};

export default WhyChoose;
