import ClubCard from "../../components/cards/ClubCard";
import { useLoaderData } from "react-router";

const ClubsPage = () => {
  const clubs = useLoaderData(); // Assuming you have a loader that fetches the clubs data
  const handleJoinClub = (clubId) => {
    // Handle the logic for joining a club here
    console.log(`Joining club with ID: ${clubId}`);
  };
  return (
    <section className="bg-[#F8FAFC] py-12 mt-20">
      <div className="mx-auto max-w-[1450px] px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-10 text-center">
          <span className="font-bold uppercase tracking-widest text-primary">
            Beyond the Classroom
          </span>

          <h2 className="mt-3 text-3xl font-extrabold text-[#20252B] md:text-4xl">
            Explore Our School Clubs
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base-content/70">
            Discover your interests, develop new skills, and grow through
            exciting co-curricular activities.
          </p>
        </div>

        {/* Responsive Club Grid */}
        <div
          className="
            grid grid-cols-1
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
          "
        >
          {clubs.map((club) => (
            <ClubCard key={club.id} club={club} onJoin={handleJoinClub} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClubsPage;
