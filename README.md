[![Test](https://github.com/kimulaco/trocon-frontend/actions/workflows/test.yml/badge.svg)](https://github.com/kimulaco/trocon-frontend/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/kimulaco/trocon-frontend/branch/main/graph/badge.svg?token=1SNOO0VV2U)](https://codecov.io/gh/kimulaco/trocon-frontend)

# trocon-frontend

Trocon's frontend repository.

Backend repository is [kimulaco/trocon-server](https://github.com/kimulaco/trocon-server).

## What is Trocon

[Trocon](https://trocon.kimulaco.com) is the web application for viewing the unlock status of Steam games achievements.

You can see also hidden achievements, so this application helps the achievement collector!

## Development

```bash
# Install dependencies
pnpm i

# Development mode
pnpm run dev
pnpm run dev:mock # with mock service worker

# Build for production
pnpm run build

# Launch server for production
pnpm run start
```
