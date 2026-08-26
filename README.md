# Local Task Marketplace

A production-grade, local service and task marketplace platform connecting customers with trusted local workers across multiple service verticals (electricians, carpenters, cleaners, helpers, construction, tutoring, custom tasks, etc.).

---

## 1. Tech Stack

- **Mobile Client**: React Native, Expo SDK 52, TypeScript (Android focused)
- **Backend API**: NestJS, Node.js 22 LTS, TypeScript
- **Database**: PostgreSQL 16 with **PostGIS 3.4** extension (location-based worker discovery)
- **Cache & Queue Foundation**: Redis 7
- **Monorepo / Package Management**: npm Workspaces
- **Code Quality**: TypeScript (Strict Mode), Prettier

---

## 2. Project Structure

```
local-task-marketplace/
├── apps/
│   ├── mobile/                  # React Native + Expo mobile application
│   │   ├── src/
│   │   │   └── screens/
│   │   │       └── HomeScreen.tsx
│   │   ├── App.tsx
│   │   ├── app.json             # Android package & permissions
│   │   ├── index.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   ├── api/                     # NestJS backend API
│   │   ├── src/
│   │   │   ├── health/
│   │   │   │   ├── health.controller.ts
│   │   │   │   └── health.module.ts
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   ├── nest-cli.json
│   │   ├── tsconfig.json
│   │   ├── tsconfig.build.json
│   │   └── package.json
│   └── admin/                   # Next.js admin dashboard (reserved)
│       └── README.md
├── packages/
│   ├── types/                   # Shared TypeScript definitions (@marketplace/types)
│   │   ├── src/index.ts
│   │   └── package.json
│   ├── validation/              # Shared validation schemas (reserved)
│   └── config/                  # Shared configuration (reserved)
├── infrastructure/
│   └── docker/
│       └── postgres/
│           └── init.sql         # PostGIS extensions initialization
├── .env.example                 # Environment variables template
├── .gitignore                   # Ignore rules (Node, Expo, Android, secrets)
├── .nvmrc                       # Node v22.18.0 pin
├── .prettierrc                  # Formatting standards
├── docker-compose.yml           # PostgreSQL (PostGIS) & Redis containers
├── tsconfig.base.json           # Root TypeScript strict configuration
├── tsconfig.json                # Project references configuration
├── package.json                 # Monorepo root workspace configuration
└── README.md
```

---

## 3. Prerequisites

- **Node.js**: `v22.18.0` (or `v20+` LTS)
- **npm**: `10.9.0+`
- **Docker Desktop** (for containerized PostgreSQL/PostGIS and Redis)
- **For Android Native Builds & Emulation**:
  - JDK 17 (e.g. `brew install openjdk@17`)
  - Android Studio + Android SDK / Platform-Tools (`adb`)
  - Environment variables `ANDROID_HOME` configured in `~/.zshrc`

---

## 4. Installation

Clone the repository and install all workspace dependencies from the root directory:

```bash
# 1. Use matching Node version
nvm use || nvm install 22.18.0

# 2. Copy environment variables
cp .env.example .env

# 3. Install all monorepo dependencies
npm install

# 4. Build shared packages
npm run build:types
```

---

## 5. Starting Database & Cache (PostgreSQL + PostGIS & Redis)

Start the containerized PostgreSQL (PostGIS) and Redis services via Docker Compose:

```bash
# Start containers in background
docker compose up -d

# Check status
docker compose ps

# View database logs
docker compose logs -f postgres

# Stop containers
docker compose down
```

---

## 6. Starting the NestJS API

Run the API in watch mode:

```bash
# Start backend API (defaults to http://localhost:3000)
npm run dev:api
```

Verify the health check endpoint:

```bash
curl http://localhost:3000/health
# Response: {"status":"ok"}
```

---

## 7. Starting the Expo Mobile App

Run the Expo development bundler:

```bash
# Start Metro bundler
npm run dev:mobile
```

Scan the QR code with the **Expo Go** app on your physical Android device, or press `a` in the terminal to launch on a running Android emulator.

---

## 8. Running on Android

### Option A: Via Expo Go (Fastest for initial UI dev)

1. Install **Expo Go** from Google Play Store on your Android device.
2. Ensure phone and computer are on the same Wi-Fi network.
3. Run `npm run dev:mobile` and scan the terminal QR code.

### Option B: Android Emulator / Native Build

1. Open Android Studio and launch a Virtual Device (AVD).
2. Verify ADB connection:
   ```bash
   adb devices
   ```
3. Launch on Android:
   ```bash
   npm run android
   ```

---

## 9. Environment Variables

The project includes `.env.example`. Create a local `.env` file before running the backend:

| Variable              | Description                      | Default / Example                                                             |
| --------------------- | -------------------------------- | ----------------------------------------------------------------------------- |
| `PORT`                | API server listening port        | `3000`                                                                        |
| `API_URL`             | Backend URL                      | `http://localhost:3000`                                                       |
| `POSTGRES_USER`       | Database username                | `postgres`                                                                    |
| `POSTGRES_PASSWORD`   | Database password                | `postgres`                                                                    |
| `POSTGRES_DB`         | Database name                    | `marketplace_dev`                                                             |
| `POSTGRES_PORT`       | PostgreSQL exposed port          | `5432`                                                                        |
| `DATABASE_URL`        | Full database connection string  | `postgresql://postgres:postgres@localhost:5432/marketplace_dev?schema=public` |
| `REDIS_PORT`          | Redis exposed port               | `6379`                                                                        |
| `REDIS_URL`           | Redis connection URL             | `redis://localhost:6379`                                                      |
| `EXPO_PUBLIC_API_URL` | API URL accessible by mobile app | `http://localhost:3000`                                                       |

---

## 10. Monorepo Scripts Reference

| Command                | Action                                                    |
| ---------------------- | --------------------------------------------------------- |
| `npm run dev:api`      | Start NestJS API with live reload                         |
| `npm run dev:mobile`   | Start Expo Metro bundler                                  |
| `npm run android`      | Launch Expo app directly targeting Android                |
| `npm run build:types`  | Compile `@marketplace/types` package                      |
| `npm run build:api`    | Build NestJS API for production                           |
| `npm run typecheck`    | Run strict TypeScript checks across all packages and apps |
| `npm run format`       | Run Prettier formatter across the entire repository       |
| `npm run format:check` | Verify formatting consistency                             |
| `npm run clean`        | Remove `dist` and `node_modules` across workspaces        |
