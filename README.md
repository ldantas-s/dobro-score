# Dobro Score

- Para começar um jogo deverá ter no mínimo 2 jogadores e no máximo 6;
- Se o jogo tiver até 5 jogadores é distribuido 6 cartas para cada jogador
- Se o jogo tiver 6 jogadores é distribuido 5 cartas para cada jogador
- Em caso de jogo com 2 jogadores a cada escalada após o embaralhamento das cartas, é retirada 10 cartas que não serão usadas
- Um jogo tem 3 rodadas e N escaladas;

- [] Cadastrar players;
- [] Deverá ter uma tabela de pontos/rodadas para saber como cada jodador está no jogo;
- [] Deverá ter uma tabela para registrar a quantidade de cartas de cada jodador na escalada atual
- [] A cada escalada é necessário informar a quantidade de cartas de cada jodador e processar os pontos para atualizar a tabela de pontos/rodadas;
- [] Deverá ser possível marcar o jogador com a carta de ESQUECIDO para que seja contabilizado menos 1 ponto
- [] Não poderá ser alterado o jodador depois que começar o jogo;
- [] A tabela de escalada no momento em que estiver sendo adicionado a quantidade de cartas, devera atualizar as posições dos jogadores
- [] Deverá mostrar a quantidade de cartas que sera distribuida de acordo com a quantidade de players cadastrados

Desejáveis

- [] Mostrar quantas escaladas já ocorrerão

___

## Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

