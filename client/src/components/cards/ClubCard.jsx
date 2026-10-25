import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUsers,
  FiArrowRight,
} from "react-icons/fi";

const ClubCard = ({ club, onJoin }) => {
  const {
    name,
    description,
    days,
    time,
    location,
    instructor,
    image,
    gradient,
  } = club;

  return (
    <article
      className="
        group flex h-full flex-col
        overflow-hidden rounded-2xl
        border border-base-200 bg-white
        shadow-[0_4px_12px_rgba(0,0,0,0.10)]
        transition-all duration-300
        hover:-translate-y-2
        hover:shadow-[0_15px_35px_rgba(0,0,0,0.15)]
      "
    >
      {/* Club Header */}
      <div
        className={`
          relative flex min-h-43
          flex-col items-center justify-center
          overflow-hidden bg-linear-to-br
          px-5 py-6 text-center text-white
          ${gradient}
        `}
      >
        {/* Decorative Circle */}
        <div
          className="
            absolute -right-5 -top-12
            h-24 w-24 rounded-full
            bg-white/10
          "
        />

        {/* Club Logo */}
        <div
          className="
            relative z-10 mb-4
            flex h-20 w-20 items-center justify-center
            rounded-full bg-white p-2
            shadow-sm
            transition-transform duration-300
            group-hover:scale-110
          "
        >
          <img
            src={image}
            alt={`${name} Club Logo`}
            className="h-full w-full object-contain rounded-full"
          />
        </div>

        {/* Club Name */}
        <h3
          className="
            relative z-10 max-w-57.5
            text-xl font-extrabold leading-snug
            sm:text-[21px]
          "
        >
          {name}
        </h3>
      </div>

      {/* Club Body */}
      <div className="flex flex-1 flex-col p-6">
        {/* Description */}
        <p
          className="
            mb-5 min-h-12.5
            text-sm leading-6
            text-base-content/75
          "
        >
          {description}
        </p>

        {/* Club Information */}
        <div className="space-y-3 text-[13px] text-base-content/85">
          <div className="flex items-start gap-3">
            <FiCalendar className="mt-0.5 shrink-0 text-teal-800" size={16} />
            <span>{days}</span>
          </div>

          <div className="flex items-start gap-3">
            <FiClock className="mt-0.5 shrink-0 text-teal-800" size={16} />
            <span>{time}</span>
          </div>

          <div className="flex items-start gap-3">
            <FiMapPin className="mt-0.5 shrink-0 text-teal-800" size={16} />
            <span>{location}</span>
          </div>

          <div className="flex items-start gap-3">
            <FiUsers className="mt-0.5 shrink-0 text-teal-800" size={16} />
            <span>{instructor}</span>
          </div>
        </div>

        {/* Join Button */}
        <button
          type="button"
          onClick={() => onJoin?.(club)}
          className={`
            mt-auto flex w-full
            items-center justify-center gap-3
            rounded-xl bg-linear-to-r
            px-5 py-3.5
            pt-3.5 text-sm font-bold text-white
            transition-all duration-300
            hover:brightness-110
            active:scale-[0.98]
            ${gradient}
          `}
          style={{ marginTop: "20px" }}
        >
          Join Club
          <FiArrowRight
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>
    </article>
  );
};

export default ClubCard;
