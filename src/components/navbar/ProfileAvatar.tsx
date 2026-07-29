import Avatar from './Avatar';

type ProfileAvatarProps = {
  src?: string | null;
  name?: string | null;
  sizeClassName?: string;
  className?: string;
};

export default function ProfileAvatar({ src, name, sizeClassName = 'h-10 w-10', className = '' }: ProfileAvatarProps) {
  return (
    <Avatar
      src={src}
      name={name}
      sizeClassName={sizeClassName}
      className={`border border-white/90 bg-white shadow-sm transition duration-200 group-hover:scale-[1.02] ${className}`.trim()}
    />
  );
}
