# Decisões técnicas — Descriptor Lab

> Registro das escolhas da stack e do escopo didático da atividade.

## Objetivo

A atividade exige uma aplicação baseada em React, seis componentes visuais funcionais, props/estado/hooks e acessibilidade. O professor confirmou pontos extras pelo uso de Next.js. O tema escolhido ensina conceitos de output descriptors usados por carteiras Bitcoin compatíveis.

## Stack e trade-offs

| Camada        | Escolha                               | Vantagem                                                                                                                                                                                      | Custo / alternativa                                                                                                                                                                  |
| ------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Framework     | Next.js 16 + App Router + React 19    | Atende ao critério extra confirmado pelo professor e mantém componentes, props e hooks React. `src/app/page.tsx` é a rota `/`; `src/app/layout.tsx` define o layout raiz, idioma e metadados. | Acrescenta roteamento, renderização servidor/cliente e convenções além do escopo de uma SPA simples. Vitest usa Vite internamente nos testes, mas a aplicação e o build são do Next. |
| Tipos         | TypeScript estrito                    | Tipos para perfis de descriptor, catálogo e props detectam combinações inválidas antes da execução.                                                                                           | Sintaxe adicional e `.tsx`. `src/App.tsx` compõe a UI como Client Component e é importado pela rota Next.                                                                            |
| Estilo        | Tailwind CSS 4 + CSS                  | Tailwind agiliza estados e responsividade; CSS autoral facilita layout e componentes específicos.                                                                                             | Classes utilitárias podem aumentar o JSX; CSS autoral exige cuidado para manter consistência. CSS Modules seria alternativa válida.                                                  |
| UI auxiliar   | shadcn/ui (Button, Card, Badge)       | Código de apoio editável no próprio projeto.                                                                                                                                                  | Os componentes gerados têm convenções e dependências próprias. Seu uso fica limitado à apresentação: os seis widgets avaliados são implementados manualmente.                        |
| Ícones        | lucide-react                          | Ícones componíveis sem imagens externas.                                                                                                                                                      | Uma dependência adicional; ícones decorativos ficam ocultos de tecnologias assistivas.                                                                                               |
| Estado global | Context API para toasts               | Componentes distantes emitem feedback sem encadeamento de callbacks. Além do bônus de Next.js, atende também à alternativa de estado global listada na atividade.                             | Context não é necessário para estado local nem deve substituir props. Menu, seleção e paginação mantêm estado local.                                                                 |
| Testes        | Vitest + Testing Library + user-event | Verifica interações por nomes/roles acessíveis e funções puras do catálogo.                                                                                                                   | jsdom não substitui verificação visual e de teclado em navegador real. Vitest usa Vite como runner, não como servidor/build da aplicação.                                            |
| Ambiente      | GitHub Codespaces                     | Ambiente obrigatório; `.devcontainer` declara Node e encaminha a porta 3000 do Next.                                                                                                          | Configuração local não comprova o uso: o aluno ainda precisa abrir e validar no Codespace GitHub.                                                                                    |

### Limite servidor/cliente do Next

O App Router renderiza layouts e páginas como Server Components por padrão. A experiência interativa usa `src/App.tsx` com a diretiva `'use client'`, pois estado, handlers, Context e clipboard precisam de APIs do cliente. `src/app/page.tsx` conecta a UI à rota; `src/app/layout.tsx` define o documento e os metadados.

O enunciado cita `App.js`; a implementação TypeScript usa `App.tsx`, importado pela rota Next. Se o nome literal do arquivo for uma exigência, confirme essa convenção com o professor.

## Modelo pedagógico e precisão

O app apresenta quatro famílias: `wpkh`, `sh(wpkh(...))`, `tr(...)` e `wsh(sortedmulti(...))`. O dropdown escolhe uma família; as abas apresentam a expressão e sua anatomia; o guia percorre conceitos de scripts, origem, derivação e segurança; acordeão e toast completam a experiência.

O material usa expressões como `XPUB_DEMO`, que são **placeholders intencionalmente inválidos**. Não exibimos endereços produzidos, checksum validado, wallet importável, chave real ou transação. A aplicação não implementa um parser Bitcoin Core nem valida a sintaxe completa.

Pontos que devem ser comunicados corretamente:

