# SkillSwap 🔄

A modern peer-to-peer skill exchange platform connecting individuals to swap skills, knowledge, and services without monetary transactions. Exchange what you know for what you need—from programming and design to languages and marketing.

---

## 🚀 Overview

**SkillSwap** is a fullstack web platform built on **Nuxt 4**, **Vue 3**, and **Prisma ORM**. It enables community members to:
- **Showcase Talents & Needs**: Create detailed user profiles listing skills you possess (`has`) and skills you want to learn (`want`), categorized with proficiency levels (Beginner, Intermediate, Expert).
- **Intelligent Peer Matching**: Match users who have complementary skill sets (what Person A teaches and wants matches what Person B can offer).
- **Session Scheduling**: Coordinate and manage learning/swap sessions directly within the platform with meeting links, durations, and agenda notes.
- **Secure Authentication**: Built-in credential-based authentication powered by `@sidebase/nuxt-auth`, JWT tokens, and bcrypt hashing with role-based access control (Admin & User).

---

## 🛠️ Tech Stack

### Frontend & Framework
- **[Nuxt 4](https://nuxt.com/)** (`^4.1.2`) - The Intuitive Vue Framework (SSR/SSG/SPA hybrid).
- **[Vue 3](https://vuejs.org/)** (`^3.5.22`) - Composition API and `<script setup>` syntax.
- **[Nuxt UI](https://ui.nuxt.com/)** (`^4.3.0`) - Tailwind-powered UI component library.
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling framework.
- **[Lucide Icons](https://lucide.dev/)** - Clean, modern SVG icon set.

### Backend & API
- **[Nitro](https://nitro.unjs.io/)** - High-performance server engine powering Nuxt API routes.
- **[Prisma ORM](https://www.prisma.io/)** (`^7.0.0`) - Type-safe database client and schema migrations.
- **[PostgreSQL](https://www.postgresql.org/)** (`pg` `^8.16.3` / `@prisma/adapter-pg`) - Relational database layer.

### Authentication & Security
- **[@sidebase/nuxt-auth](https://auth.sidebase.io/)** (`^1.1.1`) - Authentication module for Nuxt applications.
- **[JSON Web Tokens (JWT)](https://jwt.io/)** (`jsonwebtoken` `^9.0.3`) - Stateless token-based session management.
- **[bcrypt](https://www.npmjs.com/package/bcrypt)** (`^6.0.0`) - Salted password hashing.
- **[Zod](https://zod.dev/)** (`^4.2.1`) - TypeScript-first schema declaration and validation.

### Tooling & Quality
- **[TypeScript](https://www.typescriptlang.org/)** - Static type checking.
- **[ESLint](https://eslint.org/)** (`@nuxt/eslint` `^1.9.0`, ESLint 9) - Linting and formatting rules.

---

## 📂 Project Structure

```text
skillswap/
├── app/
│   ├── assets/           # CSS stylesheets and static assets
│   ├── components/       # Reusable Vue components (Header, Footer, Skill, Person, Trait)
│   ├── layouts/          # Nuxt layouts
│   ├── middleware/       # Route guards (auth, admin)
│   ├── pages/            # File-based routing (index, login, signup, dashboard, search, etc.)
│   └── utils/            # Client-side utility functions (api.ts)
├── prisma/
│   ├── schema.prisma     # Prisma database models (Person, Skill, Trait, Match, Session)
│   ├── seed.ts           # Initial sample data seeder
│   └── migrations/       # Version-controlled database migration history
├── server/
│   ├── api/
│   │   └── auth/         # Nuxt Auth authentication endpoints (login, signup, session)
│   └── routes/           # REST API endpoints (feed, match, person, skill, trait)
├── nuxt.config.ts        # Nuxt configuration and module settings
├── package.json          # Dependencies, scripts, and package metadata
├── .env.example          # Template for required environment variables
├── .gitignore            # Git ignore specification
└── LICENSE               # MIT License
```

---

## ⚡ Getting Started

### Prerequisites

Ensure you have installed:
- **Node.js**: `v18.20.0+` or `v20.9.0+` (recommended)
- **npm**, **pnpm**, or **yarn**
- **PostgreSQL**: Local PostgreSQL instance, Docker container, or cloud database (e.g., Prisma Postgres, Supabase, Neon)

### 1. Clone the Repository

```bash
git clone https://github.com/p8kaushal/skillswap.git
cd skillswap
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example `.env` file and customize the variables:

```bash
cp .env.example .env
```

Edit `.env` with your database credentials and authentication secret:

```env
# Database connection string (PostgreSQL)
DATABASE_URL="postgresql://postgres:password@localhost:5432/skillswap?sslmode=disable"

# Application URL
NUXT_PUBLIC_API_URL="http://localhost:3000/api"

# Nuxt Auth Secret (generate a strong random secret)
NUXT_AUTH_SECRET="your-strong-random-secret"
```

### 4. Database Setup & Migrations

Run database migrations to generate the database tables:

```bash
npx prisma migrate dev
```

Generate the Prisma Client types:

```bash
npx prisma generate
```

*(Optional)* Seed the database with sample traits, skills, and users:

```bash
npx prisma db seed
```

*(Optional)* Open Prisma Studio to inspect and edit database records visually:

```bash
npx prisma studio
```

### 5. Launch Development Server

Start the local Nuxt development server:

```bash
npm run dev
```

Open your browser and navigate to **[http://localhost:3000](http://localhost:3000)**.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Nuxt development server with HMR on `http://localhost:3000` |
| `npm run build` | Builds the application for production deployment |
| `npm run preview` | Locally preview the production build output |
| `npm run generate` | Pre-renders all static routes of the application |
| `npx prisma migrate dev` | Applies database migrations in development |
| `npx prisma studio` | Launches the interactive Prisma database GUI |

---

## 🔒 Security & Best Practices

- **Never commit `.env` files**: All secrets, database URLs, and session tokens are strictly ignored via `.gitignore`.
- **Stateless Tokens**: Authentication uses secure JWT tokens sent via Bearer headers.
- **Hashed Passwords**: User passwords are encrypted using `bcrypt` before storage.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) © 2026 Parth Kaushal.
