# parking-frontend

Aplicação para gerenciamento de estacionamento, gerenciando a entrada e saída de veículos e informando o valor a ser pago ao final com base em uma tabela de preços.

Este repositório compreende apenas o front-end do projeto, feito com em Vue 3 + Bootstrap. Para acessar o back-end, por favor, acesse o link [https://github.com/cunhanai/ParkingBackend](https://github.com/cunhanai/ParkingBackend).

## Tecnologias utilizadas

- **Linguagens:** HTML + CSS + JavaScript
- **Framework:** VueJS 3 + Bootstrap
- **IDE:** Visual Studio Code

## Setup

### Alterando endpoint de acesso ao back-end

Atualmente o endpoint do backend está apontando para a porta <code>http://localhost:5124</code>, se a sua porta for diferente, por favor, altere a propriedade <code>URL_BASE</code> no arquivo <code>src\service\api.js</code> para a porta que seu backend está utilizando.

### Instalando os pacotes

```sh
npm install
```

### Iniciando a aplicação

```sh
npm run dev
```

