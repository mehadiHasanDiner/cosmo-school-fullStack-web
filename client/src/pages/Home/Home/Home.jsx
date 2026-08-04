import WhySpecial from "../WhySpecial";
import Hero from "../Hero";
import PrincipalMessage from "../PrincipalMessage";
import EduEnlightenment from "../EduEnlightenment";
import AllSections from "../AllSections";
import AboutUs from "../AboutUs";

const Home = () => {
  return (
    <div>
      <Hero />

      <PrincipalMessage />
      <EduEnlightenment />
      {/* <AdmissionOffer /> */}
      <WhySpecial />
      <AllSections />
      <AboutUs />
    </div>
  );
};

export default Home;
