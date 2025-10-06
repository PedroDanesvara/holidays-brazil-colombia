# 🏗️ Arquitetura Proposta

## Stack Tecnológico

### Core
- **React 18.3+**: Framework UI com hooks e concurrent features
- **TypeScript 5+**: Type safety e melhor DX
- **Vite 5+**: Build tool rápido e dev server otimizado

### Gerenciamento de Estado
- **Zustand**: State management leve e simples
- **React Query (TanStack Query)**: Cache e sincronização de dados

### Roteamento
- **React Router v6**: Navegação e deep linking

### Estilização
- **Tailwind CSS**: Utility-first CSS framework
- **Headless UI**: Componentes acessíveis sem estilo
- **Framer Motion**: Animações fluidas

### Qualidade de Código
- **ESLint**: Linting
- **Prettier**: Code formatting
- **Husky**: Git hooks
- **lint-staged**: Pre-commit checks

### Testes
- **Vitest**: Unit tests (rápido, compatível com Vite)
- **Testing Library**: Component testing
- **Playwright**: E2E testing

### Ferramentas de Desenvolvimento
- **TypeScript Strict Mode**: Máxima type safety
- **Storybook**: Documentação de componentes
- **MSW (Mock Service Worker)**: Mocking de APIs

## Estrutura de Diretórios

```
holidays-app/
├── public/                      # Assets estáticos
│   ├── favicon.ico
│   └── manifest.json
│
├── src/
│   ├── assets/                  # Imagens, fontes, etc
│   │   ├── images/
│   │   └── icons/
│   │
│   ├── components/              # Componentes reutilizáveis
│   │   ├── ui/                  # Componentes base (Button, Input, etc)
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.test.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Select/
│   │   │   ├── Checkbox/
│   │   │   ├── Card/
│   │   │   └── Modal/
│   │   │
│   │   ├── layout/              # Componentes de layout
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   └── Container/
│   │   │
│   │   └── common/              # Componentes comuns
│   │       ├── LoadingSpinner/
│   │       ├── ErrorBoundary/
│   │       └── EmptyState/
│   │
│   ├── features/                # Features organizadas por domínio
│   │   ├── holidays/
│   │   │   ├── components/      # Componentes específicos
│   │   │   │   ├── HolidayCard/
│   │   │   │   ├── HolidayList/
│   │   │   │   └── HolidayCalendar/
│   │   │   ├── hooks/           # Custom hooks
│   │   │   │   ├── useHolidays.ts
│   │   │   │   └── useHolidayFilters.ts
│   │   │   ├── services/        # Lógica de negócio
│   │   │   │   └── holidayService.ts
│   │   │   ├── types/           # TypeScript types
│   │   │   │   └── holiday.types.ts
│   │   │   └── utils/           # Utilitários específicos
│   │   │       ├── dateUtils.ts
│   │   │       └── weekUtils.ts
│   │   │
│   │   └── filters/
│   │       ├── components/
│   │       │   ├── CountryFilter/
│   │       │   ├── DateFilter/
│   │       │   └── FilterBar/
│   │       ├── hooks/
│   │       │   └── useFilters.ts
│   │       └── types/
│   │           └── filter.types.ts
│   │
│   ├── pages/                   # Páginas/Rotas
│   │   ├── Home/
│   │   │   ├── Home.tsx
│   │   │   └── Home.test.tsx
│   │   ├── NotFound/
│   │   └── About/
│   │
│   ├── store/                   # Estado global (Zustand)
│   │   ├── slices/
│   │   │   ├── filterSlice.ts
│   │   │   └── viewSlice.ts
│   │   └── index.ts
│   │
│   ├── hooks/                   # Hooks globais reutilizáveis
│   │   ├── useLocalStorage.ts
│   │   ├── useMediaQuery.ts
│   │   └── useTheme.ts
│   │
│   ├── utils/                   # Utilitários globais
│   │   ├── constants.ts
│   │   ├── formatters.ts
│   │   └── validators.ts
│   │
│   ├── styles/                  # Estilos globais
│   │   ├── globals.css
│   │   └── tailwind.config.ts
│   │
│   ├── types/                   # Types globais
│   │   ├── global.d.ts
│   │   └── env.d.ts
│   │
│   ├── config/                  # Configurações
│   │   ├── constants.ts
│   │   └── routes.ts
│   │
│   ├── data/                    # Dados estáticos
│   │   └── holidays.json
│   │
│   ├── App.tsx                  # Componente raiz
│   ├── main.tsx                 # Entry point
│   └── vite-env.d.ts
│
├── tests/                       # Testes E2E
│   ├── e2e/
│   │   ├── holidays.spec.ts
│   │   └── filters.spec.ts
│   └── setup.ts
│
├── .github/                     # CI/CD
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
│
├── docs/                        # Documentação
│   └── [arquivos .md]
│
├── .env.example                 # Variáveis de ambiente
├── .eslintrc.cjs               # Configuração ESLint
├── .prettierrc                 # Configuração Prettier
├── .gitignore
├── package.json
├── tsconfig.json               # Configuração TypeScript
├── tsconfig.node.json
├── vite.config.ts              # Configuração Vite
├── tailwind.config.ts          # Configuração Tailwind
├── postcss.config.js
└── README.md
```

