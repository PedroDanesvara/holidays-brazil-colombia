# 🚀 Passo 2: Setup Inicial do Projeto

## Objetivo
Criar a estrutura base do projeto React + TypeScript + Vite com todas as ferramentas de desenvolvimento necessárias.

## Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn/pnpm
- Git
- Editor de código (VS Code recomendado)

## Etapas de Implementação

### 1. Criar Novo Projeto com Vite

```bash
# Criar projeto com template React + TypeScript
npm create vite@latest holidays-app -- --template react-ts

# Entrar no diretório
cd holidays-app

# Instalar dependências
npm install
```

### 2. Instalar Dependências Core

```bash
# React Router
npm install react-router-dom

# Zustand (State Management)
npm install zustand

# Date utilities
npm install date-fns

# Class utilities
npm install clsx
```

### 3. Instalar Tailwind CSS

```bash
# Tailwind e dependências
npm install -D tailwindcss postcss autoprefixer

# Inicializar configuração
npx tailwindcss init -p
```

**Configurar `tailwind.config.ts`:**
```typescript
import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brazil: {
          DEFAULT: '#47A1C3',
          light: '#E8F2FF',
          dark: '#3A87A4',
        },
        colombia: {
          DEFAULT: '#FF6B6B',
          light: '#FFE5E5',
          dark: '#FF5252',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
```

**Configurar `src/styles/globals.css`:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-gradient-to-br from-brazil-dark to-brazil font-sans antialiased;
  }
}
```

### 4. Instalar Framer Motion

```bash
npm install framer-motion
```

### 5. Configurar ESLint e Prettier

```bash
# ESLint plugins
npm install -D eslint-config-prettier eslint-plugin-react-hooks

# Prettier
npm install -D prettier
```

**Criar `.eslintrc.cjs`:**
```javascript
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-unused-vars': ['error', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }],
  },
}
```

**Criar `.prettierrc`:**
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "arrowParens": "avoid"
}
```

### 6. Configurar Husky e lint-staged

```bash
# Husky para git hooks
npm install -D husky lint-staged

# Inicializar husky
npx husky install

# Adicionar pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"
```

**Adicionar no `package.json`:**
```json
{
  "scripts": {
    "prepare": "husky install"
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}
```

### 7. Configurar TypeScript Strict Mode

**Atualizar `tsconfig.json`:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    
    /* Path aliases */
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/features/*": ["src/features/*"],
      "@/hooks/*": ["src/hooks/*"],
      "@/utils/*": ["src/utils/*"],
      "@/types/*": ["src/types/*"],
      "@/store/*": ["src/store/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

**Configurar aliases no `vite.config.ts`:**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/features': path.resolve(__dirname, './src/features'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/store': path.resolve(__dirname, './src/store'),
    },
  },
})
```

### 8. Instalar Vitest para Testes

```bash
# Vitest e Testing Library
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

**Adicionar no `vite.config.ts`:**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
})
```

**Criar `src/test/setup.ts`:**
```typescript
import '@testing-library/jest-dom'
```

### 9. Criar Estrutura de Pastas

```bash
mkdir -p src/{components/{ui,layout,common},features/{holidays,filters}/{components,hooks,services,types,utils},pages/{Home,NotFound},store/slices,hooks,utils,styles,types,config,data,assets/{images,icons}}

mkdir -p tests/{e2e,fixtures}
```

### 10. Configurar Scripts no package.json

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,json,css,md}\"",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "type-check": "tsc --noEmit"
  }
}
```

### 11. Configurar Variáveis de Ambiente

**Criar `.env.example`:**
```env
# App Config
VITE_APP_TITLE=Holidays Calendar
VITE_APP_VERSION=1.0.0

# API Config (para futuro)
# VITE_API_URL=https://api.example.com
```

**Criar `.env`:**
```env
# Copiar conteúdo de .env.example
```

**Criar `src/types/env.d.ts`:**
```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_VERSION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

### 12. Configurar .gitignore

```gitignore
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Environment variables
.env
.env.local
.env.production

# Test coverage
coverage
```

### 13. Configurar VS Code

**Criar `.vscode/settings.json`:**
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

**Criar `.vscode/extensions.json`:**
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "csstools.postcss"
  ]
}
```

## Verificação

Execute os seguintes comandos para garantir que tudo está configurado corretamente:

```bash
# Verificar TypeScript
npm run type-check

# Verificar Linting
npm run lint

# Executar testes
npm run test

# Iniciar dev server
npm run dev
```

## Estrutura Final

```
holidays-app/
├── .husky/
├── .vscode/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── features/
│   ├── hooks/
│   ├── pages/
│   ├── store/
│   ├── styles/
│   ├── test/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── tests/
├── .env
├── .env.example
├── .eslintrc.cjs
├── .gitignore
├── .prettierrc
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Próximos Passos

Com o setup inicial completo, estamos prontos para:
1. ✅ Estrutura de projeto criada
2. ✅ Ferramentas de desenvolvimento configuradas
3. ✅ TypeScript strict mode ativado
4. ✅ Linting e formatting configurados
5. ✅ Testes preparados

---

**Próximo Passo**: [03-sistema-de-tipos.md](./03-sistema-de-tipos.md)

