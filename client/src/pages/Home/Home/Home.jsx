import FeatureClass from "../FeatureClass";
import Hero from "../Hero";
import PrincipalMessage from "../PrincipalMessage";
import WhyChoose from "../WhyChoose";

const Home = () => {
  return (
    <div>
      <Hero />

      <PrincipalMessage />
      <WhyChoose />
      {/* <AdmissionOffer /> */}
      <FeatureClass />
    </div>
  );
};

export default Home;
