import { Code2, Globe, ShieldCheck, Users } from "lucide-react";
import DashboardLayout from "../../components/DashboardLayout";

const About = () => {
  return (
    <DashboardLayout title="About Us" subtitle="Who we are and what this platform does">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur sm:p-6">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-200/75">Online Market</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Smart dashboard for managing products faster
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
          This project helps teams explore products, filter quickly, and review details in one place.
          It is built with React, TypeScript, and Tailwind to keep the UI fast and responsive on desktop
          and mobile devices.
        </p>
      </section>

      <section className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <Users size={18} className="text-indigo-200" />
          <h3 className="mt-3 text-sm font-semibold text-white">Team Focus</h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-300">
            Built to improve collaboration between admins, catalog managers, and sellers.
          </p>
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <Code2 size={18} className="text-indigo-200" />
          <h3 className="mt-3 text-sm font-semibold text-white">Modern Stack</h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-300">
            Uses TypeScript and component-driven architecture for maintainable scaling.
          </p>
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <Globe size={18} className="text-indigo-200" />
          <h3 className="mt-3 text-sm font-semibold text-white">Responsive UI</h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-300">
            Optimized for mobile, tablet, and desktop with adaptive layout behavior.
          </p>
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <ShieldCheck size={18} className="text-indigo-200" />
          <h3 className="mt-3 text-sm font-semibold text-white">Reliable UX</h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-300">
            Clear actions, graceful loading states, and fallback behavior for stable experience.
          </p>
        </article>
      </section>
    </DashboardLayout>
  );
};

export default About;
