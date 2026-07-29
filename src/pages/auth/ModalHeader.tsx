type ModalHeaderProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export default function ModalHeader({ eyebrow, title, subtitle }: ModalHeaderProps) {
  return (
    <div className="text-center">
      <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-emerald-800 text-white shadow-lg shadow-emerald-900/20">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 18 9.5 6h5L19 18" />
          <path d="M7 14h10" />
        </svg>
      </span>
      <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-700">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{title}</h2>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">{subtitle}</p>
    </div>
  );
}
