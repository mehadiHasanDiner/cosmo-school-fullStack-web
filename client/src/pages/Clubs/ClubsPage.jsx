import ClubCard from "../../components/cards/ClubCard";
import { useLoaderData } from "react-router";

const ClubsPage = () => {
  const clubs = useLoaderData(); // Assuming you have a loader that fetches the clubs data
  const handleJoinClub = (club) => {
    // Handle the logic for joining a club here
    // console.log(`Joining club: ${club.name}`);
    alert(`You have joined the ${club.name} club!`);
  };
  return (
    <section className="bg-[#e9e9e9] body-font pb-16">
      <div className="">
        {/* Section Heading */}
        <div className="mb-10 text-center bg-green-800/60 pt-30 pb-12">
          <span className="font-bold uppercase tracking-widest text-white text-opacity-70">
            Beyond the Classroom
          </span>

          <h2 className="mt-3 text-3xl font-extrabold text-[#202b23] md:text-4xl">
            Explore Our School Clubs
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-white/90">
            Discover your interests, develop new skills, and grow through
            exciting co-curricular activities.
          </p>
        </div>

        {/* Responsive Club Grid */}
        <div className="mx-auto max-w-362.5 px-4 sm:px-6 lg:px-8">
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
      </div>
    </section>
  );
};

export default ClubsPage;
