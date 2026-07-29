type ModalFooterProps = {
  prompt: string;
  action: string;
  onAction: () => void;
};

export default function ModalFooter({ prompt, action, onAction }: ModalFooterProps) {
  return (
    <p className="text-center text-sm text-slate-500">
      {prompt}{' '}
      <button type="button" onClick={onAction} className="font-bold text-emerald-800 underline decoration-emerald-200 underline-offset-4 transition hover:text-emerald-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2">{action}</button>
    </p>
  );
}
