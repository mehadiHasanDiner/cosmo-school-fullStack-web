import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const GalleryLightbox = ({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrevious,
}) => {
  const isOpen = currentIndex !== null;
  const currentImage = isOpen ? images[currentIndex] : null;

  useEffect(() => {
    if (!isOpen) return;

    // Keyboard controls
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNext();
      if (event.key === "ArrowLeft") onPrevious();
    };

    // Preview open থাকলে background scrolling বন্ধ
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, onNext, onPrevious]);

  return createPortal(
    <AnimatePresence>
      {currentImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image preview"
          onClick={onClose}
          className="
            fixed inset-0 z-9999
            flex items-center justify-center
            bg-black/95 px-4 py-16
            backdrop-blur-xl
          "
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="
              absolute right-5 top-5 z-30
              flex h-11 w-11 items-center justify-center
              rounded-full bg-white/15 text-white
              transition hover:rotate-90 hover:bg-red-500
            "
          >
            <FiX size={24} />
          </button>

          {/* Image counter */}
          <div className="absolute left-5 top-7 text-sm text-white/80">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Previous */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
            aria-label="Previous image"
            className="
              absolute left-3 top-1/2 z-20
              flex h-11 w-11 -translate-y-1/2
              items-center justify-center rounded-full
              bg-white/15 text-white
              transition hover:scale-110 hover:bg-primary
              md:left-8
            "
          >
            <FiChevronLeft size={26} />
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next image"
            className="
              absolute right-3 top-1/2 z-20
              flex h-11 w-11 -translate-y-1/2
              items-center justify-center rounded-full
              bg-white/15 text-white
              transition hover:scale-110 hover:bg-primary
              md:right-8
            "
          >
            <FiChevronRight size={26} />
          </button>

          {/* Image and description */}
          <motion.div
            key={currentImage.id}
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="flex w-full max-w-5xl flex-col items-center"
          >
            <img
              src={currentImage.imageUrl}
              alt={currentImage.title}
              className="
                max-h-[75vh] w-auto max-w-full
                rounded-xl object-contain
                shadow-2xl
              "
            />

            <div className="mt-6 max-w-2xl text-center text-white">
              <h3 className="text-xl font-bold md:text-2xl">
                {currentImage.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-white/70 md:text-base">
                {currentImage.description}
              </p>

              <span className="mt-3 inline-block rounded-full bg-white/10 px-4 py-1 text-xs text-white/80">
                {currentImage.category}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default GalleryLightbox;
