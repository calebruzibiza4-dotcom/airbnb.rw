'use client';

import { useEffect, useState } from 'react';

type AvatarProps = {
  src?: string | null;
  name?: string | null;
  sizeClassName?: string;
  className?: string;
};

export default function Avatar({ src, name, sizeClassName = 'h-9 w-9', className = '' }: AvatarProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const fallbackClassName = `${sizeClassName} ${className}`.trim();

  useEffect(() => {
    setImageFailed(false);
  }, [src]);

  if (src && !imageFailed) {
    return (
      <img
        src={src}
        alt={name || 'User avatar'}
        loading="lazy"
        className={`${fallbackClassName} rounded-full object-cover`}
        onError={() => {
          setImageFailed(true);
        }}
      />
    );
  }

  const initials = (name || 'U')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');

  return (
    <div className={`${fallbackClassName} grid place-items-center rounded-full bg-gradient-to-br from-emerald-700 to-emerald-900 text-sm font-semibold text-white shadow-sm`}>
      {initials || 'U'}
    </div>
  );
}