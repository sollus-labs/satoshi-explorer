Atividade ReactJs

Objetivo da Atividade
O objetivo desta atividade é desenvolver uma aplicação web responsiva utilizando a
biblioteca React.js, aplicando os conceitos de componentes, estado e propriedades,
com um novo conjunto de componentes visuais.
Condições:

1. Estrutura da Aplicação: A aplicação deve ser construída utilizando a
   arquitetura de componentes do React.js, com uma estrutura clara e modular.
   Deve incluir um componente principal (App.js) que orquestra os demais
   componentes.
2. Responsividade: A aplicação deve ser totalmente responsiva, adaptando-se
   a dispositivos móveis (smartphones), tablets e desktops. O layout deve ser
   fluido e os elementos devem se reorganizar de forma adequada em diferentes
   resoluções de tela.
3. Componentes: A página deve incorporar, no mínimo, 6 (seis) componentes
   visuais distintos, implementados como componentes React. Os componentes
   obrigatórios são:
    Acordeão: Seções de conteúdo expansíveis e colapsáveis. Exemplo de
   uso: Perguntas Frequentes (FAQ).
    Paginação: Navegação entre páginas de conteúdo. Exemplo de uso:
   Listagem de produtos, resultados de busca.
    Barra de Progresso: Indicador visual de progresso de uma tarefa. Exemplo
   de uso: Upload de arquivos, carregamento de dados.
    Abas: Organização de conteúdo em diferentes painéis. Exemplo de uso:
   Seções de perfil de usuário, detalhes de produto.
    Menu Suspenso: Seleção de uma opção a partir de uma lista. Exemplo de
   uso: Filtros, seleção de idioma.
   Universidade Católica do Salvador
   Escola de Tecnologias

Curso Engenharia de Software Data:
Professor Elton Figueiredo da Silva

 Notificação Toast: Mensagens temporárias de feedback para o usuário.
Exemplo de uso: Sucesso na operação, erro ao salvar. 4. Conteúdo: O conteúdo dos componentes pode ser fictício (Lorem Ipsum), mas
deve ser semanticamente relevante para o tipo de componente. Cada
componente deve demonstrar funcionalidade clara e propósito bem definido. 5. Tecnologia Principal (React.js): A solução principal deve ser desenvolvida
utilizando a biblioteca React.js. Os alunos devem demonstrar compreensão
dos seguintes conceitos:
o Criação e uso de componentes funcionais e/ou de classe.
o Uso de props para passar dados entre componentes.
o Gerenciamento de state local em componentes.
o Uso de hooks (ex: useState, useEffect) para componentes funcionais.
o Manipulação de eventos. 6. Acessibilidade e Semântica: O código deve seguir boas práticas de
acessibilidade web, incluindo uso correto de tags semânticas HTML5 e
atributos ARIA quando necessário.
Desafio Extra (0,2 pontos adicionais)
Para obter 0,2 pontos extras, você deve desenvolver a mesma solução (com os
mesmos 6 componentes e responsividade) utilizando um dos seguintes recursos
adicionais:
 Gerenciamento de Estado Global: Implementar um gerenciador de estado
global (ex: Context API ou Redux) para compartilhar dados entre componentes
não diretamente relacionados.
 React Router: Implementar navegação entre diferentes "páginas" da
aplicação utilizando o React Router.
Observação sobre a Implementação por Componente

1. Acordeão (Accordion):
   o O Acordeão deve incluir: Múltiplos itens expansíveis/colapsáveis.
   Apenas um item deve estar aberto por vez (opcional, mas preferível).
   Transição suave ao expandir/colapsar.

o Implementação React: Deve ser um componente React que gerencia o
estado de qual item está aberto (se houver) e recebe os títulos e
conteúdos dos itens via props.

2. Paginação (Pagination):
   o A Paginação deve incluir: Botões para navegar para a página anterior,
   próxima e páginas específicas. Indicação da página atual. Desabilitação
   dos botões de navegação (anterior/próxima) quando não aplicável.
   o Implementação React: Deve ser um componente React que recebe o
   número total de páginas e a página atual via props, e um callback para
   mudar de página.

3. Barra de Progresso (Progress Bar):
   o A Barra de Progresso deve incluir: Um indicador visual do progresso (ex:
   preenchimento de uma barra). Pode exibir o valor percentual (opcional).
   o Implementação React: Deve ser um componente React que recebe o
   valor do progresso (0-100) via props e atualiza sua largura ou
   preenchimento com base nesse valor.

4. Abas (Tabs):
   o As Abas devem incluir: Múltiplos títulos de abas clicáveis. Conteúdo
   correspondente a cada aba, exibido quando a aba é selecionada.
   o Implementação React: Deve ser um componente React que gerencia
   qual aba está ativa no seu state e exibe o conteúdo da aba selecionada.
   Os títulos e conteúdos das abas podem ser passados via props.

5. Menu Suspenso (Dropdown Menu):
   o O Menu Suspenso deve incluir: Um botão ou elemento clicável que
   revela uma lista de opções. As opções devem ser clicáveis e podem
   disparar ações. Fechamento do menu ao selecionar uma opção ou clicar
   fora.
   o Implementação React: Deve ser um componente React que gerencia
   sua visibilidade via state e recebe as opções do menu via props. Cada
   opção pode ter um callback associado.
6. Notificação Toast (Toast Notification):

o A Notificação Toast deve incluir: Uma mensagem breve e informativa.
Exibição temporária na tela, desaparecendo após alguns segundos ou
ao ser fechada pelo usuário. Pode ter diferentes tipos (sucesso, erro,
informação).
o Implementação React: Deve ser um componente React que gerencia
sua visibilidade e conteúdo via state (ou via um contexto global para
múltiplas notificações). Pode receber o tipo e a mensagem via props.

Observações Importantes
Este trabalho é estritamente INDIVIDUAL! Cada aluno deve desenvolver sua
própria solução de forma autônoma.
 Vídeo Explicativo (Obrigatório): O aluno deve gravar e enviar um vídeo curto
explicando a solução desenvolvida por ele, demonstrando o funcionamento
dos componentes e passando pelo código implementado.
 Ambiente de Desenvolvimento Obrigatório — GitHub Codespaces
([github.com/features/codespaces](https://github.com/features/codespaces)):
o O que é: O próprio VS Code completo rodando na nuvem, integrado
diretamente aos seus repositórios do GitHub.
o Destaques: Como roda a interface padrão do Visual Studio Code na
Web, você pode alterar o idioma da interface para Português (Brasil)
instalando a extensão oficial de idioma (Portuguese Language Pack).
Oferece uma cota gratuita mensal para contas do GitHub.

 Responsividade é essencial: A aplicação deve ser testada em diferentes
resoluções (mobile, tablet, desktop).
 Código limpo: Utilize indentação consistente, nomes descritivos para
variáveis/funções/componentes e comentários quando necessário.
 Sem dependências externas desnecessárias: Utilize apenas a biblioteca
React.js e, se necessário, uma biblioteca de UI leve (ex: Material-UI, Ant
Design, ou estilização com CSS puro/módulos CSS/Styled Components) para
auxiliar na estilização, mas o foco deve ser na implementação React.
