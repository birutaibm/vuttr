# Very Useful Tools to Remember

Este projeto consiste na minha implementação do desfio proposto pela BossaBox para testar meu conhecimento em back-end. Trata-se de uma lista de ferramentas, cada uma contendo título, descrição, link e uma lista de tags. O aplicativo permite recuperar a lista em formato json, bem como cadastrar uma nova ferramenta ou deletar uma já existente. Por motivos de segurança, porém, as funcionalidades de adição e remoção de ferramentas só estão acessíveis para usuários logados na aplicação.

## Técnologias empregadas

O aplicativo foi desenvolvido em Node com TypeScript, utilizando ESLint e Prettier para facilitar a formatação do código no editor VSCode.

Partindo para as ferramentas da aplicação propriamente dita, ela cria um servidor (que quando executado localmente ouvirá a porta 3000) utilizando Express.

Como banco de dados, foi escolhido o MongoDB rodando sobre o cluster gratuito on-line que pode ser criado no próprio site do MongoDB. Embora o espeço seja limitado, esse serviço permite testar a aplicação sem custo nenhum, e facilita a configuração uma vez que a versão em produção do aplicativo poderá utilizar o mesmo banco de dados. Reforçando que não é uma boa idea utilizar o mesmo banco para desenvolvimento e produção, estou fazendo isso aqui apenas por se tratar de um teste de habilidades e não de uma aplicação comercial.

Outras ferramentas utilizadas incluem:
  - **dotenv:** Para esconder valores sensíveis tais como senha de banco de dados por exemplo.
  - **mongoose:** Para definir os modelos e repositórios, tanto de ferramentas quanto de usuários, de forma compatível com o MongoDB,
  - **bcryptjs:** Para manipulação de senha, tanto sua encriptação quanto a comparação da senha fornecida no login com a versão encriptada que está no banco de dados.
  - **jsonwebtoken:** Para controlar o acesso a funcionalidades que necessitem de autenticação através de JWT.
  - **celebrate:** Para validar dados recebidos antes de passá-los para seus controllers.
  - **jest:** Para rodar os testes em ambiente de desenvolvimento.

## Executando o aplicativo localmente

  - Clone ou baixe o repositório para a sua máquina
  - Dentro do diretório raiz do repositório baixado execute o comando `yarn` (obviamente tendo o NodeJS e yarn instalados na sua máquina) para instalar as dependências do projeto
  - Renomeie o arquivo `.env.example` para `.env` e edite-o inserindo as informações obtidas em seu cluster MongoDB (para criar o cluster pesquise por MongoDB atlas)
  - execute `yarn dev:server`
  - acesse as rotas a partir de http://localhost:3000/
    - você pode ver mais sobre as rotas acessando http://localhost:3000/docs

## Arquitetura empregada

Por se tratar de um aplicativo pequeno, ele não foi divido em módulos. Sua organização atual, a partir do diretório raiz é a seguinte:
  - arquivos de configuração do ambiente (tais como `.env`, `.gitignore`, entre outros) soltos na raiz.
    - aqui merece menção o arquivo `client.http` que descreve requisições HTTP para a aplicação que podem ser executadas de dentro do VSCode utilizando o plugin `Rest Client`
  - **docs:** diretório que será servido estaticamente na rota `/docs` com o SwaggerUI da documentação do projeto.
  - **coverage:** diretório só será cria após rodar `yarn test` e conterá relatórios de cobertura dos testes.
  - **src:** diretório com os códigos da aplicação própriamente dita
    - **app.ts** arquivo principal da aplicação
    - **server.ts** inicia o app na porta 3000
    - **db.ts** usado para conectar ao bando de dados
    - **config** diretório com códigos referentes a configurações da aplicação
    - **erros** diretório com códigos para criação de Erros que deverão ser informados ao front-end
    - **rotes** diretório com códigos responsáveis por mapear cada rota da aplicação para o controlador adequado
    - **controllers** diretório com códigos que extraem informações recebidas da rota e disparam a execução do serviço adequado
    - **middleware** diretório com códigos que executam algum pré processamento nas informações recebidas pelas rotas antes que estas sejam transmitidas para o controlador adequado
    - **validators** diretório com códigos que validam as informações recebidas pelas rotas antes que estas sejam transmitidas para o controlador adequado
    - **services** diretório com códigos que executam os serviços propriamente ditos da aplicação, tais como criar ferramenta, iniciar sessão, etc
    - **repositories** diretório com códigos responsáveis pela persistência dos dados, podem ser entendidos como uma abstração aos códigos de consulta e edição a registros de tabelas de banco de dados
    - **models** diretório com códigos que representam os modelos de dados a serem persistidos, pode ser entendido como uma abstração da definição de campos de uma tabela
    - **utils** diretório com códigos de funções simples que podem ser utilizadas por diversos serviços da aplicação
