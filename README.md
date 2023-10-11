## A simple API built to demo pagination strategies

## Installation

```bash
$ npm install

# or
# pnpm install

```

## Running the app

```bash
# create local (sqlite) db andrun prisma migration
npx prisma init
npx prisma migrate dev --name init

# or
# pnpm dlx prisma init
# pnpm dlx prisma migrate dev --name init

# populate deeb with fake data
npx prisma db seed

# or
# pnpm dlx prisma db seed
```

```bash
# development
$ npm run start

# or
# pnpm run start

# watch mode
$ npm run start:dev

# or
# pnpm run start:dev
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## making a request

```bash
# curl 'http://localhost:3000/api/products'
# curl 'http://localhost:3000/api/products?limit=100&offset=0'
```