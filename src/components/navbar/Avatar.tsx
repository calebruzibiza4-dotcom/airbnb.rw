'use client';

type AvatarProps = {
  src?: string | null;
  name?: string | null;
  sizeClassName?: string;
};

export default function Avatar({ src, name, sizeClassName = 'h-9 w-9' }: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={name || 'User avatar'}
        className={`${sizeClassName} rounded-full object-cover ring-2 ring-white/80`}
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
    <div className={`${sizeClassName} grid place-items-center rounded-full bg-gradient-to-br from-emerald-700 to-emerald-900 text-sm font-semibold text-white shadow-sm`}>
      {initials || 'U'}
    </div>
  );
}