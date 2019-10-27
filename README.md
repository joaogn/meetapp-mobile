![Licence](badges/licence-badge.svg)

# MeetApp Mobile

- [Overview](#overview)
- [Tecnologias](#tecnologias)
- [Utilização](#utilização)
- [Desafio](#desafio)
- [License](#license)

## Overview

Aplicativo Mobile do MeetApp um app agregador de eventos, desafio do bootcamp goStack da RocketSeat.

#### OBS

Testado apenas no Android.

## Tecnologias

- React Native
- Redux
- Redux Saga
- Typescript
- Styled Components
- Date-fns
- Reactotron
- ESLint
- Prettier
- EditorConfig

## Utilização

- Pré-requitos

  - MeetApp Api

- Definir a url da Api em src/services/api.ts

- Instalar as dependências: `yarn install`

- Iniciando o Metro Bundler: `yarn start`

- Rodando o App Android no Emulador: `yarn react-native run-android`

- !IMPORTANTE, Se error > Task :app:validateSigningDebug FAILED executar passos abaixo.

  - `cd android/app`
  - `keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000`
  - `cd ../../`
  - `yarn react-native run-android`
  - Esses passos cria uma chave de validação de debug

- Se a Api estiver no localhost executar proxy reverso: `adb reverse tcp:3333 tcp:3333`

## Desafio

Nesse desafio você irá construir o app mobile com React Native do Meetapp que utilizará a API que você desenvolveu durante os desafios do segundo e terceiro módulo de Node.js.

Crie uma aplicação do zero utilizando React Native CLI e configure as ferramentas de padrões de código, Reactotron, Redux e Redux Saga.

Essa aplicação será utilizada por inscritos de meetups e não contará com funcionalidades de organização de meetups.

Essa aplicação faz parte do desafio final do bootcamp utilizado para finalização e certificação.

O layout do projeto está anexado nesse repositório.

### Telas

#### Autenticação

O usuário deve poder se autenticar utilizando e-mail e senha.

#### Cadastro

O usuário deve poder se cadastrar com nome, e-mail e senha.

#### Dashboard

O usuário deve poder navegar pelos meetups por data.

Utilize scroll infinito nessa página.

Nessa tela o usuário deve poder se inscrever em um Meetup.

#### Inscrições

O usuário deve poder visualizar suas inscrições em meetups.

Nessa tela o usuário pode cancelar uma inscrição.

#### Perfil

O usuário deve poder editar suas informações de cadastro.

Utilize validação nos campos.

## License

MIT © [João Graça Neto](https://github.com/joaogn)
