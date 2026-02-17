import { useEffect, type FC, type ReactNode } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;
}

const Modal: FC<Props> = ({
  open,
  onClose,
  children,
  closeOnOverlay = true,
  closeOnEscape = true,
}) => {
  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleEscape(event: KeyboardEvent) {
      if (closeOnEscape && event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose, closeOnEscape]);

  if (!open) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      <div
        onClick={closeOnOverlay ? onClose : undefined}
        className={`absolute inset-0 bg-slate-950/80 backdrop-blur-md [animation:fadeIn_180ms_ease-out] ${closeOnOverlay ? "cursor-pointer" : "cursor-default"}`}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.2),transparent_56%)]" />

      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/15 bg-[linear-gradient(165deg,rgba(15,23,42,0.98),rgba(17,24,39,0.92))] text-white shadow-[0_24px_80px_rgba(2,6,23,0.8)] [animation:modalIn_240ms_cubic-bezier(0.16,1,0.3,1)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/80 to-transparent" />
        <div className="pointer-events-none absolute -top-20 right-[-40px] h-56 w-56 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="relative p-5 sm:p-7">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
