import { Eye, EyeOff } from "lucide-react";
import type { FC, Dispatch, SetStateAction } from "react";

interface HideProps {
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
}

const Hide: FC<HideProps> = ({ showPassword, setShowPassword }) => {

  return (
    <button  type="button"  aria-label={showPassword ? "Hide password" : "Show password"}onClick={() => setShowPassword((v) => !v)}className="absolute inset-y-0 right-3 my-auto inline-flex items-center justify-center text-slate-400 transition-colors focus:outline-none cursor-pointer">
      {showPassword ? (
        <EyeOff className="h-5 w-5" />
      ) : (
        <Eye className="h-5 w-5" />
      )}
    </button>
  );
};

export default Hide
