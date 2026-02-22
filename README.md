# Nexa AI Ops Center

**Intelligent Real Estate Operations Platform**

A comprehensive, AI-powered operations and deal intelligence system for real estate developers, custom home builders, and investment firms.

## Project Structure

```
nexa-ai-ops-center/
├── apps/
│   ├── web/          # Next.js frontend (port 3000)
│   └── api/          # Express backend  (port 3001)
├── packages/
│   └── db/           # Shared Prisma database layer
├── storage_root/     # Document storage hierarchy (01–09)
└── turbo.json        # Monorepo orchestration
```

## Quick Start

```bash
npm install            # root install
cd packages/db && npm run generate   # Prisma client
npm run dev            # starts web + api
```

## Tech Stack

| Layer       | Technology              |
|-------------|------------------------|
| Frontend    | Next.js 16, React 19, Tailwind CSS 4 |
| Backend     | Express 5, TypeScript  |
| Database    | PostgreSQL, Prisma ORM |
| AI          | OpenAI GPT-4, Azure Document Intelligence |
| Monorepo    | Turborepo              |

## Core Modules

1. Property Management   5. AI Agents
2. Project Hub           6. Cost Database
3. Deal Underwriting     7. Analytics
4. Document Intelligence 8. Investor Portal

## License

Proprietary — Nexa Real Estate