## Padrões de Arquitetura

### 1. Feature-Based Structure
Organização por domínio/feature ao invés de tipo de arquivo, facilitando:
- Localização de código relacionado
- Remoção/adição de features
- Trabalho em equipe

### 2. Separation of Concerns
- **Components**: Apenas apresentação e interação
- **Hooks**: Lógica reutilizável e state management
- **Services**: Lógica de negócio e comunicação com APIs
- **Utils**: Funções puras auxiliares

### 3. Composition over Configuration
- Componentes pequenos e compostos
- Props drilling minimizado com Context/Store quando necessário
- Higher-Order Components (HOCs) apenas quando realmente necessário

### 4. Type Safety First
- TypeScript strict mode habilitado
- Tipos explícitos para props, state, e retornos
- Evitar `any` e `unknown` sem validação

### 5. Performance Optimization
- Code splitting por rota
- Lazy loading de componentes pesados
- Memoization com `useMemo` e `useCallback` onde apropriado
- Virtual scrolling para listas longas

## Fluxo de Dados

```
┌─────────────────────────────────────────────────────────┐
│                    User Interaction                      │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   React Component                        │
│  (dispatches actions / calls hooks)                     │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Custom Hook / Store                         │
│  (business logic / state management)                    │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                    Service Layer                         │
│  (data fetching / transformations)                      │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   Data Source                            │
│  (API / Local Storage / Static Data)                    │
└─────────────────────────────────────────────────────────┘
```

## Decisões Técnicas

### Por que React?
✅ Ecossistema maduro e rico  
✅ Grande comunidade e suporte  
✅ Excelente performance com Virtual DOM  
✅ Hooks para lógica reutilizável  
✅ Fácil de testar  

### Por que TypeScript?
✅ Previne bugs em tempo de desenvolvimento  
✅ IntelliSense e autocompletar melhorados  
✅ Refatoração mais segura  
✅ Documentação auto-gerada através dos tipos  

### Por que Vite?
✅ Extremamente rápido (HMR instantâneo)  
✅ Build otimizado com Rollup  
✅ Suporte nativo a TypeScript  
✅ Configuração mínima  

### Por que Tailwind CSS?
✅ Desenvolvimento rápido  
✅ Consistência no design  
✅ Bundle size otimizado (apenas classes usadas)  
✅ Customização fácil  
✅ Responsividade simples  

### Por que Zustand?
✅ API simples e intuitiva  
✅ Sem boilerplate  
✅ Performance excelente  
✅ DevTools integrado  
✅ TypeScript first-class support  

## Princípios de Design

### 1. Mobile First
- Design responsivo começando pelo mobile
- Progressive enhancement para desktop

### 2. Acessibilidade (WCAG 2.1 AA)
- Navegação por teclado
- Screen reader support
- Contraste adequado
- ARIA labels e roles

### 3. Performance
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s
- Lighthouse score > 90

### 4. User Experience
- Feedback imediato para ações
- Loading states claros
- Error handling amigável
- Animações suaves mas não distrativas

### 5. Maintainability
- Código auto-documentado
- Testes para features críticas
- Conventional commits
- Documentação atualizada

---

**Próximo Passo**: [02-setup-inicial.md](./02-setup-inicial.md)

