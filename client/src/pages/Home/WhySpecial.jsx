import { BookOpen, MonitorSmartphone, ShieldCheck, Trophy } from "lucide-react";
import FeatureCard from "../../components/cards/FeatureCard";
import Container from "../../components/layout/Container";
import SectionTitle from "../../components/common/SectionTitle";

const WhySpecial = () => {
  return (
    <Container className="my-12">
      <SectionTitle
        eyebrow="Our Features"
        title="Why We are "
        highlightedText="Special"
        description="Some special features of our curriculum"
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 body-font mt-8">
        <FeatureCard
          icon={BookOpen}
          title="Quality Education"
          description="Modern teaching methods and a carefully designed academic programme."
          color="green"
        />

        <FeatureCard
          icon={MonitorSmartphone}
          title="Smart Classroom"
          description="Technology-supported interactive and engaging learning experiences."
          color="blue"
        />

        <FeatureCard
          icon={ShieldCheck}
          title="Safe Environment"
          description="A caring, secure and child-friendly school environment."
          color="yellow"
        />

        <FeatureCard
          icon={Trophy}
          title="Co-curricular Activities"
          description="Sports, arts, clubs and activities that develop complete learners."
          color="red"
        />
      </div>
    </Container>
  );
};

export default WhySpecial;
