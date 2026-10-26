import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastProvider } from "./ToastContext";
import { useToast } from "./useToast";

function DemoAction() {
  const { notify } = useToast();
  return (
    <button onClick={() => notify("success", "Bloco simulado criado")}>
      Criar bloco
    </button>
  );
}

describe("notificações globais", () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("pode ser disparada de um componente e fechada pelo usuário", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <DemoAction />
      </ToastProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Criar bloco" }));
    expect(screen.getByRole("status")).toHaveTextContent(
      "Bloco simulado criado",
    );
    await user.click(
      screen.getByRole("button", { name: "Fechar notificação" }),
    );
    expect(screen.queryByText("Bloco simulado criado")).not.toBeInTheDocument();
  });

  it("fecha a notificação automaticamente após 4,5 segundos", async () => {
    vi.useFakeTimers();
    render(
      <ToastProvider>
        <DemoAction />
      </ToastProvider>,
    );
    await act(async () => {
      screen.getByRole("button", { name: "Criar bloco" }).click();
    });
    expect(screen.getByRole("status")).toBeInTheDocument();
    await act(async () => {
      vi.advanceTimersByTime(4_500);
    });
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
