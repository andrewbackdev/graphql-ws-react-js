# GraphQL WebSocket Knex JS Sample Application

This repository (server part) contains a sample application built using the following technologies:

- @apollo/server
- express
- knex
- better-sqlite3
- graphql
- graphql-ws

## Getting started

### Installation

1. Clone this repository (do not clone repository twice):

```sh
git clone https://github.com/andrewbackdev/graphql-ws-react-js
cd graphql-ws-react-js/server
```

2. Install the required npm dependencies:

```sh
npm ci
```

### Usage

1. Start the Server:

```sh
npm run start:dev
```

2. Access the API at the default URL: http://localhost:9000/graphql

3. Feel free to use [default credentials](./scripts/create-db.js#L28-L39)
