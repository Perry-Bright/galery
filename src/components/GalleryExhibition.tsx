import { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Volume2,
  X,
} from 'lucide-react';
import {
  FEATURED_AFTER_PHOTO,
  GALLERY_PHOTOS,
  REVEAL_COPY,
  type GalleryPhoto,
} from '../config/revealConfig';
import { getNextSlideIndex } from '../utils/verification';
import { LuxuryImage } from './LuxuryImage';

interface GalleryExhibitionProps {
  onReplayFanfare: () => void;
  skipCurtain?: boolean;
}

export function GalleryExhibition({
  onReplayFanfare,
  skipCurtain = false,
}: GalleryExhibitionProps) {
  const [curtainsOpen, setCurtainsOpen] = useState(skipCurtain);
  const [activeSlide, setActiveSlide] = useState(0);
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);
  const [lightboxIsGallery, setLightboxIsGallery] = useState(false);

  const currentPhoto = GALLERY_PHOTOS[activeSlide] ?? GALLERY_PHOTOS[0];

  useEffect(() => {
    if (skipCurtain) {
      setCurtainsOpen(true);
      return;
    }
    const raf = window.requestAnimationFrame(() => {
      window.setTimeout(() => setCurtainsOpen(true), 120);
    });
    return () => window.cancelAnimationFrame(raf);
  }, [skipCurtain]);

  useEffect(() => {
    if (!lightboxPhoto) {
      return;
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxPhoto(null);
      } else if (lightboxIsGallery && e.key === 'ArrowRight') {
        const nextIdx = getNextSlideIndex(
          activeSlide,
          'next',
          GALLERY_PHOTOS.length,
        );
        setActiveSlide(nextIdx);
        setLightboxPhoto(GALLERY_PHOTOS[nextIdx] ?? null);
      } else if (lightboxIsGallery && e.key === 'ArrowLeft') {
        const prevIdx = getNextSlideIndex(
          activeSlide,
          'prev',
          GALLERY_PHOTOS.length,
        );
        setActiveSlide(prevIdx);
        setLightboxPhoto(GALLERY_PHOTOS[prevIdx] ?? null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxPhoto, lightboxIsGallery, activeSlide]);

  const openFeaturedLightbox = () => {
    setLightboxIsGallery(false);
    setLightboxPhoto(FEATURED_AFTER_PHOTO);
  };

  const openGalleryLightbox = () => {
    setLightboxIsGallery(true);
    setLightboxPhoto(currentPhoto);
  };

  return (
    <div className="relative overflow-x-hidden">
      {/* Grand Velvet Curtain Unveiling Overlay */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-30 pointer-events-none flex transition-opacity duration-700 ${
          curtainsOpen ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div
          className={`w-1/2 h-full bg-espresso border-r border-brass/40 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            curtainsOpen ? '-translate-x-full' : 'translate-x-0'
          }`}
        />
        <div
          className={`w-1/2 h-full bg-espresso border-l border-brass/40 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            curtainsOpen ? 'translate-x-full' : 'translate-x-0'
          }`}
        />
      </div>

      <article className="max-w-6xl mx-auto px-4 sm:px-8 py-10 lg:py-14 space-y-16">
        {/* Grand Unveiling Hero Header */}
        <header className="border-b border-hairline pb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-espresso-muted flex flex-wrap items-center gap-2">
              <span>04. The Grand Unveiling</span>
              <span aria-hidden="true">·</span>
              <span>{REVEAL_COPY.editionLine}</span>
            </p>

            <button
              type="button"
              onClick={onReplayFanfare}
              className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] text-xs font-medium border border-brass text-espresso hover:bg-limestone transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-heritage"
            >
              <Volume2 className="w-3.5 h-3.5 text-brass" strokeWidth={1.75} />
              <span>Play Royal Trumpets</span>
            </button>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.08] text-espresso mt-5 text-balance max-w-4xl">
            Behold the Smooth Era, Madame Alisa
          </h1>

          <p className="text-base sm:text-lg text-espresso-muted leading-relaxed mt-4 max-w-2xl">
            One month of patience. Zero prior body shaves. Just pure Perry-Bright
            dedication and some seriously good hair-removing chemical so you can
            admire the official after-only exhibition.
          </p>
        </header>

        {/* Section 1: Main Featured Large Photo (No Before/After Slider) */}
        <section
          aria-labelledby="featured-section-heading"
          className="space-y-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 border border-hairline bg-limestone overflow-hidden relative aspect-[3/4] max-h-[680px] mx-auto w-full">
              <LuxuryImage
                src={FEATURED_AFTER_PHOTO.src}
                alt={FEATURED_AFTER_PHOTO.alt}
                className="w-full h-full object-cover object-top"
                fallbackTitle={FEATURED_AFTER_PHOTO.title}
              />
              <button
                type="button"
                onClick={openFeaturedLightbox}
                aria-label={`Inspect ${FEATURED_AFTER_PHOTO.title} fullscreen`}
                className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 py-2 min-h-[40px] text-xs font-medium bg-espresso/90 text-vellum hover:bg-espresso transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vellum"
              >
                <Maximize2 className="w-3.5 h-3.5" strokeWidth={1.75} />
                <span>Inspect Full Portrait</span>
              </button>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between border border-hairline bg-limestone/35 p-6 sm:p-8">
              <div>
                <p className="text-xs font-mono text-brass tracking-wide">
                  {FEATURED_AFTER_PHOTO.accessionNumber}
                </p>
                <h2
                  id="featured-section-heading"
                  className="font-serif text-3xl sm:text-4xl font-medium text-espresso mt-2"
                >
                  {FEATURED_AFTER_PHOTO.title}
                </h2>
                <p className="text-sm text-espresso-muted mt-1.5">
                  {FEATURED_AFTER_PHOTO.subtitle}
                </p>
                <p className="font-serif italic text-xl text-espresso leading-relaxed mt-6 pt-6 border-t border-hairline">
                  {FEATURED_AFTER_PHOTO.caption}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-hairline text-xs text-espresso-muted flex flex-wrap items-center gap-x-2 gap-y-1">
                {FEATURED_AFTER_PHOTO.specs.map((spec, idx) => (
                  <span key={spec} className="inline-flex items-center gap-2">
                    {idx > 0 && <span aria-hidden="true">·</span>}
                    <span>{spec}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Curated Multi-Photo Gallery Slider */}
        <section
          aria-labelledby="gallery-section-heading"
          className="pt-12 border-t border-hairline space-y-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-mono text-brass tracking-wide">
                ADDITIONAL PLATES · EXHIBITION SLIDER
              </p>
              <h2
                id="gallery-section-heading"
                className="font-serif text-3xl sm:text-4xl font-medium text-espresso mt-1"
              >
                The Private Gallery Collection
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span
                data-testid="slide-counter"
                className="font-mono text-xs text-espresso-muted tabular-nums mr-1"
              >
                Plate {String(activeSlide + 1).padStart(2, '0')} of{' '}
                {String(GALLERY_PHOTOS.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                aria-label="Previous photograph"
                onClick={() =>
                  setActiveSlide((prev) =>
                    getNextSlideIndex(prev, 'prev', GALLERY_PHOTOS.length),
                  )
                }
                className="w-11 h-11 border border-hairline bg-vellum hover:bg-limestone flex items-center justify-center text-espresso transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-heritage"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={1.75} />
              </button>
              <button
                type="button"
                aria-label="Next photograph"
                onClick={() =>
                  setActiveSlide((prev) =>
                    getNextSlideIndex(prev, 'next', GALLERY_PHOTOS.length),
                  )
                }
                className="w-11 h-11 border border-hairline bg-vellum hover:bg-limestone flex items-center justify-center text-espresso transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-heritage"
              >
                <ChevronRight className="w-5 h-5" strokeWidth={1.75} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Active exhibition frame */}
            <div className="lg:col-span-7 border border-hairline bg-limestone overflow-hidden relative aspect-[3/4] max-h-[620px] w-full">
              <LuxuryImage
                src={currentPhoto.src}
                alt={currentPhoto.alt}
                className="w-full h-full object-cover object-top"
                fallbackTitle={currentPhoto.title}
              />
              <button
                type="button"
                onClick={openGalleryLightbox}
                aria-label={`Inspect ${currentPhoto.title} fullscreen`}
                className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 py-2 min-h-[40px] text-xs font-medium bg-espresso/90 text-vellum hover:bg-espresso transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vellum"
              >
                <Maximize2 className="w-3.5 h-3.5" strokeWidth={1.75} />
                <span>Inspect Full Plate</span>
              </button>
            </div>

            {/* Museum accession details & slider controls */}
            <div className="lg:col-span-5 flex flex-col justify-between border border-hairline bg-limestone/35 p-6 sm:p-8">
              <div>
                <p className="font-mono text-xs text-brass">
                  {currentPhoto.accessionNumber}
                </p>
                <h3 className="font-serif text-3xl font-medium text-espresso mt-2">
                  {currentPhoto.title}
                </h3>
                <p className="text-sm text-espresso-muted mt-1">
                  {currentPhoto.subtitle}
                </p>

                <p className="font-serif italic text-lg text-espresso leading-relaxed mt-6 pt-6 border-t border-hairline">
                  {currentPhoto.caption}
                </p>

                <div className="mt-6 pt-5 border-t border-hairline text-xs text-espresso-muted flex flex-wrap items-center gap-x-2 gap-y-1">
                  {currentPhoto.specs.map((spec, idx) => (
                    <span key={spec} className="inline-flex items-center gap-2">
                      {idx > 0 && <span aria-hidden="true">·</span>}
                      <span>{spec}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Range scrubber + Thumbnail selector */}
              <div className="mt-8 pt-6 border-t border-hairline space-y-4">
                <div className="flex items-center gap-3">
                  <label
                    htmlFor="gallery-plate-slider"
                    className="text-xs font-medium text-espresso-muted whitespace-nowrap"
                  >
                    Slide Gallery
                  </label>
                  <input
                    id="gallery-plate-slider"
                    type="range"
                    min={0}
                    max={Math.max(0, GALLERY_PHOTOS.length - 1)}
                    step={1}
                    value={activeSlide}
                    onChange={(e) => setActiveSlide(Number(e.target.value))}
                    className="w-full accent-heritage cursor-pointer min-h-[36px]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {GALLERY_PHOTOS.map((photo, idx) => {
                    const isSelected = idx === activeSlide;
                    return (
                      <button
                        key={photo.id}
                        type="button"
                        onClick={() => setActiveSlide(idx)}
                        aria-label={`View ${photo.title}`}
                        className={`relative aspect-[3/4] overflow-hidden border transition-opacity cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-heritage ${
                          isSelected
                            ? 'border-heritage ring-1 ring-heritage opacity-100'
                            : 'border-hairline opacity-65 hover:opacity-100'
                        }`}
                      >
                        <LuxuryImage
                          src={photo.src}
                          alt={photo.alt}
                          className="w-full h-full object-cover object-top"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Editorial Sign-Off Footer */}
        <footer className="pt-8 border-t border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-espresso-muted">
          <p className="font-serif text-xl italic text-espresso">
            &ldquo;{REVEAL_COPY.husbandSignature}&rdquo;
          </p>
          <p className="text-xs">
            Maison Alisa · Curated by Perry-Bright · Davai, inspect wisely
          </p>
        </footer>
      </article>

      {/* Fullscreen Lightbox Modal */}
      {lightboxPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxPhoto.title}
          className="fixed inset-0 z-50 bg-espresso/95 text-vellum flex flex-col justify-between p-4 sm:p-8"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-xs text-brass">
                {lightboxPhoto.accessionNumber}
              </p>
              <p className="font-serif text-xl text-vellum">
                {lightboxPhoto.title}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setLightboxPhoto(null)}
              aria-label="Close fullscreen view"
              className="w-11 h-11 border border-vellum/25 hover:bg-vellum/10 flex items-center justify-center text-vellum transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vellum"
            >
              <X className="w-5 h-5" strokeWidth={1.75} />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center my-4 overflow-hidden">
            <div className="max-w-4xl max-h-[75vh] w-full h-full flex items-center justify-center">
              <LuxuryImage
                src={lightboxPhoto.src}
                alt={lightboxPhoto.alt}
                className="max-w-full max-h-[75vh] object-contain"
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 text-xs text-vellum/80">
            <p className="max-w-xl">{lightboxPhoto.caption}</p>
            {lightboxIsGallery && (
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  aria-label="Previous lightbox photograph"
                  onClick={() => {
                    const prevIdx = getNextSlideIndex(
                      activeSlide,
                      'prev',
                      GALLERY_PHOTOS.length,
                    );
                    setActiveSlide(prevIdx);
                    setLightboxPhoto(GALLERY_PHOTOS[prevIdx] ?? null);
                  }}
                  className="px-4 py-2 min-h-[40px] border border-vellum/25 hover:bg-vellum/10 text-vellum cursor-pointer"
                >
                  Prev
                </button>
                <button
                  type="button"
                  aria-label="Next lightbox photograph"
                  onClick={() => {
                    const nextIdx = getNextSlideIndex(
                      activeSlide,
                      'next',
                      GALLERY_PHOTOS.length,
                    );
                    setActiveSlide(nextIdx);
                    setLightboxPhoto(GALLERY_PHOTOS[nextIdx] ?? null);
                  }}
                  className="px-4 py-2 min-h-[40px] border border-vellum/25 hover:bg-vellum/10 text-vellum cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
