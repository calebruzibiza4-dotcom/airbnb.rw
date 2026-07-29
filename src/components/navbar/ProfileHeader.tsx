import Avatar from './Avatar';

type ProfileHeaderProps = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export default function ProfileHeader({ name, email, image }: ProfileHeaderProps) {
  const displayName = name?.trim() || 'Welcome back';
  const displayEmail = email?.trim() || 'Signed in';

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-3">
      <Avatar src={image} name={displayName} sizeClassName="h-11 w-11" className="border border-white/70 bg-white shadow-sm" />
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-slate-900">{displayName}</p>
        <p className="truncate text-xs text-slate-600">{displayEmail}</p>
      </div>
    </div>
  );
}
