"use client";

import { useState, type ReactNode } from "react";
import {
  BookOpen,
  Braces,
  Check,
  ChevronRight,
  CircleHelp,
  Copy,
  Fingerprint,
  Layers3,
  LockKeyhole,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Waypoints,
} from "lucide-react";
import { Accordion } from "./components/Accordion";
import { DropdownMenu } from "./components/DropdownMenu";
import { Pagination } from "./components/Pagination";
import { ProgressBar } from "./components/ProgressBar";
import { Tabs, type TabItem } from "./components/Tabs";
import { ToastProvider } from "./context/ToastContext";
import { useToast } from "./context/useToast";
import {
  descriptorProfiles,
  findDescriptor,
  getLessonProgress,
  lessonSteps,
  type DescriptorId,
} from "./features/descriptors/catalog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const descriptorOptions = descriptorProfiles.map((profile) => ({
  value: profile.id,
  label: profile.label,
}));

const metricToneClasses = {
  orange: "bg-[#f7931a]/10 text-[#f7931a]",
  blue: "bg-[#4d9eff]/10 text-[#69aeff]",
  purple: "bg-[#aa82ff]/10 text-[#b899ff]",
  green: "bg-[#41d39a]/10 text-[#41d39a]",
} as const;

type MetricTone = keyof typeof metricToneClasses;

