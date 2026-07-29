import { forwardRef, useState, type InputHTMLAttributes } from 'react';

export type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string;
  error?: string;
};

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(({ label, error, id, ...props }, ref) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-slate-800">{label}</label>
      <div className="relative">
        <input
          id={id}
          ref={ref}
          {...props}
          type={visible ? 'text' : 'password'}
          className={`w-full rounded-2xl border bg-white px-4 py-3.5 pr-16 text-sm text-slate-950 outline-none transition duration-200 placeholder:text-slate-400 focus:ring-4 ${error ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-100' : 'border-slate-200 focus:border-emerald-700 focus:ring-emerald-100'} ${props.className ?? ''}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <button
          type="button"
          onClick={() => setVisible((value) => !value)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
        >
          {visible ? 'Hide' : 'Show'}
        </button>
      </div>
      {error ? <p id={`${id}-error`} className="text-xs font-medium text-rose-600">{error}</p> : null}
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
