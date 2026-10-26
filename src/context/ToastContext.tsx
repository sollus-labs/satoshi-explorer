import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { CircleCheck, CircleX, Info, X } from "lucide-react";
import { ToastContext, type ToastKind, type ToastMessage } from "./ToastState";

const icons = { success: CircleCheck, error: CircleX, info: Info };
const iconClasses: Record<ToastKind, string> = {
  success: "text-[#41d39a]",
  error: "text-[#fb7185]",
  info: "text-[#7cb8ff]",
};

export function ToastProvider({ children }: { readonly children: ReactNode }) {
  const [toasts, setToasts] = useState<readonly ToastMessage[]>([]);
  const nextId = useRef(0);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  const dismiss = useCallback((id: number) => {
    const timer = timers.current.get(id);
    if (timer) clearTimeout(timer);
    timers.current.delete(id);
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const notify = useCallback(
    (kind: ToastKind, message: string) => {
      const id = ++nextId.current;
      setToasts((current) => [...current, { id, kind, message }]);
      timers.current.set(
        id,
        setTimeout(() => dismiss(id), 4_500),
      );
    },
    [dismiss],
  );

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <div
        className="fixed right-4 bottom-4 z-50 flex w-[min(380px,calc(100vw-32px))] flex-col gap-2"
        aria-label="Notificações"
        aria-live="polite"
        aria-relevant="additions"
      >
        {toasts.map((toast) => {
          const Icon = icons[toast.kind];
          return (
            <div
              key={toast.id}
              className="flex items-center gap-2.5 rounded-xl border border-[#343a44] bg-[#171a20] px-3.5 py-3 text-xs text-[#e7e9ed] shadow-xl shadow-black/50"
              role={toast.kind === "error" ? "alert" : "status"}
            >
              <Icon
                size={18}
                className={iconClasses[toast.kind]}
                aria-hidden="true"
              />
              <span>{toast.message}</span>
              <button
                type="button"
                className="ml-auto grid size-6 shrink-0 place-items-center rounded text-[#9298a2] transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-[#f7931a]"
                aria-label="Fechar notificação"
                onClick={() => dismiss(toast.id)}
              >
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
