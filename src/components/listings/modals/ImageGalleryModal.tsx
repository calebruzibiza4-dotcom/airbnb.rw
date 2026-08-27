'use client';

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryModalProps {
  gallery: Array<{ url: string; path: string; isCover: boolean }>;
  title: string;
  onClose: () => void;
}

export default function ImageGalleryModal({ gallery, title, onClose }: ImageGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95" onClick={onClose}>
      <div className="relative h-full w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-white p-2 hover:bg-slate-100"
          aria-label="Close gallery"
        >
          <X className="h-6 w-6 text-slate-900" />
        </button>

        {/* Main Image */}
        <div className="relative h-full max-h-[90vh] w-full max-w-4xl">
          <img
            src={gallery[currentIndex].url}
            alt={`${title} - Image ${currentIndex + 1}`}
            className="h-full w-full object-contain"
          />

          {/* Navigation Arrows */}
          {gallery.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-3 transition hover:bg-white"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6 text-slate-900" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-3 transition hover:bg-white"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6 text-slate-900" />
              </button>
            </>
          )}

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-slate-900/70 px-4 py-2 text-sm font-semibold text-white">
            {currentIndex + 1} / {gallery.length}
          </div>
        </div>

        {/* Thumbnail Strip */}
        {gallery.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 bg-gradient-to-t from-slate-950 to-transparent px-4 py-8">
            {gallery.map((image, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-16 w-16 rounded-lg overflow-hidden border-2 transition ${
                  i === currentIndex ? 'border-white' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={image.url} alt={`Thumbnail ${i + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
