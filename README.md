# Turborepo Starter

This is a Turborepo monorepo setup.

## Installation

```sh
yarn install
```

## Running the Project

### Backend
```sh
cd apps/backend-repo/functions/src/
yarn serve
```

### Frontend
```sh
yarn dev
```

## Project Structure

- `apps/backend-repo`: Backend (Firebase Functions)
- `apps/web`: Frontend (Next.js)
- `@repo/ui`: Shared React components
- `@repo/eslint-config`: Shared ESLint config
- `@repo/typescript-config`: Shared TypeScript config

## Features

- TypeScript
- ESLint & Prettier
- Turbo Caching & Remote Caching

## Useful Commands

### Build
```sh
yarn build
```

### Develop
```sh
yarn dev
```

### Enable Remote Caching
```sh
npx turbo login
npx turbo link
```

For more details, visit [Turborepo Docs](https://turbo.build/repo/docs).
