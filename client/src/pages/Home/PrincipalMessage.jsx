import { useRef } from "react";
import principalImg from "../../assets/principal.webp";
import Button from "../../components/common/Button";
import Container from "../../components/layout/Container";
import SectionTitle from "../../components/common/SectionTitle";
const PrincipalMessage = () => {
  const modalRef = useRef(null);

  const openModal = () => {
    modalRef.current.showModal();
  };
  const closeModal = () => {
    modalRef.current.close();
  };

  return (
    <Container className="grid grid-cols-1 md:grid-cols-2 gap-10 py-20 text-gray-700">
      <div
        className="group relative h-full min-h-112
                overflow-hidden rounded-2xl
                border border-white/15
                bg-white/10
                shadow-[0_20px_50px_rgba(0,0,0,0.20)]"
      >
        <img
          className="absolute inset-0 h-full w-full object-cover
                  transition-transform duration-700
                  group-hover:scale-105"
          src={principalImg}
          alt=""
        />
      </div>
      <div className="space-y-6 body-font">
        <SectionTitle
          eyebrow="Why Choose Us"
          title="Principal's"
          highlightedText="Message"
          description="First in Class, First in Life"
        />

        <p className="text-green-700 italic font-semibold"></p>
        <p className="mt-5">
          Welcome to Cosmo School. Since we opened our doors in January 2013,
          our focus has remained clear: helping students excel academically
          while building strong character and compassion for others.
        </p>

        <p>
          We invite your family to become part of our community. Let's work
          together to unlock your child's full potential and set them on the
          path to success.
        </p>

        <Button
          onClick={openModal}
          variant="primary"
          className="cursor-pointer mb-6 inline-block text-end"
        >
          View Full Message
        </Button>

        <p className="italic font-light text-gray-600 ">
          Principal, Cosmo School
        </p>
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog ref={modalRef} className="modal body-font">
        <div className="modal-box w-11/12 max-w-4xl h-11/12">
          <div className="mt-28">
            <div className=" flex space-x-6">
              <div className="">
                <img
                  className="rounded-full w-32 border-4 border-green-800"
                  src={principalImg}
                  alt=""
                />
              </div>
              <div className="space-y-2">
                <h4 className="text-green-800 font-bold text-2xl">
                  Principal's Office
                </h4>
                <p className="italic font-light">Cosmo School, Dhaka</p>
                <p>Email: mahbub.plcosmo@gmail.com</p>
              </div>
            </div>
            <div className="border border-gray-200 my-4 "></div>
            <div className="space-y-3">
              <i>"First in Class, First in Life"</i>
              <br />
              <br />
              <p className="font-semibold">
                {" "}
                Dear Students, Parents, and Guardians,{" "}
              </p>
              <p className="">
                It brings me great joy to welcome you to the Cosmo School
                family. Since our doors first opened in January 2013, we have
                been driven by a singular vision: to create students who are not
                just academically excellent, but who also possess strong moral
                foundations and genuine humanity.
                <br />
                <br />
                In today's rapidly changing world, education means so much more
                than memorizing facts and passing exams. Our approach is
                holistic. We follow the national curriculum in English version,
                yes, but we've built something special here. Every classroom,
                every club activity, every competition is designed to help
                students discover who they are and what they're capable of.
                <br />
                <br />
                What makes Cosmo School unique? It's our people. Our teachers
                don't just teach—they mentor, inspire, and genuinely care about
                each student's journey. We've created eight vibrant clubs where
                students explore everything from technology and science to arts
                and karate. These aren't just extracurricular activities;
                they're where real learning happens, where friendships form, and
                where confidence grows.
                <br />
                <br />
                I'm incredibly proud of our achievements. Our students
                consistently perform well in public examinations, with many
                securing A+ grades. But what makes me even prouder are the young
                people they're becoming—respectful, curious, creative, and ready
                to contribute positively to society.
                <br />
                <br />
                We believe in partnership. Education works best when school and
                home work together. That's why our door is always open. Whether
                you have questions, concerns, or just want to chat about your
                child's progress, we're here. This isn't just my school or the
                teachers' school—it's our school, built together by the entire
                community.
                <br />
                <br />
                Looking ahead, our commitment remains unwavering. We will
                continue to evolve, to innovate, and to ensure that every single
                student who walks through our gates receives the best possible
                education. We want them to be "First in Class, First in
                Life"—not just in grades, but in character, in compassion, and
                in their contribution to making the world a better place.
                <br />
                <br />
                To our current families: thank you for trusting us with your
                children's education. To those considering joining us: we'd be
                honored to be part of your child's educational journey.
                Together, let's help them reach their full potential.
                <br />
                <br />
              </p>

              <p className="font-semibold">
                With warm regards and best wishes,
              </p>
              <div className="border border-gray-200 my-4 "></div>
              <p className="italic font-light text-sm">
                Principal, Cosmo School
              </p>
              <p className="font-light text-xs">Established January 2013</p>
              <div className="border border-gray-200 "></div>
            </div>
          </div>
          <div className="modal-action">
            <div className="bg-linear-to-r from-[#005f50] via-[#00785c] to-[#04926c] h-28 absolute top-0 left-0 w-full">
              <div className="text-white px-8 py-6 space-y-2">
                <h3 className="text-3xl heading-font font-bold">
                  Principal's Complete Message
                </h3>
                <p>A Letter to Our School Community</p>
              </div>
              <button
                onClick={closeModal}
                className="btn btn-sm btn-circle btn-error absolute right-2 top-4 transition-all duration-300 hover:rotate-90"
              >
                ✕
              </button>
            </div>

            {/* if there is a button, it will close the modal */}
            <button
              onClick={closeModal}
              className="btn btn-accent rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </Container>
  );
};

export default PrincipalMessage;
