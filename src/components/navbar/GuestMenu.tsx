type GuestMenuProps = {
  open: boolean;
  onToggle: () => void;
  onLogIn: () => void;
  onSignUp: () => void;
};

export default function GuestMenu({ open, onToggle, onLogIn, onSignUp }: GuestMenuProps) {
  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={onToggle}
        aria-label="Open profile menu"
        aria-expanded={open}
        aria-haspopup="menu"
        className="group inline-flex h-12 items-center gap-3 rounded-full border border-slate-200 bg-white px-2.5 pl-3 text-slate-700 shadow-sm transition duration-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-900 text-sm font-semibold text-white transition duration-200 group-hover:bg-slate-800">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="8" r="3" />
            <path d="M5 20a7 7 0 0 1 14 0" />
          </svg>
        </span>
      </button>
      {open ? (
        <div role="menu" className="absolute right-0 top-full z-20 mt-2 w-56 origin-top-right animate-[dropdown_200ms_ease-out] rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10">
          <button type="button" onClick={onSignUp} role="menuitem" className="block w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-slate-900 transition duration-200 hover:bg-slate-100 focus-visible:bg-slate-100 focus-visible:outline-none">Sign up</button>
          <button type="button" onClick={onLogIn} role="menuitem" className="block w-full rounded-xl px-3 py-2.5 text-left text-sm text-slate-700 transition duration-200 hover:bg-slate-100 focus-visible:bg-slate-100 focus-visible:outline-none">Log in</button>
          <div className="my-2 h-px bg-slate-200" />
          <button type="button" onClick={onSignUp} role="menuitem" className="block w-full rounded-xl px-3 py-2.5 text-left text-sm text-slate-700 transition duration-200 hover:bg-slate-100 focus-visible:bg-slate-100 focus-visible:outline-none">Become a host</button>
          <a href="#help" role="menuitem" className="block rounded-xl px-3 py-2.5 text-sm text-slate-700 transition duration-200 hover:bg-slate-100 focus-visible:bg-slate-100 focus-visible:outline-none">Help Centre</a>
        </div>
      ) : null}
    </div>
  );
}
