# CI Runner

Монорепозиторий с фронтенд и бэкенд сервисами.

## Технологии

### Frontend

- Vue 3 (Composition API)
- TypeScript
- VueUse
- Vite
- Vitest

### Backend

- Effect
- TypeScript
- @effect/sql-pg (QueryBuilder)
- PostgreSQL

## Структура проекта

```
.
├── apps/
│   ├── frontend/    # Фронтенд приложение (Vue + Vite)
│   └── backend/     # Бэкенд сервис (Effect + PostgreSQL)
├── package.json
└── pnpm-workspace.yaml
```

## Установка

```bash
pnpm install
```

## Настройка окружения

Создайте файл `.env` в `apps/backend/` на основе `apps/backend/.env.example`:

```bash
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cirunner
DB_USER=postgres
DB_PASSWORD=postgres
```

## Разработка

Запуск всех сервисов:

```bash
pnpm dev
```

Запуск только фронтенда:

```bash
pnpm dev:frontend
```

Запуск только бэкенда:

```bash
pnpm dev:backend
```

## Сборка

Сборка всех сервисов:

```bash
pnpm build
```

## Тестирование

```bash
pnpm test
```

## Линтинг

```bash
pnpm lint
```
