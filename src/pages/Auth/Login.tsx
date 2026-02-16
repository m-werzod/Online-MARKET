import axios from "axios";
import { Mail, User } from "lucide-react";
import { useContext, useState, type FC, type FormEvent } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import SpinnerIcon from "../../assets/icons/Spinner.png";
import { AuthFormItem, Button, Hide, PATH } from "../../components";
import { Context } from "../../context/app-context";
import instance from "../../hooks/instance";
import { API_URL } from "../../hooks/URL";

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

const Login: FC = () => {
  const { setToken } = useContext(Context);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getErrorMessage = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      if (Array.isArray(message) && message.length > 0) return String(message[0]);
      if (typeof message === "string") return message;
    }
    return "Unauthorized";
  };

  const handleLoginSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await instance.post<LoginResponse>(API_URL.login, {
        email: email.trim(),
        password,
      });

      setToken(data.access_token);
      toast.success("Logged in successfully.");
      setTimeout(() => {
        navigate(PATH.home);
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
                <h1 className="text-lg font-semibold tracking-tight">Sign in</h1>
                <p className="text-xs text-slate-400">Welcome back. Continue to your account.</p>
              </div>
            </div>
          </header>
          <form onSubmit={handleLoginSubmit} className="relative mt-6 space-y-4">
            <AuthFormItem label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" rightIcon={<Mail className="pointer-events-none absolute inset-y-0 right-3 my-auto h-5 w-5 text-slate-400" />} />
            <AuthFormItem label="Password" type={showPassword ? "text" : "password"}value={password} onChange={(e) => setPassword(e.target.value)} placeholder="*****"rightIcon={<Hide showPassword={showPassword} setShowPassword={setShowPassword} />}/>
            <Button type="submit" disabled={isLoading} className={isLoading ? "cursor-not-allowed opacity-80" : ""}>{isLoading ? (  <><img src={SpinnerIcon} alt="Loading" className="h-5 w-5 animate-spin" /> <span>Signing in...</span> </>  ) : ("Sign in"  )}</Button>

            <div className="flex justify-between mt-4">
              <Link to={PATH.register}className="text-xs font-medium text-slate-300 decoration-white/20 underline-offset-4 transition-colors hover:text-slate-100 hover:decoration-white/40 hover:underline cursor-pointer" > Forgot password </Link>
              <Link  to={PATH.register} className="text-xs font-medium text-slate-300 decoration-white/20 underline-offset-4 transition-colors hover:text-slate-100 hover:decoration-white/40 hover:underline cursor-pointer"  > Register</Link>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;