function DescriptorLab() {
  const [descriptorId, setDescriptorId] = useState<DescriptorId>("wpkh");
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<readonly number[]>([]);
  const { notify } = useToast();
  const descriptor = findDescriptor(descriptorId);
  const lesson = lessonSteps[currentStep - 1]!;
  const progress = getLessonProgress(completedSteps, lessonSteps.length);
  const isComplete = completedSteps.includes(currentStep - 1);

  function selectDescriptor(id: DescriptorId) {
    setDescriptorId(id);
    notify(
      "info",
      `Modelo selecionado: ${findDescriptor(id).family}. Estrutura apenas ilustrativa.`,
    );
  }

  function completeCurrentStep() {
    if (isComplete) return;
    setCompletedSteps((steps) => [...steps, currentStep - 1]);
    notify("success", `Etapa concluída: ${lesson.title}`);
  }

  function resetProgress() {
    setCompletedSteps([]);
    setCurrentStep(1);
    notify("info", "Seu roteiro de aprendizagem foi reiniciado.");
  }

  async function copySample() {
    try {
      await navigator.clipboard.writeText(descriptor.sample);
      notify(
        "success",
        "Modelo didático copiado. Ele contém placeholders e não pode ser importado.",
      );
    } catch {
      notify(
        "info",
        "Selecione e copie o texto manualmente. O exemplo contém placeholders.",
      );
    }
  }

  function scrollToLab() {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    document
      .getElementById("laboratorio")
      ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }

  const expressionContent = (
    <div className="pt-4">
      <div className="flex items-center justify-between gap-3 text-[8px] font-semibold tracking-[0.12em] text-[#858b96]">
        <span>EXPRESSÃO DIDÁTICA</span>
        <Badge
          variant="outline"
          className="h-[21px] border-[#60421f] bg-[#241a10] text-[8px] text-[#e6ab61]"
        >
          NÃO IMPORTÁVEL
        </Badge>
      </div>
      <div className="my-3 flex items-start gap-2 rounded-lg border border-[#2a2e35] bg-[#0a0c10] p-3.5">
        <code className="flex-1 font-mono text-[11px] leading-relaxed break-all text-[#ffc16f] sm:text-sm">
          {descriptor.sample}
        </code>
        <Button
          variant="ghost"
          size="icon-sm"
          className="shrink-0 text-[#9298a2] hover:text-white"
          aria-label="Copiar modelo didático"
          onClick={() => void copySample()}
        >
          <Copy size={15} />
        </Button>
      </div>
      <p className="my-4 flex items-start gap-2 text-[10px] leading-relaxed text-[#9ca1aa]">
        <ShieldAlert
          size={15}
          className="mt-0.5 shrink-0 text-[#d99a4f]"
          aria-hidden="true"
        />
        {descriptor.explanation}
      </p>
      <div className="grid gap-2.5 sm:grid-cols-2">
        <div className="flex min-h-[70px] flex-col gap-2 rounded-lg border border-[#242831] bg-[#12151a] p-3">
          <span className="text-[8px] font-semibold tracking-[0.08em] text-[#858b96]">
            SAÍDA DESCRITA
          </span>
          <strong className="text-[10px] leading-relaxed font-medium text-[#d7d9de]">
            {descriptor.output}
          </strong>
        </div>
        <div className="flex min-h-[70px] flex-col gap-2 rounded-lg border border-[#242831] bg-[#12151a] p-3">
          <span className="text-[8px] font-semibold tracking-[0.08em] text-[#858b96]">
            USO ILUSTRATIVO
          </span>
          <strong className="text-[10px] leading-relaxed font-medium text-[#d7d9de]">
            {descriptor.useCase}
          </strong>
        </div>
      </div>
    </div>
  );

  const anatomyContent = (
    <div className="flex flex-col pt-2">
      {descriptor.parts.map((part, index) => (
        <div
          className="flex gap-3 border-b border-[#22262e] px-0.5 py-3"
          key={`${part.token}-${index}`}
        >
          <span className="pt-0.5 font-mono text-[9px] text-[#cf8d3e]">
            0{index + 1}
          </span>
          <div className="min-w-0">
            <code className="font-mono text-[10px] break-all text-[#f1b366]">
              {part.token}
            </code>
            <p className="mt-1.5 text-[9px] leading-relaxed text-[#969ba4]">
              {part.meaning}
            </p>
          </div>
        </div>
      ))}
      <p className="mt-3 text-[9px] leading-relaxed text-[#787e88]">
        A expressão acima usa identificadores fictícios: não é uma string válida
        para importar em Bitcoin Core.
      </p>
    </div>
  );

  const tabs: readonly TabItem[] = [
    { id: "expressao", label: "Expressão", content: expressionContent },
    { id: "anatomia", label: "Anatomia", content: anatomyContent },
  ];

  const faqItems = [
    {
      title: "Um descriptor é uma carteira?",
      content: (
        <p>
          Não exatamente. É uma expressão que descreve como produzir scripts de
          saída e, em estruturas HD, como derivar chaves. Uma carteira pode usar
          descriptors para acompanhar ou controlar esses scripts.
        </p>
      ),
    },
    {
      title: "Um xpub permite gastar bitcoin?",
      content: (
        <p>
          Não fornece, por si só, a chave privada necessária para assinar. Mas
          um xpub pode revelar endereços derivados e prejudicar a privacidade.
          Trate material privado como segredo e nunca o cole neste laboratório.
        </p>
      ),
    },
    {
      title: "Por que os exemplos não são importáveis?",
      content: (
        <p>
          Os trechos usam nomes como XPUB_DEMO no lugar de chaves públicas
          estendidas reais e omitem dados necessários para validação. São
          esquemas didáticos, não descriptors prontos para uma carteira.
        </p>
      ),
    },
    {
      title: "O que significa o asterisco?",
      content: (
        <p>
          Em um caminho de derivação compatível, o curinga representa índices
          sucessivos. O contexto do caminho e a política da carteira determinam
          como esses índices são usados.
        </p>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#090b0f] text-[#f1f2f4]">
      <header className="border-b border-[#1c2027] bg-[#090b0f]/95">
        <div className="mx-auto flex h-[68px] max-w-[1216px] items-center justify-between gap-4 px-4 sm:px-7">
          <a
            className="flex shrink-0 items-center gap-2.5 text-[11px] font-bold tracking-[0.09em] text-[#f3f4f6] no-underline sm:text-[13px]"
            href="#inicio"
            aria-label="Descriptor Lab — início"
          >
            <span className="grid size-[29px] place-items-center rounded-lg border border-[#60401f] bg-[#f7931a]/10 text-[#f7931a]">
              <Braces size={17} aria-hidden="true" />
            </span>
            <span>
              DESCRIPTOR<span className="text-[#f7931a]">.LAB</span>
            </span>
          </a>
          <nav
            className="flex h-full items-center gap-2.5 text-[9px] sm:gap-6 sm:text-xs"
            aria-label="Navegação principal"
          >
            <a
              className="flex h-full items-center border-b-2 border-[#f7931a] text-[#f1f2f4] no-underline"
              href="#laboratorio"
            >
              Laboratório
            </a>
            <a
              className="flex h-full items-center border-b-2 border-transparent text-[#7f8590] no-underline hover:text-white"
              href="#guia"
            >
              Guia
            </a>
            <a
              className="flex h-full items-center border-b-2 border-transparent text-[#7f8590] no-underline hover:text-white"
              href="#duvidas"
            >
              Dúvidas
            </a>
          </nav>
          <div className="flex shrink-0 items-center gap-2 text-[0px] font-bold tracking-[0.1em] text-[#b6bbc4] sm:text-[9px]">
            <span className="size-2 rounded-full bg-[#41d39a] shadow-[0_0_12px_#41d39766]" />
            MODO EDUCATIVO
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1216px] px-3.5 pt-4 pb-5 sm:px-7 sm:pt-6">
        <div className="flex min-h-[38px] items-start gap-2.5 rounded-lg border border-[#5a3b1b] bg-gradient-to-r from-[#25190f] to-[#17130e] px-3 py-2 text-[9px] leading-relaxed text-[#c6a77f] sm:items-center sm:text-[10px]">
          <ShieldAlert
            size={16}
            className="mt-0.5 shrink-0 text-[#f7931a] sm:mt-0"
            aria-hidden="true"
          />
          <span>
            <strong className="text-[#f2b567]">LABORATÓRIO SEGURO</strong> — sem
            chaves reais, carteiras ou conexão com a rede.
          </span>
          <span className="ml-auto hidden shrink-0 rounded border border-[#563a1e] px-2 py-1 text-[8px] tracking-[0.08em] text-[#e4a65f] sm:block">
            EXEMPLOS FICTÍCIOS
          </span>
        </div>

        <section
          className="flex flex-col items-start justify-between gap-4 py-8 sm:py-10 md:flex-row md:items-end"
          aria-labelledby="page-title"
        >
          <div>
            <div className="flex items-center gap-2 text-[9px] font-bold tracking-[0.15em] text-[#9b8061]">
              <span className="h-px w-[18px] bg-[#f7931a]" />
              BITCOIN · SAÍDAS DESCRITAS
            </div>
            <h1
              id="page-title"
              className="mt-3 mb-2 text-[30px] leading-[1.08] font-semibold tracking-[-0.055em] sm:text-[40px] lg:text-[44px]"
            >
              Entenda as{" "}
              <span className="text-[#f7931a]">descriptor wallets.</span>
            </h1>
            <p className="max-w-[520px] text-[11px] text-[#9297a1] sm:text-[13px]">
              Aprenda a ler as expressões que descrevem scripts e derivação,
              peça por peça.
            </p>
          </div>
          <Button
            className="h-[38px] w-full bg-[#f7931a] px-4 text-[11px] font-bold text-[#16110c] hover:bg-[#ffab3e] focus-visible:ring-[#f7931a] md:w-auto"
            onClick={scrollToLab}
          >
            <Sparkles size={16} aria-hidden="true" /> Explorar os modelos
          </Button>
        </section>

        <section
          className="mb-4 grid grid-cols-2 gap-2.5 xl:grid-cols-4"
          aria-label="Resumo do laboratório"
        >
          <Metric
            icon={<Layers3 />}
            label="FAMÍLIAS DE EXEMPLO"
            value="04"
            detail="Padrões comuns de saída"
            tone="orange"
          />
          <Metric
            icon={<BookOpen />}
            label="ETAPAS DO GUIA"
            value="04"
            detail="No seu ritmo"
            tone="blue"
          />
          <Metric
            icon={<Waypoints />}
            label="COMPONENTES REACT"
            value="06"
            detail="Implementados no projeto"
            tone="purple"
          />
          <Metric
            icon={<LockKeyhole />}
            label="CHAVES REAIS"
            value="ZERO"
            detail="Placeholders apenas"
            tone="green"
          />
        </section>

        <div className="grid items-start gap-3.5 lg:grid-cols-[minmax(0,1.35fr)_minmax(330px,0.85fr)]">
          <Card
            id="laboratorio"
            className="min-w-0 overflow-visible border-[#22262f] bg-gradient-to-br from-[#111419] to-[#0e1015] p-3.5 shadow-[0_16px_40px_#0003] sm:p-5"
          >
            <div className="mb-4 flex flex-col items-start justify-between gap-2.5 sm:flex-row sm:items-center sm:gap-3.5">
              <div>
                <span className="text-[8px] font-bold tracking-[0.15em] text-[#9b8061]">
                  LABORATÓRIO INTERATIVO
                </span>
                <h2 className="mt-1 text-sm font-semibold tracking-tight text-[#f1f2f4]">
                  Explore uma família de scripts
                </h2>
              </div>
              <DropdownMenu
                label="Família"
                value={descriptorId}
                options={descriptorOptions}
                onChange={selectDescriptor}
                className="w-full justify-between sm:w-auto sm:justify-start"
              />
            </div>
            <div className="mb-2 flex min-h-[33px] items-center gap-2 rounded-md border border-[#2c2a25] bg-[#171510] px-2.5 text-[9px] text-[#d9b17b] sm:text-[10px]">
              <span className="size-1.5 shrink-0 rounded-full bg-[#f7931a] shadow-[0_0_10px_#f7931a77]" />
              {descriptor.family}
              <span className="ml-auto text-[7px] tracking-[0.1em] text-[#8e806b] sm:text-[8px]">
                SAÍDA DESCRITA
              </span>
            </div>
            <Tabs items={tabs} />
          </Card>

          <aside id="guia" className="flex flex-col gap-3">
            <Card className="border-[#22262f] bg-gradient-to-br from-[#111419] to-[#0e1015] p-3.5 shadow-[0_16px_40px_#0003] sm:p-4">
              <div className="mb-4 flex items-center gap-2.5">
                <span className="grid size-[31px] shrink-0 place-items-center rounded-lg border border-[#3d301f] bg-[#251b11] text-[#f1a74f]">
                  <BookOpen size={18} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <span className="text-[8px] font-bold tracking-[0.15em] text-[#9b8061]">
                    ROTEIRO DE APRENDIZAGEM
                  </span>
                  <h2 className="mt-1 text-[15px] font-semibold tracking-tight text-[#f1f2f4]">
                    Um conceito por vez
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="text-[#9298a2] hover:text-white"
                  aria-label="Reiniciar progresso"
                  onClick={resetProgress}
                >
                  <RotateCcw size={15} />
                </Button>
              </div>
              <ProgressBar value={progress} label="Progresso do roteiro" />
              <article
                className="min-h-0 py-4 sm:min-h-[210px] sm:pb-3"
                aria-live="polite"
              >
                <span className="text-[8px] font-bold tracking-[0.12em] text-[#bd8d53]">
                  {lesson.eyebrow}
                </span>
                <h3 className="mt-2 mb-2 text-sm leading-snug font-semibold text-[#eee]">
                  {lesson.title}
                </h3>
                <p className="text-[10px] leading-relaxed text-[#a0a5ae]">
                  {lesson.body}
                </p>
                <code className="mt-3 block rounded-md border border-[#292d34] bg-[#0b0d11] p-2.5 font-mono text-[9px] leading-relaxed break-words whitespace-normal text-[#f1b366]">
                  {lesson.example}
                </code>
              </article>
              <div className="flex items-center justify-between gap-2 border-t border-[#242831] py-2.5 text-[9px] text-[#838994]">
                <span>
                  Etapa {currentStep} de {lessonSteps.length}
                </span>
                <Pagination
                  totalPages={lessonSteps.length}
                  currentPage={currentStep}
                  onPageChange={setCurrentStep}
                />
              </div>
              <Button
                className={`h-[34px] w-full border text-[10px] ${isComplete ? "border-[#24513e] bg-[#11241b] text-[#69d7a5] hover:bg-[#11241b]" : "border-[#5a3c1c] bg-[#261b10] text-[#f0b365] hover:bg-[#372513]"}`}
                onClick={completeCurrentStep}
                disabled={isComplete}
              >
                {isComplete ? (
                  <>
                    <Check size={16} /> Etapa concluída
                  </>
                ) : (
                  "Marcar etapa como concluída"
                )}
              </Button>
            </Card>

            <Card
              id="duvidas"
              className="border-[#22262f] bg-gradient-to-br from-[#111419] to-[#0e1015] p-3.5 shadow-[0_16px_40px_#0003] sm:p-4"
            >
              <div className="mb-2.5 flex items-center gap-2.5">
                <span className="grid size-7 shrink-0 place-items-center rounded-lg border border-[#373047] bg-[#1b1822] text-[#b3a1e7]">
                  <CircleHelp size={17} aria-hidden="true" />
                </span>
                <div>
                  <span className="text-[8px] font-bold tracking-[0.15em] text-[#9b8061]">
                    CONCEITOS-CHAVE
                  </span>
                  <h2 className="mt-1 text-[15px] font-semibold tracking-tight text-[#f1f2f4]">
                    Dúvidas frequentes
                  </h2>
                </div>
              </div>
              <Accordion items={faqItems} />
            </Card>
          </aside>
        </div>

        <section className="mt-4 flex flex-wrap items-start gap-2.5 rounded-lg border border-[#343024] bg-gradient-to-r from-[#18150f] to-[#12130f] p-3 text-[#aaa18e]">
          <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-[#292012] text-[#e6a653]">
            <Fingerprint size={17} aria-hidden="true" />
          </span>
          <p className="min-w-[calc(100%-44px)] flex-1 text-[9px] leading-relaxed sm:min-w-0">
            <strong className="text-[#e5b773]">Privacidade importa.</strong> Um
            xpub não é uma chave de gasto, mas pode expor informações sobre seus
            endereços. Use somente material fictício em ambientes de
            demonstração.
          </p>
          <a
            className="ml-[38px] inline-flex items-center gap-1 text-[9px] text-[#c9a36d] no-underline hover:text-[#f0c98f] sm:ml-0"
            href="#guia"
          >
            Rever segurança <ChevronRight size={15} aria-hidden="true" />
          </a>
        </section>

        <footer className="flex flex-col gap-2 py-4 text-[8px] text-[#777d87] sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#41d39a] shadow-[0_0_12px_#41d39766]" />
            Laboratório didático · nenhum dado real utilizado
          </span>
          <span>Aprender sobre descriptors sem colocar chaves em risco</span>
        </footer>
      </main>
    </div>
  );
}

function Metric({
  icon,
  label,
  value,
  detail,
  tone,
}: {
  readonly icon: ReactNode;
  readonly label: string;
  readonly value: string;
  readonly detail: string;
  readonly tone: MetricTone;
}) {
  return (
    <Card className="relative flex min-h-[106px] flex-col items-start gap-2 border-[#22262f] bg-gradient-to-br from-[#111419] to-[#0e1015] p-3 shadow-[0_10px_30px_#0002] sm:min-h-[120px] sm:p-4">
      <span
        className={`absolute top-3 right-3 grid size-[30px] place-items-center rounded-lg sm:top-4 sm:right-4 ${metricToneClasses[tone]}`}
      >
        {icon}
      </span>
      <span className="max-w-[calc(100%-24px)] text-[7px] font-semibold tracking-[0.09em] text-[#858b96] sm:text-[8px]">
        {label}
      </span>
      <strong className="text-xl leading-none font-semibold tracking-tight text-[#f1f2f4] sm:text-[23px]">
        {value}
      </strong>
      <span className="text-[8px] text-[#777d87] sm:text-[9px]">{detail}</span>
    </Card>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <DescriptorLab />
    </ToastProvider>
  );
}
