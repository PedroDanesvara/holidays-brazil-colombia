# 🛣️ Rotas da Aplicação

Estrutura de rotas usando React Router v7.

## 📦 Estrutura de Rotas

```
/              → Home (Dashboard principal)
/about         → About (Informações sobre o app)
*              → 404 (Página não encontrada)
```

## 🎯 Configuração

As rotas são configuradas usando `createBrowserRouter` do React Router v7:

```typescript
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout><Home /></MainLayout>,
    errorElement: <MainLayout><NotFound /></MainLayout>,
  },
  // ... outras rotas
])
```

## 🏠 Páginas

### Home (`/`)

Dashboard principal da aplicação com:
- ✅ Estatísticas de feriados
- ✅ Barra de filtros completa
- ✅ Toggle entre List/Calendar view
- ✅ Lista de feriados ou calendário
- ✅ Integração com Zustand store

**Componentes Utilizados:**
- `HolidayStats` - Estatísticas
- `FilterBar` - Filtros
- `ViewToggle` - Toggle de visualização
- `HolidayList` / `CalendarGrid` - Conteúdo

### About (`/about`)

Página informativa com:
- ✅ Descrição da aplicação
- ✅ Features destacadas
- ✅ Tech stack completo
- ✅ Informações do projeto
- ✅ Links úteis

### 404 (`*`)

Página de erro para rotas inexistentes:
- ✅ Mensagem clara
- ✅ Botão para voltar home
- ✅ Botão para voltar na história
- ✅ Design consistente

## 🎨 Layout

Todas as páginas usam o `MainLayout`:

```tsx
<MainLayout>
  <YourPage />
</MainLayout>
```

**Componentes do Layout:**
- `Header` - Navegação principal
- `Footer` - Rodapé com informações
- Espaço central para conteúdo da página

## 🧭 Navegação

### Header Navigation

O Header possui navegação com estados ativos:

```tsx
<Link to="/" className={isActive('/') ? 'active' : ''}>
  Home
</Link>
<Link to="/about" className={isActive('/about') ? 'active' : ''}>
  About
</Link>
```

**Features:**
- ✅ Active states baseados na rota atual
- ✅ Ícones do Lucide React
- ✅ Transições smooth
- ✅ Responsivo

### Programmatic Navigation

Use `useNavigate` para navegação programática:

```tsx
import { useNavigate } from 'react-router-dom'

function MyComponent() {
  const navigate = useNavigate()
  
  const goToAbout = () => {
    navigate('/about')
  }
  
  const goBack = () => {
    navigate(-1)
  }
}
```

## 🛡️ Error Handling

### Error Boundary

Todas as rotas estão envolvidas em um ErrorBoundary:

```tsx
<ErrorBoundary>
  <RouterProvider router={router} />
</ErrorBoundary>
```

### 404 Handling

Rotas não encontradas são tratadas de duas formas:

1. **errorElement** - Erros durante o carregamento
2. **Rota wildcard (*)** - Rotas inexistentes

## 📱 Responsividade

Todas as páginas são responsivas:

```
Mobile (< 640px)   → Stack vertical, navegação simplificada
Tablet (640-1024px) → Grid de 2 colunas
Desktop (> 1024px)  → Grid completo, layout expandido
```

## 🎭 Animações

Todas as páginas possuem animações de entrada:

```tsx
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  {/* conteúdo */}
</motion.div>
```

## 🔄 State Persistence

O Zustand persiste automaticamente:
- ✅ Tema
- ✅ Locale
- ✅ Preferências de visualização

**NÃO persiste:**
- ❌ Filtros (melhor UX começar limpo)
- ❌ View mode (contextual)

## 🚀 Adicionar Nova Rota

1. Criar a página em `src/pages/`:

```tsx
// src/pages/NewPage/NewPage.tsx
export function NewPage() {
  return <div>Nova Página</div>
}

// src/pages/NewPage/index.ts
export { NewPage } from './NewPage'
```

2. Adicionar ao barrel export:

```tsx
// src/pages/index.ts
export { NewPage } from './NewPage'
```

3. Adicionar à configuração de rotas:

```tsx
// src/routes/index.tsx
{
  path: '/new',
  element: (
    <MainLayout>
      <NewPage />
    </MainLayout>
  ),
}
```

4. Adicionar link no Header:

```tsx
// src/components/layout/Header/Header.tsx
<Link to="/new">
  New Page
</Link>
```

## 🎯 Best Practices

### Layout Consistency

✅ **SEMPRE** use `MainLayout` para páginas:

```tsx
// ✅ CORRETO
<MainLayout>
  <MyPage />
</MainLayout>

// ❌ ERRADO
<MyPage /> // Sem layout
```

### Links vs Navigate

- **Use `<Link>`** para navegação declarativa (menus, botões)
- **Use `navigate()`** para navegação programática (após submit, etc)

### Active States

Use `useLocation` para detectar rota ativa:

```tsx
const location = useLocation()
const isActive = location.pathname === '/about'
```

### Loading States

Para rotas com loading, use Suspense:

```tsx
<Suspense fallback={<LoadingSpinner />}>
  <Outlet />
</Suspense>
```

## 📊 Métricas

- **Rotas configuradas**: 3
- **Páginas criadas**: 3 (Home, About, 404)
- **Componentes de layout**: 3 (Header, Footer, MainLayout)
- **Bundle impact**: ~82KB adicional (react-router-dom)

## 🔗 Referências

- [React Router v7 Docs](https://reactrouter.com/)
- [Framer Motion for Page Transitions](https://www.framer.com/motion/)
- [React Router Tutorial](https://reactrouter.com/en/main/start/tutorial)

---

**Status**: ✅ Completo e funcional  
**Router**: React Router v7.9.3  
**TypeScript**: 100% type-safe  
**Build**: ✅ Passa sem erros

