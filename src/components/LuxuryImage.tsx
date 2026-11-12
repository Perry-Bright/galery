import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface LuxuryImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
}

export function LuxuryImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackTitle = 'Archival Plate Pending',
  fallbackSubtitle = 'Place your photograph in public/photos/',
}: LuxuryImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className="w-full h-full min-h-[280px] bg-limestone border border-hairline flex flex-col items-center justify-center p-8 text-center select-none"
        role="img"
        aria-label={alt}
      >
        <div className="w-12 h-12 border border-brass/50 flex items-center justify-center mb-4 text-brass">
          <ImageOff className="w-5 h-5" strokeWidth={1.5} />
        </div>
        <p className="font-serif text-xl font-medium text-espresso">
          {fallbackTitle}
        </p>
        <p className="text-xs text-espresso-muted mt-1.5 max-w-xs">
          {fallbackSubtitle}
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
