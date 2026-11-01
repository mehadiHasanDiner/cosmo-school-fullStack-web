import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiEye, FiImage, FiRefreshCw } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";

import GalleryLightbox from "./GalleryLightbox";
import useAxiosSecure from "../../hooks/useAxiosSecure";

// ================================================
// CATEGORY DATA
// Label: UI-তে দেখানোর নাম
// Slug: MongoDB/API-তে ব্যবহৃত value
// ================================================

const galleryCategories = [
  { label: "All", slug: "all" },
  { label: "Classroom", slug: "classroom" },
  { label: "Events", slug: "events" },
  { label: "Sports", slug: "sports" },
  { label: "Cultural", slug: "cultural" },
  { label: "Labs", slug: "labs" },
  { label: "Library", slug: "library" },
];

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(null);

  const axiosSecure = useAxiosSecure();

  // ================================================
  // LOAD IMAGES FROM MONGODB API
  // ================================================

  const {
    data: galleryImages = [],
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["gallery-images", activeCategory],

    queryFn: async () => {
      const res = await axiosSecure.get("/gallery/images", {
        params: {
          category: activeCategory,
        },
      });

      // Backend সরাসরি array return করলে
      // অথবা { data: [...] } return করলে
      // দুটোই handle করবে।
      const responseData = res.data;

      const images = Array.isArray(responseData)
        ? responseData
        : responseData?.data;

      if (!Array.isArray(images)) {
        throw new Error("Invalid gallery API response");
      }

      return images;
    },

    staleTime: 1000 * 60 * 2,
    retry: 1,
  });

  // ================================================
  // CATEGORY CHANGE
  // ================================================

  const handleCategoryChange = (slug) => {
    setCurrentIndex(null);
    setActiveCategory(slug);
  };

  // ================================================
  // LIGHTBOX CONTROLS
  // ================================================

  const closePreview = useCallback(() => {
    setCurrentIndex(null);
  }, []);

  const nextImage = useCallback(() => {
    setCurrentIndex((previous) => {
      if (previous === null || galleryImages.length === 0) {
        return null;
      }

      return (previous + 1) % galleryImages.length;
    });
  }, [galleryImages.length]);

  const previousImage = useCallback(() => {
    setCurrentIndex((previous) => {
      if (previous === null || galleryImages.length === 0) {
        return null;
      }

      return (previous - 1 + galleryImages.length) % galleryImages.length;
    });
  }, [galleryImages.length]);

  const currentCategory = galleryCategories.find(
    (category) => category.slug === activeCategory,
  );

  return (
    <main className="min-h-screen bg-[#F5F7F6] body-font">
      {/* ============================================
          GALLERY HEADER
      ============================================ */}

      <section
        className="
          relative overflow-hidden
          bg-linear-to-br
          from-[#176534] via-[#278C45] to-[#0D5543]
          px-4 pb-16 pt-28
          text-center text-white
          sm:pb-20 sm:pt-32
        "
      >
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/5" />

        <div className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-yellow-300/10" />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mx-auto max-w-3xl"
        >
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-300">
            Our Gallery
          </span>

          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            Explore Our School Gallery
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            Discover the vibrant moments and memories from our school community.
          </p>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 90 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mx-auto mt-7 h-1 rounded-full bg-[#F4C518]"
          />
        </motion.div>
      </section>

      {/* ============================================
          GALLERY CONTENT
      ============================================ */}

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* ==========================================
            CATEGORY FILTER BUTTONS
        ========================================== */}

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {galleryCategories.map((category) => {
            const isActive = activeCategory === category.slug;

            return (
              <motion.button
                key={category.slug}
                type="button"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleCategoryChange(category.slug)}
                aria-pressed={isActive}
                className={`
                  relative overflow-hidden
                  rounded-full border
                  px-5 py-2.5
                  text-sm font-semibold
                  shadow-sm
                  transition-colors duration-300

                  ${
                    isActive
                      ? "border-[#176534] text-white"
                      : "border-[#DDE4E0] bg-white text-[#202A25] hover:border-[#278C45]"
                  }
                `}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeGalleryCategory"
                    className="
                      absolute inset-0
                      rounded-full
                      bg-linear-to-r
                      from-[#176534] to-[#278C45]
                    "
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}

                <span className="relative z-10">{category.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* ==========================================
            GALLERY TITLE + IMAGE COUNT
        ========================================== */}

        <div className="mb-7 flex flex-wrap items-center justify-between gap-3 border-b border-[#DDE4E0] pb-5">
          <div>
            <h2 className="text-2xl font-extrabold text-[#20252B]">
              {activeCategory === "all"
                ? "All Moments"
                : `${currentCategory?.label || "Gallery"} Moments`}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Explore memorable moments at Cosmo School
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isFetching && !isLoading && (
              <FiRefreshCw className="animate-spin text-primary" />
            )}

            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-600 shadow-sm">
              {galleryImages.length} Photos
            </span>
          </div>
        </div>

        {/* ==========================================
            LOADING STATE
        ========================================== */}

        {isLoading && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="skeleton h-64 w-full rounded-2xl" />
            ))}
          </div>
        )}

        {/* ==========================================
            ERROR STATE
        ========================================== */}

        {isError && !isLoading && (
          <div className="rounded-2xl border border-red-100 bg-white px-6 py-16 text-center shadow-sm">
            <FiImage className="mx-auto text-5xl text-red-400" />

            <h3 className="mt-4 text-xl font-bold text-gray-800">
              Failed to load gallery
            </h3>

            <p className="mt-2 text-gray-500">
              Please check your connection and try again.
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              className="btn mt-5 border-none bg-[#278C45] text-white hover:bg-[#176534]"
            >
              <FiRefreshCw />
              Try Again
            </button>
          </div>
        )}

        {/* ==========================================
            ANIMATED MASONRY GALLERY
        ========================================== */}

        {!isLoading && !isError && (
          <>
            <motion.div
              layout
              className="
                columns-1 gap-5
                sm:columns-2
                lg:columns-3
              "
            >
              <AnimatePresence mode="popLayout">
                {galleryImages.map((image, index) => (
                  <motion.button
                    key={image._id || image.id}
                    layout
                    type="button"
                    initial={{
                      opacity: 0,
                      scale: 0.92,
                      y: 25,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      y: -15,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: Math.min(index * 0.04, 0.25),
                    }}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Preview ${image.title}`}
                    className="
                      group relative mb-5 block w-full
                      break-inside-avoid overflow-hidden
                      rounded-2xl bg-white text-left
                      shadow-[0_4px_16px_rgba(0,0,0,0.08)]
                      transition-shadow duration-300
                      hover:shadow-[0_15px_35px_rgba(0,0,0,0.16)]
                      focus-visible:outline-2
                      focus-visible:outline-offset-4
                      focus-visible:outline-[#278C45]
                    "
                  >
                    {/* Image */}
                    <img
                      src={image.imageUrl}
                      alt={image.altText || image.title}
                      loading="lazy"
                      className="
                        block h-auto w-full
                        transition-transform duration-700
                        ease-out group-hover:scale-110
                      "
                    />

                    {/* Hover overlay */}
                    <div
                      className="
                        absolute inset-0
                        flex flex-col justify-end
                        bg-linear-to-t
                        from-black/90 via-black/35 to-transparent
                        p-5 opacity-0
                        transition-opacity duration-300
                        group-hover:opacity-100
                        group-focus-visible:opacity-100
                      "
                    >
                      <span className="mb-2 text-xs font-bold uppercase tracking-wider text-yellow-300">
                        {image.categorySlug}
                      </span>

                      <h3 className="text-xl font-bold text-white">
                        {image.title}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/80">
                        {image.description}
                      </p>

                      <span
                        className="
                          absolute right-4 top-4
                          flex h-11 w-11 items-center
                          justify-center rounded-full
                          bg-white/20 text-white
                          backdrop-blur-md
                        "
                      >
                        <FiEye size={21} />
                      </span>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Empty State */}
            {galleryImages.length === 0 && (
              <div className="py-24 text-center">
                <FiImage className="mx-auto text-5xl text-gray-400" />

                <h3 className="mt-5 text-xl font-bold text-gray-700">
                  No photos available
                </h3>

                <p className="mt-2 text-gray-500">
                  More memorable moments will be added soon.
                </p>
              </div>
            )}
          </>
        )}
      </section>

      {/* ============================================
          FULLSCREEN LIGHTBOX
      ============================================ */}

      <GalleryLightbox
        images={galleryImages}
        currentIndex={currentIndex}
        onClose={closePreview}
        onNext={nextImage}
        onPrevious={previousImage}
      />
    </main>
  );
};

export default GalleryPage;
