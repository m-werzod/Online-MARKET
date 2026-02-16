import type { ButtonHTMLAttributes, FC, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  title?: string;
  children?: ReactNode;
};

const Button: FC<Props> = ({ title, children, className = "", type = "button", ...props }) => {
  return (
    <button {...props} type={type}  className={`cursor-pointer group relative w-full overflow-hidden rounded-2xl bg-[linear-gradient(90deg,#34d399_0%,#22c55e_30%,#60a5fa_100%)] px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/15 transition-colors transform-none active:scale-100 ${className}`}>
      <span className="relative z-10 inline-flex items-center justify-center gap-2">{children ?? title}</span>
      <span className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(450px_160px_at_50%_-20%,rgba(255,255,255,.35),transparent_60%)]" />
    </button>
  );
};

export default Button;
