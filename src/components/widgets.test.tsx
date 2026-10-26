import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Accordion } from "./Accordion";
import { DropdownMenu } from "./DropdownMenu";
import { Pagination } from "./Pagination";
import { ProgressBar } from "./ProgressBar";
import { Tabs } from "./Tabs";

describe("componentes interativos", () => {
  it("acordeão mantém apenas uma seção aberta", async () => {
    const user = userEvent.setup();
    render(
      <Accordion
        items={[
          { title: "Primeira", content: "Conteúdo 1" },
          { title: "Segunda", content: "Conteúdo 2" },
        ]}
      />,
    );
    expect(screen.getByRole("button", { name: "Primeira" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    await user.click(screen.getByRole("button", { name: "Segunda" }));
    expect(screen.getByRole("button", { name: "Primeira" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(screen.getByRole("button", { name: "Segunda" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("paginação comunica mudança e desabilita limites", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Pagination totalPages={4} currentPage={1} onPageChange={onChange} />,
    );
    expect(
      screen.getByRole("button", { name: "Página anterior" }),
    ).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "Página 3" }));
    expect(onChange).toHaveBeenCalledWith(3);
    expect(screen.getByRole("button", { name: "Página 1" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("progresso limita o valor acessível entre 0 e 100", () => {
    render(<ProgressBar value={130} label="Progresso" />);
    expect(
      screen.getByRole("progressbar", { name: "Progresso" }),
    ).toHaveAttribute("aria-valuenow", "100");
  });

  it("abas respondem a clique e teclado", async () => {
    const user = userEvent.setup();
    render(
      <Tabs
        items={[
          { id: "a", label: "Blocos", content: "Lista de blocos" },
          { id: "b", label: "Transações", content: "Lista de transações" },
        ]}
      />,
    );
    const firstTab = screen.getByRole("tab", { name: "Blocos" });
    firstTab.focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Transações" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent(
      "Lista de transações",
    );
  });

  it("dropdown fecha após seleção, clique fora e Escape", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <>
        <DropdownMenu
          label="Ordenar"
          value="novo"
          options={[
            { value: "novo", label: "Novos" },
            { value: "antigo", label: "Antigos" },
            { value: "maior", label: "Maiores" },
          ]}
          onChange={onChange}
        />
        <button>Fora</button>
      </>,
    );
    const trigger = screen.getByRole("button", { name: /Novos/ });
    await user.click(trigger);
    expect(screen.getByRole("menuitemradio", { name: "Novos" })).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(
      screen.getByRole("menuitemradio", { name: "Antigos" }),
    ).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(
      screen.getByRole("menuitemradio", { name: "Maiores" }),
    ).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    expect(
      screen.getByRole("menuitemradio", { name: "Antigos" }),
    ).toHaveFocus();
    await user.click(screen.getByRole("menuitemradio", { name: "Antigos" }));
    expect(onChange).toHaveBeenCalledWith("antigo");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Novos/ }));
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Novos/ }));
    await user.click(screen.getByRole("button", { name: "Fora" }));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});
