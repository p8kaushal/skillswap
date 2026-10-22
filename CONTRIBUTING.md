# Contributing to SkillSwap

Thank you for your interest in contributing to SkillSwap! We welcome contributions, bug reports, and suggestions from everyone.

---

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

---

## How to Contribute

### 1. Report Issues
If you encounter a bug or have a feature idea, please check existing issues before submitting a new one using our issue templates.

### 2. Fork & Clone
1. Fork the repository to your own GitHub account.
2. Clone your fork locally:
   ```bash
   git clone https://github.com/<your-username>/skillswap.git
   cd skillswap
   ```
3. Set upstream remote:
   ```bash
   git remote add upstream https://github.com/p8kaushal/skillswap.git
   ```

### 3. Branching Strategy
Create a descriptive branch for your work:
```bash
# For new features
git checkout -b feat/add-user-review-system

# For bug fixes
git checkout -b fix/search-filter-empty-state

# For documentation
git checkout -b docs/update-api-guide
```

### 4. Local Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure `.env` from `.env.example`:
   ```bash
   cp .env.example .env
   ```
3. Generate Prisma client & run migrations:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```

### 5. Verification Before Submitting
Always make sure your project builds without errors:
```bash
npm run build
```

Ensure no secret credentials or `.env` files are tracked:
```bash
git status
```

### 6. Commit Message Guidelines
We follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation only changes
- `refactor:` Code change that neither fixes a bug nor adds a feature
- `style:` Changes that do not affect code logic (formatting, white-space)
- `chore:` Tooling, dependency, or config updates

### 7. Submitting a Pull Request
1. Push your branch to your fork:
   ```bash
   git push origin feat/your-feature-name
   ```
2. Open a Pull Request against the `main` branch of `p8kaushal/skillswap`.
3. Complete the pull request checklist in the provided template.
