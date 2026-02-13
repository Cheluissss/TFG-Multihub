# TFG - Sistema de Gestión de Nóminas y Turnos

Aplicación full-stack para la gestión de empleados, nóminas y sistemas de turnos.

## 📋 Stack Tecnológico

**Frontend:**

- React 18 + TypeScript
- Vite
- React Router
- TanStack Query
- Tailwind CSS
- Day.js

**Backend:**

- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication

## 🚀 Requisitos Previos

- Node.js 20+
- Docker y Docker Compose
- Git

## 📦 Instalación

### Opción 1: Con Docker (Recomendado)

```bash
cd /home/joseluis/Documentos/4º/TFG/proyecto
docker-compose up -d
```

Accede a:

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Base de datos: localhost:5432

### Opción 2: Instalación Local

**Backend:**

```bash
cd backend
npm install
cp ../.env .
npm run prisma:migrate
npm run dev
```

**Frontend (en otra terminal):**

```bash
cd frontend
npm install
npm run dev
```

## 💻 Comandos Útiles

**Backend:**

- `npm run dev` - Iniciar servidor en modo desarrollo
- `npm run build` - Compilar a JavaScript
- `npm run test` - Ejecutar tests
- `npm run lint` - Revisar código
- `npm run format` - Formatear código
- `npm run prisma:migrate` - Ejecutar migraciones
- `npm run prisma:studio` - Abrir Prisma Studio

**Frontend:**

- `npm run dev` - Iniciar servidor Vite
- `npm run build` - Compilar para producción
- `npm run lint` - Revisar código
- `npm run test` - Ejecutar tests

## 🐳 Docker

**Construir imágenes:**

```bash
docker-compose build
```

**Ver logs:**

```bash
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

**Detener servicios:**

```bash
docker-compose down
```

## 🗄️ Base de Datos

Acceder a Prisma Studio:

```bash
cd backend
npm run prisma:studio
```

## 📚 Estructura de Carpetas

```
proyecto/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── utils/
│   │   ├── types/
│   │   └── index.ts
│   ├── prisma/
│   ├── tests/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── types/
│   │   ├── styles/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   └── package.json
├── docker-compose.yml
├── .env
└── .gitignore
```

## 🔐 Seguridad

- JWT authentication con access & refresh tokens
- Validación con Zod en frontend y backend
- Contraseñas hasheadas con bcryptjs
- CORS configurado
- Variables de entorno sensitivas en `.env`

## 🧪 Testing

```bash
# Backend
cd backend
npm run test
npm run test:coverage

# Frontend
cd frontend
npm run test
npm run test:coverage
```

## 📝 Notas Desarrollo

- Usa `npm run format` antes de hacer commits
- Ejecuta `npm run lint` para verificar el código
- Los tipos TypeScript son obligatorios
- Mantén la estructura de carpetas consistente
