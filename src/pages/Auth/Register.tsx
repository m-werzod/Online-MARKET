import axios from "axios";
import { Mail, User } from "lucide-react";
import { useState, type FC, type FormEvent } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import SpinnerIcon from "../../assets/icons/Spinner.png";
import { Button, Hide, PATH } from "../../components";
import instance from "../../hooks/instance";
import { API_URL } from "../../hooks/URL";

interface RegisterResponse {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

const Register: FC = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getErrorMessage = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      if (Array.isArray(message) && message.length > 0) return String(message[0]);
      if (typeof message === "string") return message;
    }
    return "Registration failed.";
  };

  const handleRegisterSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await instance.post<RegisterResponse>(API_URL.users, {
        name: fullName.trim(),
        email: email.trim(),
        password,
        avatar: "https://t4.ftcdn.net/jpg/06/43/68/65/360_F_643686558_Efl6HB1ITw98bx1PdAd1wy56QpUTMh47.jpg",
      });

      toast.success(`User ${data.name} created successfully.`);
      setTimeout(() => {
        navigate(PATH.login);
      }, 1000);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(1200px_600px_at_15%_10%,rgba(56,189,248,0.16),transparent_60%),radial-gradient(900px_520px_at_85%_15%,rgba(34,197,94,0.12),transparent_58%),radial-gradient(760px_480px_at_50%_95%,rgba(168,85,247,0.12),transparent_58%),linear-gradient(135deg,#05070f_0%,#0b1220_45%,#05070f_100%)] text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-md items-center justify-center px-4 py-10">
        <section className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-7">
          <header className="relative">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                <User className="h-5 w-5 text-slate-100" />
              </div>
              <div>
                <h1 className="text-lg font-semibold tracking-tight">Create account</h1>
                <p className="text-xs text-slate-400">Register to start using your account.</p>
              </div>
            </div>
          </header>

          <form onSubmit={handleRegisterSubmit} className="relative mt-6 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-slate-300">Full name</span>
              <div className="relative">
                <input
     type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your name"className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 pr-12 text-sm text-slate-100 placeholder:text-slate-500 shadow-[0_10px_30px_rgba(0,0,0,0.25)] outline-none transition-all duration-200 focus:border-emerald-400/35 focus:bg-white/[0.045] focus:ring-4 focus:ring-emerald-500/10"/>
                <User className="pointer-events-none absolute inset-y-0 right-3 my-auto h-5 w-5 text-slate-400" />
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-slate-300">Email</span>
              <div className="relative">
                <input type="email"  value={email}  onChange={(e) => setEmail(e.target.value)}placeholder="Enter your email"className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 pr-12 text-sm text-slate-100 placeholder:text-slate-500 shadow-[0_10px_30px_rgba(0,0,0,0.25)] outline-none transition-all duration-200 focus:border-emerald-400/35 focus:bg-white/[0.045] focus:ring-4 focus:ring-emerald-500/10"  />
                <Mail className="pointer-events-none absolute inset-y-0 right-3 my-auto h-5 w-5 text-slate-400" />
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-slate-300">Password</span>
              <div className="relative">
                <input  type={showPassword ? "text" : "password"}  value={password} onChange={(e) => setPassword(e.target.value)} placeholder="*****" className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.03] pl-4 pr-12 text-sm text-slate-100 placeholder:text-slate-500 shadow-[0_10px_30px_rgba(0,0,0,0.25)] outline-none transition-all duration-200 focus:border-sky-400/30 focus:bg-white/[0.045] focus:ring-4 focus:ring-sky-500/10" />
                <Hide showPassword={showPassword} setShowPassword={setShowPassword} />
              </div>
            </label>

            <Button type="submit" disabled={isLoading} className={isLoading ? "cursor-not-allowed opacity-80" : ""}>{isLoading ? (<><img src={SpinnerIcon} alt="Loading" className="h-5 w-5 animate-spin" /> <span>Creating user...</span></>) : ("Register")}</Button>
            <div className="flex justify-between mt-4">
              <Link to={PATH.login} className="text-xs font-medium text-slate-300 decoration-white/20 underline-offset-4 transition-colors hover:text-slate-100 hover:decoration-white/40 hover:underline cursor-pointer">  Already have an account?</Link>
              <Link  to={PATH.login} className="text-xs font-medium text-slate-300 decoration-white/20 underline-offset-4 transition-colors hover:text-slate-100 hover:decoration-white/40 hover:underline cursor-pointer"  > Sign in </Link>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Register;
