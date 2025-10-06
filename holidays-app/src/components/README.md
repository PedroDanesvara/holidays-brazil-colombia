# 🎨 Design System - Componentes UI

Sistema de componentes reutilizáveis construído com React, TypeScript, Tailwind CSS e Framer Motion.

## 📦 Componentes Disponíveis

### UI Components (`src/components/ui/`)

#### Button
Botão customizável com múltiplas variantes e estados.

```tsx
import { Button } from '@/components/ui'

// Variantes
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Danger</Button>
<Button variant="ghost">Ghost</Button>

// Tamanhos
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Com ícones
<Button leftIcon={<Icon />}>With Icon</Button>
<Button rightIcon={<Icon />}>With Icon</Button>

// Loading
<Button isLoading>Loading...</Button>
```

**Features:**
- ✅ 4 variantes (primary, secondary, danger, ghost)
- ✅ 3 tamanhos (sm, md, lg)
- ✅ Loading state com spinner
- ✅ Ícones (left/right)
- ✅ Animações suaves (hover, tap)
- ✅ Completamente acessível

#### Select
Select dropdown tipado e customizável.

```tsx
import { Select } from '@/components/ui'

<Select
  label="Escolha uma opção"
  value={value}
  onChange={setValue}
  options={[
    { label: 'Opção 1', value: '1' },
    { label: 'Opção 2', value: '2' },
  ]}
  placeholder="Selecione..."
  error="Erro de validação"
/>
```

**Features:**
- ✅ Completamente tipado com generics
- ✅ Error handling visual
- ✅ Label e placeholder
- ✅ Focus states

#### Checkbox
Checkbox animado e acessível.

```tsx
import { Checkbox } from '@/components/ui'

<Checkbox
  checked={isChecked}
  onChange={setIsChecked}
  label="Aceitar termos"
  disabled={false}
  error="Campo obrigatório"
/>
```

**Features:**
- ✅ Animação no check (Framer Motion)
- ✅ Keyboard navigation
- ✅ Error handling
- ✅ Disabled state

#### Card
Container versátil para conteúdo.

```tsx
import { Card } from '@/components/ui'

<Card
  title="Título"
  subtitle="Subtítulo"
  footer={<Button>Ação</Button>}
  hoverable
  onClick={handleClick}
>
  Conteúdo do card
</Card>
```

**Features:**
- ✅ Header com título/subtítulo
- ✅ Footer customizável
- ✅ Hover effect opcional
- ✅ Clickable opcional

#### Modal
Modal acessível com Headless UI.

```tsx
import { Modal } from '@/components/ui'

<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Título do Modal"
  size="md"
  closeOnOverlayClick
>
  Conteúdo do modal
</Modal>
```

**Features:**
- ✅ Headless UI (totalmente acessível)
- ✅ Animações de entrada/saída
- ✅ Overlay escuro
- ✅ Botão de fechar
- ✅ 3 tamanhos (sm, md, lg)
- ✅ Focus trap

### Common Components (`src/components/common/`)

#### LoadingSpinner
Spinner de carregamento animado.

```tsx
import { LoadingSpinner } from '@/components/common'

<LoadingSpinner size="sm" />
<LoadingSpinner size="md" />
<LoadingSpinner size="lg" />
```

#### EmptyState
Estado vazio com ícone e ação.

```tsx
import { EmptyState } from '@/components/common'

<EmptyState
  icon={<Icon />}
  title="Nenhum resultado encontrado"
  description="Tente ajustar seus filtros"
  action={<Button>Limpar Filtros</Button>}
/>
```

#### ErrorBoundary
Captura erros globais da aplicação.

```tsx
import { ErrorBoundary } from '@/components/common'

<ErrorBoundary>
  <App />
</ErrorBoundary>
```

**Features:**
- ✅ Captura erros de toda a árvore React
- ✅ UI amigável para o usuário
- ✅ Detalhes do erro (collapsible)
- ✅ Botão de reload

## 🎨 Design Tokens

### Cores

```tsx
// Brasil
bg-[#47A1C3]      // Primary
bg-[#E8F2FF]      // Light
bg-[#3A87A4]      // Dark

// Colômbia  
bg-[#FF6B6B]      // Primary
bg-[#FFE5E5]      // Light
bg-[#FF5252]      // Dark
```

### Tamanhos

```tsx
// Button/Modal/Components
sm: 'px-3 py-1.5 text-sm'
md: 'px-4 py-2 text-base'
lg: 'px-6 py-3 text-lg'
```

## ♿ Acessibilidade

Todos os componentes foram construídos seguindo as melhores práticas de acessibilidade:

- ✅ **Navegação por teclado**: Todos os componentes interativos podem ser navegados com Tab/Shift+Tab
- ✅ **ARIA labels**: Labels apropriados para screen readers
- ✅ **Focus visible**: Estados de foco claros e visíveis
- ✅ **Contraste**: Cores com contraste adequado (WCAG AA)
- ✅ **Error handling**: Erros anunciados com `role="alert"`

## 🧪 Testes

Todos os componentes têm testes implementados:
- Unit tests com Vitest
- Component tests com Testing Library
- Cobertura de casos edge

## 📝 Convenções

### Nomenclatura
- Componentes: PascalCase (`Button`, `Card`)
- Arquivos: PascalCase (`Button.tsx`)
- Props: camelCase (`isLoading`, `onClick`)

### Estrutura de Pastas
```
Component/
├── Component.tsx     # Implementação
├── Component.test.tsx # Testes (futuro)
└── index.ts          # Barrel export
```

### Imports
```tsx
// ✅ Bom - Usar barrel exports
import { Button, Card } from '@/components/ui'

// ❌ Evitar - Import direto
import { Button } from '@/components/ui/Button/Button'
```

## 🚀 Próximos Passos

Com os componentes UI base criados, podemos agora:
1. Implementar o state management (Zustand)
2. Criar features específicas (Holidays, Filters, Calendar)
3. Montar as páginas usando esses componentes

---

**Status**: ✅ Completo e validado  
**Build**: ✅ Passa sem erros  
**TypeScript**: ✅ Type-safe 100%

