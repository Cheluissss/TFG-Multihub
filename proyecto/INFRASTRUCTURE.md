# MultiHub - Sistema de Gestión de Nóminas y Turnos

## 📊 Estructura

```
backend/
  ├── src/
  │   ├── controllers/      # Lógica de controladores
  │   ├── routes/           # Definición de rutas
  │   ├── services/         # Lógica de negocios
  │   ├── middleware/       # Middlewares (auth, etc)
  │   ├── utils/            # Funciones utilitarias
  │   ├── types/            # Tipos TypeScript globales
  │   └── index.ts          # Punto de entrada
  ├── prisma/
  │   ├── schema.prisma     # Definición de modelos BD
  │   ├── migrations/       # Historial de migraciones
  │   └── seed.ts           # Datos de prueba
  ├── tests/                # Tests unitarios
  └── .env                  # Variables de entorno

frontend/
  ├── src/
  │   ├── components/       # Componentes React reutilizables
  │   ├── pages/            # Páginas completas
  │   ├── hooks/            # Hooks personalizados
  │   ├── utils/            # Funciones utilitarias
  │   ├── types/            # Tipos TypeScript
  │   ├── styles/           # Estilos CSS
  │   ├── App.tsx           # Componente principal
  │   └── main.tsx          # Entry point
  └── vitest.config.ts      # Config de testing

.github/
  ├── workflows/ci-cd.yml   # Pipeline de CI/CD
  └── dependabot.yml        # Actualizaciones automáticas

docker-compose.yml          # Orquestación de servicios
.gitignore
.env.example
README.md
```

## 🔧 Infraestructura Configurada

### ✅ Backend

- TypeScript con tipos globales (`src/types/index.ts`)
- JWT authentication helpers (`src/utils/jwt.ts`)
- Middleware de autenticación (`src/middleware/auth.ts`)
- Prisma ORM con primera migración
- Database seeding (`prisma/seed.ts`)

### ✅ Frontend

- TypeScript tipos compartidos (`src/types/index.ts`)
- Vitest configurado para testing
- Vite optimizado para desarrollo

### ✅ DevOps

- `.dockerignore` en backend y frontend
- GitHub Actions CI/CD:
  - Linting (ESLint)
  - Build TypeScript
  - Testing (Jest + Vitest)
  - Docker build check
- Dependabot para actualizaciones automáticas

### ✅ Base de Datos

- PostgreSQL 16 en Docker
- Prisma con migraciones
- Usuario: `joseluis` | Contraseña: `joseluis` | DB: `db_multihub`
- Puerto: `5433` (evita conflictos)

## 🚀 Primeros Pasos

### Ejecutar aplicación

```bash
docker compose up -d
```

### Seed de datos

```bash
cd backend
npm run db:seed
```

### Ejecutar migraciones

```bash
cd backend
npm run prisma:migrate
```

### Ver datos en Prisma Studio

```bash
cd backend
npm run prisma:studio
```

## 📝 Convenciones de Código

### TypeScript

- Todo debe estar tipado
- Imports relativos con alias `@/`
- Archivos en camelCase (services, controllers)
- Tipos/Interfaces con PascalCase

### Git

- Commits atómicos descriptivos
- Ramas: `main`, `develop`, `feature/*`
- PR con descripción clara

### Testing

- Backend: Jest (backend/tests/)
- Frontend: Vitest (src/**tests**/)
- Cobertura mínima: 80% en módulos críticos

## 🔐 Seguridad

- JWT con access token (15m) + refresh token (7d)
- RBAC: ADMIN, MANAGER, EMPLOYEE
- CORS configurado
- Contraseñas hasheadas (bcryptjs)

## 📦 Scripts Útiles

**Backend:**

```bash
npm run dev                 # Desarrollo
npm run build               # Compilar
npm run test                # Tests
npm run lint                # ESLint
npm run db:seed            # Seed datos
npm run prisma:migrate     # Migraciones
npm run prisma:studio      # UI Prisma
```

**Frontend:**

```bash
npm run dev                 # Desarrollo
npm run build               # Build producción
npm run test                # Tests
npm run lint                # ESLint
```
