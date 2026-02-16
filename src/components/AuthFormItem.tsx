import type { ChangeEventHandler, FC, ReactNode } from "react";

interface AuthFormItemProps {
  label: string;
  type: "text" | "email" | "password";
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  rightIcon?: ReactNode;
}

const AuthFormItem: FC<AuthFormItemProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  rightIcon,
}) => {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-slate-300">{label}</span>
      <div className="relative">
        <input type={type}  value={value}  onChange={onChange} placeholder={placeholder}  className={`h-12 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm text-slate-100 placeholder:text-slate-500 shadow-[0_10px_30px_rgba(0,0,0,0.25)] outline-none transition-all duration-200 focus:border-emerald-400/35 focus:bg-white/[0.045] focus:ring-4 focus:ring-emerald-500/10 ${ rightIcon ? "pr-12" : "pr-4" }`} />{rightIcon}
      </div>
    </label>
  );
};

export default AuthFormItem;
