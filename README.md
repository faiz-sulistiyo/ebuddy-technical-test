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
- `apps/frontend-repo`: Frontend (Next.js)
- `@packages`: Shared 

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
