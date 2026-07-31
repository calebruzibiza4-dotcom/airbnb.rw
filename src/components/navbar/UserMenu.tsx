import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faCreditCard, faGear, faGlobe, faReceipt, faHouseChimneyUser, faUser, faUserPen } from '@fortawesome/free-solid-svg-icons';
import ProfileAvatar from './ProfileAvatar';
import ProfileHeader from './ProfileHeader';



type UserMenuProps = {
  open: boolean;
  onToggle: () => void;
  userName?: string | null;
  userEmail?: string | null;
  userImage?: string | null;
  onSignOut: () => void;
  onOpenHostWizard?: () => void;
  hostProfileComplete?: boolean;
};

const primaryItems = [
  { label: 'My Profile', icon: faUser, iconClassName: 'text-slate-700' },
  { label: 'Your Stays', icon: faHouseChimneyUser, iconClassName: 'text-slate-700' },
  { label: 'My Bookings', icon: faCalendarCheck, iconClassName: 'text-slate-700' },
  { label: 'Edit Profile', icon: faUserPen, iconClassName: 'text-slate-700' },
  { label: 'Payment Methods', icon: faCreditCard, iconClassName: 'text-slate-700' },
  { label: 'Billing & Receipts', icon: faReceipt, iconClassName: 'text-slate-700' },
  { label: 'Language & Currency', icon: faGlobe, iconClassName: 'text-slate-700' },
  { label: 'Account Settings', icon: faGear, iconClassName: 'text-slate-700' },
];

export default function UserMenu({ open, onToggle, userName, userEmail, userImage, onSignOut, onOpenHostWizard, hostProfileComplete = false }: UserMenuProps) {
  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={onToggle}
        aria-label="Open account menu"
        aria-expanded={open}
        aria-haspopup="menu"
        className="group inline-flex h-12 items-center gap-3 rounded-full border border-emerald-200 bg-white px-2.5 pr-3 text-slate-700 shadow-sm transition duration-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
      >
        <ProfileAvatar src={userImage} name={userName} sizeClassName="h-8 w-8" className="ring-2 ring-white/80" />
        <span className="hidden text-sm font-semibold text-slate-900 sm:block">{userName || 'Account'}</span>
      </button>
      {open ? (
        <div role="menu" className="absolute right-0 top-full z-20 mt-2 w-72 origin-top-right animate-[dropdown_200ms_ease-out] rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10">
          <ProfileHeader name={userName} email={userEmail} image={userImage} />
          <div className="mt-1.5 space-y-1">
            {primaryItems.map((item) => (
              <button key={item.label} type="button" role="menuitem" className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-sm text-slate-700 transition duration-200 hover:bg-slate-100 focus-visible:bg-slate-100 focus-visible:outline-none">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs">
                  <FontAwesomeIcon icon={item.icon} className={item.iconClassName} />
                </span>
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>
          <div className="my-1.5 h-px bg-slate-200" />
          {onOpenHostWizard ? (
            <button type="button" onClick={onOpenHostWizard} role="menuitem" className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-sm font-semibold text-emerald-700 transition duration-200 hover:bg-emerald-50 focus-visible:bg-emerald-50 focus-visible:outline-none">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-xs">
                <FontAwesomeIcon icon={faHouseChimneyUser} />
              </span>
              <span>{hostProfileComplete ? 'Host Dashboard' : 'Create Host Profile'}</span>
            </button>
          ) : null}
          <button type="button" onClick={onSignOut} role="menuitem" className="mt-1 flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-sm font-semibold text-rose-600 transition duration-200 hover:bg-rose-50 focus-visible:bg-rose-50 focus-visible:outline-none">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-50 text-xs">
              <FontAwesomeIcon icon={faUser} />
            </span>
            <span>Log Out</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
