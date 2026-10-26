# Descriptor Lab

Laboratório educativo para aprender a ler **output descriptors do Bitcoin**. A interface apresenta famílias de scripts, divide os modelos em partes e conduz por um roteiro interativo.

> **Apenas didático:** os exemplos usam placeholders (`XPUB_DEMO`, `XPUB_A` etc.), não são descriptors válidos/importáveis e não devem ser usados para gerar carteiras ou transações. Não cole chaves reais. O app não se conecta à rede Bitcoin.

## Stack

Next.js com App Router + React + TypeScript estrito, Tailwind CSS 4 e shadcn/ui para elementos visuais auxiliares. Os seis componentes avaliados são implementados no projeto. A Context API compartilha as notificações. Vitest usa Vite como infraestrutura de testes; a aplicação é executada pelo Next.js.

## Executar no GitHub Codespaces

O Codespaces é o ambiente obrigatório da atividade. Abra o repositório no GitHub Codespaces e use o terminal integrado:

```bash
pnpm install
pnpm dev
```

Abra a porta **3000** quando o Codespaces solicitar. O servidor Next está configurado para aceitar conexões externas ao container.

```bash
pnpm test                 # suíte de testes
pnpm run check-types      # verificação TypeScript
pnpm run --silent lint    # lint (avisos nos componentes de apoio shadcn)
pnpm run build            # build de produção
pnpm run start            # servir o build de produção
pnpm run test:watch       # testes em modo watch
pnpm format               # formatar arquivos e ordenar classes Tailwind
pnpm format:check         # verificar formatação sem alterar arquivos
```

## O que explorar

1. Escolha uma família no menu: `wpkh`, `sh(wpkh)`, `tr` ou `wsh(sortedmulti)`.
2. Na aba **Expressão**, veja o modelo e o tipo de saída que ele representa.
3. Na aba **Anatomia**, explore a explicação de cada segmento.
4. Percorra as quatro etapas do guia usando a paginação, marque as que concluiu e acompanhe o progresso.
5. Consulte o acordeão e as notas de segurança. A seleção de um modelo, cópia do exemplo e conclusão de etapas geram notificações.

## Componentes da atividade

- `src/components/Accordion.tsx`: dúvidas frequentes sobre descriptors.
- `src/components/Pagination.tsx`: navegação pelas etapas do guia.
- `src/components/ProgressBar.tsx`: etapas concluídas.
- `src/components/Tabs.tsx`: expressão e anatomia.
- `src/components/DropdownMenu.tsx`: seleção da família de scripts.
- `src/context/ToastContext.tsx`: feedback global via Context API.

`src/App.tsx` compõe a experiência interativa com classes Tailwind e usa o limite cliente do App Router (`'use client'`). `src/app/globals.css` mantém apenas tema, fonte e estilos globais. O Prettier, com `prettier-plugin-tailwindcss`, formata o repositório e ordena as classes. `src/app/page.tsx` define a rota inicial; `src/app/layout.tsx` fornece o layout, idioma e metadados. `src/features/descriptors/catalog.ts` contém o material didático. `docs/decisoes-tecnicas.md` registra trade-offs e inclui o roteiro do vídeo.

## Segurança e precisão

Os exemplos são **esquemas visuais com placeholders**, não strings prontas para importação. O conteúdo distingue material público e privado e alerta sobre privacidade de xpubs. Não é uma ferramenta de wallet, gerador de endereços, validador de descriptors ou aconselhamento financeiro.

## Responsividade e acessibilidade

Layout mobile-first, foco visível, nomes e estados ARIA, navegação por teclado nos widgets, notificações sem transferência de foco e suporte a `prefers-reduced-motion`. Validar visualmente em 375 px, 768 px e 1440 px no navegador do Codespace.
