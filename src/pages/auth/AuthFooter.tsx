type AuthFooterProps = {
  prompt: string;
  linkText: string;
  href: string;
};

export default function AuthFooter({ prompt, linkText, href }: AuthFooterProps) {
  return (
    <p className="text-center text-sm text-slate-500">
      {prompt}{' '}
      <a href={href} className="font-bold text-emerald-800 underline decoration-emerald-200 underline-offset-4 transition hover:text-emerald-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700">{linkText}</a>
    </p>
  );
}
