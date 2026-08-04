import { FiArrowUpRight, FiCalendar, FiMapPin } from "react-icons/fi";

const AnimatedCard = ({
  image,
  title,
  description,
  date,
  location,
  category,
  viewDetails,
  onClick,
  className = "",
}) => {
  return (
    <article
      onClick={onClick}
      className={`
        group relative isolate h-75 cursor-pointer
        overflow-hidden rounded-2xl border-2
        border-transparent bg-base-200
        shadow-[0_14px_35px_rgba(0,0,0,0.16)]
        transition-all duration-500
        hover:-translate-y-2
        hover:border-secondary
        hover:shadow-[0_24px_55px_rgba(0,0,0,0.25)]
        sm:h-82.5
        ${className}
      `}
    >
      {/* Event image */}
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="
          absolute inset-0 h-full w-full object-cover
          transition-transform duration-1400
          ease-[cubic-bezier(0.22,1,0.36,1)]
          group-hover:scale-[1.08]
        "
      />

      {/* Default dark gradient */}
      <div
        className="
          absolute inset-0 bg-linear-to-t
          from-black/65 via-black/10 to-transparent
          transition-opacity duration-500
          group-hover:opacity-0
        "
      />

      {/* Cosmo border glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 rounded-2xl
          opacity-0 transition-opacity duration-500
          group-hover:opacity-100
          group-hover:shadow-[inset_0_0_0_2px_rgba(244,197,24,0.65)]
        "
      />

      {/* Hover light-grey overlay */}
      <div
        className="
          absolute inset-0
          bg-white/70
          opacity-0 backdrop-blur-[2px]
          transition-all duration-500
          group-hover:opacity-100
        "
      />

      {/* Decorative Cosmo gradient */}
      <div
        aria-hidden="true"
        className="
          absolute -right-20 -top-20 size-48
          rounded-full bg-primary/20 blur-3xl
          opacity-0 transition-all duration-700
          group-hover:scale-125 group-hover:opacity-100
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute -bottom-20 -left-20 size-48
          rounded-full bg-secondary/25 blur-3xl
          opacity-0 transition-all duration-700
          group-hover:scale-125 group-hover:opacity-100
        "
      />

      {/* Category */}
      {category && (
        <span
          className="
            absolute left-4 top-4 z-20
            translate-y-0 rounded-full
            border border-white/25 bg-black/35
            px-3 py-1.5 text-xs font-extrabold
            uppercase tracking-wider text-white
            backdrop-blur-md
            transition-all duration-500
            group-hover:border-primary/20
            group-hover:bg-primary/10
            group-hover:text-primary
          "
        >
          {category}
        </span>
      )}

      {/* Initial title */}
      <div
        className="
          absolute inset-x-0 bottom-0 z-10 p-5
          transition-all duration-500
          group-hover:translate-y-8
          group-hover:opacity-0
        "
      >
        <h3 className="text-xl font-black leading-tight text-white">{title}</h3>
      </div>

      {/* Hover content */}
      <div
        className="
          absolute inset-0 z-10 flex flex-col
          justify-end p-6
          translate-y-8 opacity-0
          transition-all duration-500
          group-hover:translate-y-0
          group-hover:opacity-100
        "
      >
        <span
          className="
            mb-4 h-1 w-14 rounded-full
            bg-linear-to-r
            from-primary via-secondary to-accent
            transition-all duration-700
            group-hover:w-24
          "
        />

        <h3
          className="
            text-2xl font-black leading-tight
            text-neutral transition-colors duration-300
            group-hover:text-primary
          "
        >
          {title}
        </h3>

        {description && (
          <p
            className="
              mt-3 line-clamp-3 text-sm
              leading-6 text-black
              sm:text-base
            "
          >
            {description}
          </p>
        )}

        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
          {date && (
            <span
              className="
                inline-flex items-center gap-2
                text-sm font-semibold text-neutral/70
              "
            >
              <FiCalendar className="text-primary" />
              {date}
            </span>
          )}

          {location && (
            <span
              className="
                inline-flex items-center gap-2
                text-sm font-semibold text-neutral/70
              "
            >
              <FiMapPin className="text-accent" />
              {location}
            </span>
          )}
        </div>

        {viewDetails && (
          <div
            className="
            mt-5 inline-flex items-center gap-2
            font-extrabold text-primary
          "
          >
            View Event
            <FiArrowUpRight
              className="
              text-lg transition-transform duration-300
              group-hover:translate-x-1
              group-hover:-translate-y-1
            "
            />
          </div>
        )}
      </div>

      {/* Bottom animated border */}
      <span
        aria-hidden="true"
        className="
          absolute inset-x-0 bottom-0 z-20 h-1
          origin-left scale-x-0
          bg-linear-to-r
          from-primary via-secondary to-accent
          transition-transform duration-500
          group-hover:scale-x-100
        "
      />
    </article>
  );
};

export default AnimatedCard;
