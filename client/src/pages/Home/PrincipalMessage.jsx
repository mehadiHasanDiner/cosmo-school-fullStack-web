import principalImg from "../../assets/principal.webp";
import Container from "../../components/layout/Container";
const PrincipalMessage = () => {
  return (
    <Container className="grid grid-cols-1 md:grid-cols-2 gap-10 py-20">
      <div
        className="group relative h-full min-h-77.5
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
      <div>
        <h2 className="heading-font text-4xl font-bold">Principal's Message</h2>
      </div>
    </Container>
  );
};

export default PrincipalMessage;
