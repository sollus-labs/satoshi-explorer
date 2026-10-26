import { createContext } from "react";

export type ToastKind = "success" | "error" | "info";
export type ToastMessage = {
  readonly id: number;
  readonly kind: ToastKind;
  readonly message: string;
};
export type ToastContextValue = {
  readonly notify: (kind: ToastKind, message: string) => void;
};
export const ToastContext = createContext<ToastContextValue | null>(null);
