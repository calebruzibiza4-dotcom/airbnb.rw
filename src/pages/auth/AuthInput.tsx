import { forwardRef, type InputHTMLAttributes } from 'react';

export type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(({ label, error, id, ...props }, ref) => {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold text-slate-800">{label}</label>
      <input
        id={id}
        ref={ref}
        {...props}
        className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm text-slate-950 outline-none transition duration-200 placeholder:text-slate-400 focus:ring-4 ${error ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-100' : 'border-slate-200 focus:border-emerald-700 focus:ring-emerald-100'} ${props.className ?? ''}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error ? <p id={`${id}-error`} className="text-xs font-medium text-rose-600">{error}</p> : null}
    </div>
  );
});

AuthInput.displayName = 'AuthInput';

export default AuthInput;
