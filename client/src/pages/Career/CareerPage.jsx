const CareerPage = () => {
  return (
    <section className="bg-[#e9e9e9] body-font pb-16">
      <div className="">
        {/* Section Heading */}
        <div className="mb-10 text-center bg-linear-to-b from-violet-800 to-emerald-800/60 pt-30 pb-12">
          <span className="font-bold uppercase tracking-widest text-white text-opacity-70">
            Our Career Opportunities
          </span>

          <h2 className="mt-3 text-3xl font-extrabold text-[#2b2b20] md:text-4xl">
            Explore Our School's Career Opportunities
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-white/90">
            Discover the exciting career paths available at our school. Join our
            dynamic team and make a difference in the lives of our students.
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
            {/* Placeholder for gallery items */}
            <div className="bg-white p-4 rounded-lg shadow-md col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4">
              <h2 className="text-xl font-bold text-gray-800">
                Career Opportunities
              </h2>
              <p className="mt-2 text-gray-700 italic">
                Page is under construction. Please check back later for exciting
                career opportunities at our school. We are committed to
                providing a supportive and enriching environment for our staff
                and students.
              </p>
              <p className="mt-2 text-gray-700 italic">
                If you are interested in joining our team, please reach out to
                us at{" "}
                <a
                  href="mailto:careers@ourschool.edu"
                  className="text-blue-500 hover:underline"
                >
                  hr.cosmoschool@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerPage;