- Um descriptor representa instruções para construir output scripts; em carteiras HD pode incluir informação de origem e derivação de chaves. Não é sinônimo de blockchain, transação ou carteira inteira.
- `wpkh(KEY)` descreve uma saída P2WPKH; `sh(wpkh(KEY))` encapsula esse script em P2SH; `tr(KEY)` descreve uma saída Taproot e pode também representar uma árvore de scripts; `wsh(sortedmulti(k,...))` descreve multisig P2WSH com limiar `k` e ordenação determinística das chaves.
- `[FINGERPRINT/PATH]` é informação opcional de origem: fingerprint de oito caracteres hexadecimais (quatro bytes) e caminho até a chave descrita. Isso não é senha nem autenticação de identidade.
- `/0/*` é um exemplo comum de ramo externo e índice variável, mas caminhos e políticas são contextuais. `/1` é comumente usado para troco em convenções compatíveis.
- Material só público pode permitir observação sem capacidade de assinatura; material privado incluído pode permitir gasto. Um xpub também pode expor privacidade. Nunca solicitar ou colar chaves reais.

## Componentes da atividade → implementação

| Requisito                     | Uso no Descriptor Lab                                                                                                          |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Accordion                     | Perguntas frequentes sobre chaves, placeholders e wildcard (`src/components/Accordion.tsx`).                                   |
| Paginação                     | Navegação pelas quatro etapas de aprendizagem (`src/components/Pagination.tsx`).                                               |
| Barra de progresso            | Percentual de etapas explicitamente concluídas (`src/components/ProgressBar.tsx`).                                             |
| Abas                          | Expressão vs. anatomia do modelo selecionado (`src/components/Tabs.tsx`).                                                      |
| Menu suspenso                 | Seleção do tipo/família de script (`src/components/DropdownMenu.tsx`).                                                         |
| Toast                         | Feedback global ao selecionar/copiar um modelo ou concluir etapa (`src/context/ToastContext.tsx` + `src/context/useToast.ts`). |
| Bônus                         | Next.js com App Router (confirmado pelo professor) e Context API para estado global.                                           |
| Responsividade/acessibilidade | Layout mobile-first, roles/estados ARIA, teclado, foco e movimento reduzido.                                                   |

## Roteiro para o vídeo (2–3 minutos)

1. Explique que é um laboratório educativo e que os exemplos são placeholders não importáveis.
2. Alterne entre as quatro famílias de script no dropdown.
3. Mostre as abas **Expressão** e **Anatomia** e explique um ou dois tokens, sem tratar o exemplo como string válida para wallet.
4. Percorra as etapas via paginação, marque uma concluída e mostre a atualização do progresso/toast.
5. Abra uma dúvida do acordeão e mostre a interface em larguras mobile e desktop.
6. No editor, explique `src/app/page.tsx`, `src/App.tsx`, um widget próprio, o catálogo e o Context de toast; aponte `'use client'`.
7. Se possível, finalize mostrando testes, verificação de tipos e build no Codespace.

## Referências primárias

- Next.js — [App Router](https://nextjs.org/docs/app) e [Server/Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components).
- Tailwind CSS — [instalação com PostCSS](https://tailwindcss.com/docs/installation/using-postcss).
- Bitcoin Core, [Output Script Descriptors](https://github.com/bitcoin/bitcoin/blob/master/doc/descriptors.md): expressões de scripts, chaves, derivação e origens.
- [BIP 380 — Output Script Descriptors General Operation](https://github.com/bitcoin/bips/blob/master/bip-0380.mediawiki): estrutura geral, key expressions, fingerprint, derivação e wildcard.
- [BIP 382 — SegWit Output Script Descriptors](https://github.com/bitcoin/bips/blob/master/bip-0382.mediawiki): `wpkh` e `wsh`.
- [BIP 383 — Multisig Output Script Descriptors](https://github.com/bitcoin/bips/blob/master/bip-0383.mediawiki): `multi` e `sortedmulti`.
- [BIP 386 — Taproot Output Script Descriptors](https://github.com/bitcoin/bips/blob/master/bip-0386.mediawiki): `tr(KEY)` e árvores opcionais.
- React — [Context](https://react.dev/learn/passing-data-deeply-with-context) e [compartilhar estado](https://react.dev/learn/sharing-state-between-components).
- W3C ARIA APG — [Accordion](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) e [Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/).
