import "./App.css";
import Button from "./components/common/Button";
import Card from "./components/cards/Card";
import Container from "./components/layout/Container";
import ScrollReveal from "./components/common/ScrollReveal";

function App() {
  return (
    <div className="">
      <Container>
        <section className="relative min-h-screen">
          {/* Background */}
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#0B8F4D_0%,#16A34A_40%,#F5C400_100%)]"></div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30"></div>

          {/* Content */}
          <div className="relative z-10 flex min-h-screen items-center justify-center text-white">
            <div className="text-center">
              <h1 className="heading-font text-6xl font-bold">
                <ScrollReveal direction="zoom" delay={0.2}>
                  <h2>Welcome to Cosmo School</h2>
                </ScrollReveal>
              </h1>

              <p className="body-font text-2xl mt-4">
                First in Class, First in Life
              </p>
              {/* <button className="btn btn-xl text-white mt-4 bg-[linear-gradient(135deg,#0B8F4D,#08703C)] text-xl">
              Apply Online
            </button> */}
              <div className="space-x-2 mt-5">
                <Button>Apply Online</Button>
                <Button variant="outline" className="text-green-950">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="my-5 text-center">
          <Button variant="outline" size="md" className="">
            Hello world
          </Button>

          <button class="relative pb-2 transition-all duration-1000 border-b-8 border-transparent hover:border-emerald-500">
            Hover Me
          </button>
        </div>
        <ScrollReveal direction="left" delay={0.8}>
          <div className="my-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <Card className="border-l-[6px] border-l-primary">
              <p className="text-sm text-gray-500">20 July 2026</p>

              <h3 className="font-heading mt-3 text-xl font-semibold">
                Admission Open 2027
              </h3>

              <Button variant="outline" size="sm" className="mt-4 p-0">
                Read More →
              </Button>
            </Card>
            <Card className="border-l-[6px] border-l-primary">
              <p className="text-sm text-gray-500">20 July 2026</p>

              <h3 className="font-heading mt-3 text-xl font-semibold">
                Admission Open 2027
              </h3>

              <Button variant="outline" size="sm" className="mt-4 p-0">
                Read More →
              </Button>
            </Card>
            <Card className="border-l-[6px] border-l-primary">
              <p className="text-sm text-gray-500">20 July 2026</p>

              <h3 className="font-heading mt-3 text-xl font-semibold">
                Admission Open 2027
              </h3>

              <Button variant="outline" size="sm" className="mt-4 p-0">
                Read More →
              </Button>
            </Card>
            <Card className="border-l-[6px] border-l-primary">
              <p className="text-sm text-gray-500">20 July 2026</p>

              <h3 className="font-heading mt-3 text-xl font-semibold">
                Admission Open 2027
              </h3>

              <Button variant="outline" size="sm" className="mt-4 p-0">
                Read More →
              </Button>
            </Card>

            <Card>
              <h3 className="font-heading text-2xl font-bold">Computer Lab</h3>

              <p className="font-body mt-3">
                Modern computer facilities for students.
              </p>
            </Card>
            <Card>
              <h3 className="font-heading text-2xl font-bold">Computer Lab</h3>

              <p className="font-body mt-3">
                Modern computer facilities for students.
              </p>
            </Card>
            <Card>
              <h3 className="font-heading text-2xl font-bold">Computer Lab</h3>
              <p className="font-body mt-3">
                Modern computer facilities for students.
              </p>
            </Card>
            <Card>
              <h3 className="font-heading text-2xl font-bold">Computer Lab</h3>
              <p className="font-body mt-3">
                Modern computer facilities for students.
              </p>
            </Card>
          </div>
        </ScrollReveal>
      </Container>
    </div>
  );
}

export default App;
