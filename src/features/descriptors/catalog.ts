export type DescriptorId = "wpkh" | "sh-wpkh" | "tr" | "wsh-multisig";

export type DescriptorProfile = {
  readonly id: DescriptorId;
  readonly label: string;
  readonly family: string;
  readonly sample: string;
  readonly output: string;
  readonly useCase: string;
  readonly explanation: string;
  readonly parts: readonly {
    readonly token: string;
    readonly meaning: string;
  }[];
};

export const descriptorProfiles: readonly DescriptorProfile[] = [
  {
    id: "wpkh",
    label: "Native SegWit · wpkh",
    family: "SegWit nativo · P2WPKH",
    sample: "wpkh([F1A2B3C4/84h/0h/0h]XPUB_DEMO/0/*)",
    output: "Script witness v0 do tipo P2WPKH",
    useCase: "Recebimentos SegWit nativos com uma chave pública derivada.",
    explanation:
      "wpkh descreve um pagamento SegWit nativo para uma chave pública. É uma forma comum de representar saídas de carteiras de assinatura única.",
    parts: [
      {
        token: "wpkh( … )",
        meaning: "Template de saída: witness v0 com hash de chave pública.",
      },
      {
        token: "[F1A2B3C4/84h/0h/0h]",
        meaning:
          "Origem ilustrativa: fingerprint da chave-mestra e caminho de derivação.",
      },
      {
        token: "XPUB_DEMO",
        meaning:
          "Placeholder de chave pública estendida — não é uma chave válida.",
      },
      {
        token: "/0/*",
        meaning:
          "Ramo externo de recebimento e índice variável para gerar saídas sucessivas.",
      },
    ],
  },
  {
    id: "sh-wpkh",
    label: "SegWit aninhado · sh(wpkh)",
    family: "SegWit aninhado · P2SH-P2WPKH",
    sample: "sh(wpkh([F1A2B3C4/49h/0h/0h]XPUB_DEMO/0/*))",
    output: "P2SH envolvendo um programa witness v0 P2WPKH",
    useCase: "Representação SegWit encapsulada em P2SH.",
    explanation:
      "A composição sh(wpkh(...)) descreve SegWit aninhado: um programa witness P2WPKH encapsulado em uma saída P2SH.",
    parts: [
      {
        token: "sh( … )",
        meaning: "Envolve o script interno em um pagamento P2SH.",
      },
      {
        token: "wpkh( … )",
        meaning: "Script witness v0 com hash de chave pública.",
      },
      {
        token: "[F1A2B3C4/49h/0h/0h]",
        meaning: "Origem ilustrativa segundo o caminho comum BIP-49.",
      },
      {
        token: "/0/*",
        meaning: "Ramo externo e índice de derivação variável.",
      },
    ],
  },
  {
    id: "tr",
    label: "Taproot · tr",
    family: "Taproot · P2TR",
    sample: "tr([F1A2B3C4/86h/0h/0h]XPUB_DEMO/0/*)",
    output: "Saída witness v1 do tipo P2TR",
    useCase:
      "Saídas Taproot por caminho de chave; árvores de scripts também podem ser descritas.",
    explanation:
      "tr(...) descreve uma saída Taproot. A forma simples abaixo ilustra o caminho de chave; descriptors Taproot também podem incluir uma árvore de scripts.",
    parts: [
      {
        token: "tr( … )",
        meaning: "Template de saída Taproot (witness v1 / P2TR).",
      },
      {
        token: "[F1A2B3C4/86h/0h/0h]",
        meaning: "Origem ilustrativa com o caminho comum BIP-86.",
      },
      {
        token: "XPUB_DEMO",
        meaning:
          "Placeholder de chave pública estendida — não é uma chave válida.",
      },
      {
        token: "/0/*",
        meaning: "Ramo externo e índice de derivação variável.",
      },
    ],
  },
  {
    id: "wsh-multisig",
    label: "Multisig · wsh(sortedmulti)",
    family: "Multisig SegWit · P2WSH",
    sample: "wsh(sortedmulti(2,XPUB_A/0/*,XPUB_B/0/*,XPUB_C/0/*))",
    output: "P2WSH com política multisig 2-de-3",
    useCase:
      "Uma saída requer assinaturas de pelo menos duas entre três chaves.",
    explanation:
      "wsh(sortedmulti(...)) descreve uma política multisig P2WSH. O número 2 define o limiar; sortedmulti ordena as chaves de forma determinística.",
    parts: [
      { token: "wsh( … )", meaning: "Usa um witness script P2WSH." },
      {
        token: "sortedmulti(2, … )",
        meaning:
          "Política multisig: 2 assinaturas necessárias; chaves ordenadas deterministicamente.",
      },
      {
        token: "XPUB_A / XPUB_B / XPUB_C",
        meaning:
          "Placeholders para três chaves públicas estendidas — não são chaves válidas.",
      },
      {
        token: "/0/*",
        meaning: "Cada chave é derivada no ramo externo para cada índice.",
      },
    ],
  },
];

export const lessonSteps = [
  {
    title: "O que descreve um descriptor?",
    eyebrow: "01 · A IDEIA",
    body: "Um output descriptor é uma expressão que informa como construir scripts de saída Bitcoin e, em carteiras HD, como derivar as chaves e os índices associados. Não é, por si só, a blockchain nem uma transação.",
    example: "wpkh( … ) → template de saída P2WPKH",
  },
  {
    title: "Origem e fingerprint",
    eyebrow: "02 · DE ONDE VEM A CHAVE",
    body: "O trecho entre colchetes pode registrar um fingerprint de 4 bytes da chave-mestra e o caminho percorrido até a chave usada. A origem ajuda a identificar como a chave foi derivada; o fingerprint não é uma senha nem uma prova criptográfica de identidade.",
    example: "[F1A2B3C4/84h/0h/0h]",
  },
  {
    title: "Ramo e índice variável",
    eyebrow: "03 · COMO DERIVAR MAIS SAÍDAS",
    body: "Em caminhos HD comuns, /0/* representa o ramo externo de recebimento e um índice variável. /1 costuma ser usado para troco. A convenção depende do esquema de derivação; não interprete qualquer descriptor sem conhecer sua política.",
    example: "XPUB_DEMO/0/* → recebimento, índices sucessivos",
  },
  {
    title: "Watch-only e segurança",
    eyebrow: "04 · O QUE PROTEGER",
    body: "Um descriptor com material somente público pode ajudar a observar saídas sem poder gastá-las. Descriptors que contêm material privado podem permitir gastos. Um xpub também revela informações de privacidade: use apenas placeholders neste laboratório e nunca cole chaves reais.",
    example:
      "XPUB → informação pública com risco de privacidade · XPRV → segredo capaz de autorizar gastos",
  },
] as const;

export function findDescriptor(id: DescriptorId): DescriptorProfile {
  const profile = descriptorProfiles.find((item) => item.id === id);
  if (!profile) throw new Error(`Descriptor desconhecido: ${id}`);
  return profile;
}

export function getLessonProgress(
  completedSteps: readonly number[],
  totalSteps: number,
): number {
  if (totalSteps <= 0) return 0;
  return Math.round((new Set(completedSteps).size / totalSteps) * 100);
}
