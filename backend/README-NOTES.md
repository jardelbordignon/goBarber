## Criando o projeto
yarn init -y
yarn add express
yarn add @types/express -D
yarn add typescript -D
yarn tsc --init   // gera o tsconfig.json

** no tsconfig.json configurar rootDir e outDir - depois rodar > yarn tsc

para facilitar, no package.json criar script
"build": "tsc"

## Preparando ambiente DEV
yarn add ts-node-dev -D

criar script
"server": "ts-node-dev src/server.ts"
para ficar mais rápido
"server": "ts-node-dev --transpile-only --ignore-watch node_modules src/server.ts"

## Lidando com o Debug
1 - no debug do VScode clicar em "create a launch.json file"
2 - no arquivo gerado alterar
"request": "attach",
"protocol": "inspector",
"restart": true,

excluir a config "program"

incluir a flag --inspect no script do server para criar um link onde o debug vai se conectar a aplicação
"server": "ts-node-dev --inspect --transpile-only --ignore-watch node_modules src/server.ts"

feito isso basta rodar o debug, incluir os breakpoints...

## Lidando com a criptografia de senha
yarn add bcryptjs