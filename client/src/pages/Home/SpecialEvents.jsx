import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import img1 from "./../../assets/1military-museum-tour.webp";
import img2 from "./../../assets/2pitha-utshob.webp";
import img3 from "./../../assets/3winter-interschool-game.webp";
import img4 from "./../../assets/4annual-cultural.webp";
import img5 from "./../../assets/5junior-indoor-sport.webp";
import img6 from "./../../assets/6lokoshilpo.webp";
import img7 from "./../../assets/7study-tour.webp";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  A11y,
  Autoplay,
  Keyboard,
  Navigation,
  Pagination,
} from "swiper/modules";
import AnimatedCard from "../../components/cards/AnimatedCard";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SectionTitle from "../../components/common/SectionTitle";
import ScrollReveal from "../../components/common/ScrollReveal";

const specialEvents = [
  {
    id: 1,
    image: img1,
    title: "Military Museum (Study Tour)",
    description:
      "Students present creative scientific projects, experiments and innovative ideas.",
    date: "10 December 2026",
    location: "Main Campus",
    category: "Study Tour",
  },
  {
    id: 2,
    image: img2,
    title: "Pitha Utshob 2026",
    description:
      "A delightful celebration of Bangladeshi culture, traditional food and community spirit.",
    date: "18 January 2026",
    location: "Main Campus",
    category: "Cultural",
  },
  {
    id: 3,
    image: img3,
    title: "Student Award Ceremony",
    description:
      "Recognising the academic success, talent and dedication of our students.",
    date: "12 February 2026",
    location: "School Auditorium",
    category: "Achievement",
  },
  {
    id: 4,
    image: img4,

    title: "Pohela Boishakh Celebration",
    description:
      "Students welcome the Bengali New Year through dance, music and traditional performances.",
    date: "14 April 2026",
    location: "Cosmo School Campus",
    category: "Festival",
  },
  {
    id: 5,
    image: img5,
    title: "Annual Sports Day",
    description:
      "A joyful day of sports, teamwork and healthy competition for our young learners.",
    date: "20 November 2026",
    location: "School Playground",
    category: "Sports",
  },
  {
    id: 6,
    image: img6,
    title: "Lokoshilpo & Cultural Heritage Program",
    description:
      "Students present creative scientific projects, experiments and innovative ideas.",
    date: "10 December 2026",
    location: "Main Campus",
    category: "Cultural",
  },
  {
    id: 7,
    image: img7,
    title: "Science and Innovation Tour",
    description:
      "Students present creative scientific projects, experiments and innovative ideas.",
    date: "10 December 2026",
    location: "Main Campus",
    category: "Study Tour",
  },
];

const SpecialEvents = () => {
  return (
    <section className="torn-both bg-[linear-gradient(120deg,#ff977d,#a4fdbb,#c395ff)] py-16 my-4 body-font">
      {/* Heading */}
      <ScrollReveal direction="zoom" delay={0.2} duration={2} once={false}>
        <SectionTitle
          eyebrow="Events"
          title="Some Special "
          highlightedText=" Events"
          description="Some of our special notable events"
        />
      </ScrollReveal>

      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -left-28 top-16 size-80
          rounded-full bg-primary/15 blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -bottom-32 right-0 size-96
          rounded-full bg-secondary/10 blur-3xl
        "
      />

      <ScrollReveal
        direction="up"
        delay={0.2}
        duration={2}
        once={false}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* Navigation controls */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            aria-label="Previous event"
            className="
              special-event-prev
              group grid size-11 place-items-center
              rounded-full border border-white/20
              bg-white text-neutral
              shadow-[0_10px_25px_rgba(0,0,0,0.20)]
              transition-all duration-300
              hover:-translate-y-1
              hover:border-secondary
              hover:bg-secondary
              hover:shadow-[0_14px_30px_rgba(244,197,24,0.25)]
              active:translate-y-0 active:scale-95
              disabled:pointer-events-none
              disabled:opacity-40
            "
          >
            <FiChevronLeft
              className="
                text-xl transition-transform duration-300
                group-hover:-translate-x-0.5
              "
            />
          </button>

          <button
            type="button"
            aria-label="Next event"
            className="
              special-event-next
              group grid size-11 place-items-center
              rounded-full border border-white/20
              bg-white text-neutral
              shadow-[0_10px_25px_rgba(0,0,0,0.20)]
              transition-all duration-300
              hover:-translate-y-1
              hover:border-secondary
              hover:bg-secondary
              hover:shadow-[0_14px_30px_rgba(244,197,24,0.25)]
              active:translate-y-0 active:scale-95
              disabled:pointer-events-none
              disabled:opacity-40
            "
          >
            <FiChevronRight
              className="
                text-xl transition-transform duration-300
                group-hover:translate-x-0.5
              "
            />
          </button>
        </div>

        {/* Slider */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay, Keyboard, A11y]}
          navigation={{
            prevEl: ".special-event-prev",
            nextEl: ".special-event-next",
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          keyboard={{
            enabled: true,
          }}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={850}
          grabCursor
          watchOverflow
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1.4,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 22,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          className="special-events-swiper mt-6 pb-14"
        >
          {specialEvents.map((event) => (
            <SwiperSlide key={event.id} className="h-auto">
              <AnimatedCard
                image={event.image}
                title={event.title}
                description={event.description}
                date={event.date}
                location={event.location}
                category={event.category}
                className="h-full"
                onClick={() => {
                  console.log("Selected event:", event);
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </ScrollReveal>
    </section>
  );
};

export default SpecialEvents;
