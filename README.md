# TFG-MultiHUB — ERP Web para Gestión Empresarial Multi-Sede

> **Trabajo de Fin de Grado · Ingeniería Informática**  
> Aplicación web responsiva para la gestión integral de operaciones, recursos humanos e inventario en empresas multisede (PYMEs).

---

## 📋 Descripción del Proyecto

**TFG-MultiHUB** es un sistema ERP (Enterprise Resource Planning) web diseñado para pequeñas y medianas empresas con múltiples sedes. Centraliza la gestión de recursos humanos, cuadrantes de turnos, inventario y nóminas bajo un sistema de roles jerárquicos, con una interfaz moderna y completamente responsiva.

---

## 👥 Roles y Funcionalidades

### 🔵 CEO
- Visión global de todas las sedes en un panel unificado.
- Acceso a informes financieros, de nóminas y de rendimiento por sede.
- Gestión de usuarios y asignación de permisos.
- Control total sobre configuraciones del sistema.

### 🟢 Gerente (por sede)
- Gestión del personal asignado a su sede.
- Creación y edición de cuadrantes de turnos semanales/mensuales.
- Control de inventario: altas, bajas y movimientos de stock.
- Generación de nóminas para los empleados de su sede.
- Visualización de métricas y estadísticas de su sede.

### 🟡 Empleado
- Consulta de su propio horario y turnos asignados.
- Visualización de sus nóminas y recibos de salario.
- Gestión de solicitudes de vacaciones y ausencias.
- Acceso a su perfil y datos personales.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| **Frontend** | React 18 + Vite + TypeScript |
| **Estilos** | Tailwind CSS |
| **Estado / Fetching** | TanStack Query (React Query v5) |
| **Utilidades de fecha** | Day.js |
| **Backend** | Node.js + Express + TypeScript |
| **ORM** | Prisma |
| **Base de Datos** | PostgreSQL 15 |
| **Validación** | Zod |
| **Autenticación** | JSON Web Tokens (JWT) |
| **Contenedores** | Docker + Docker Compose |
| **CI/CD** | GitHub Actions |

---

## 📁 Estructura del Monorepo

```
TFG-MultiHUB/
├── .github/
│   └── workflows/
│       └── ci.yml          # Pipeline de CI con ESLint
├── frontend/               # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── pages/          # Páginas / vistas de la app
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # Llamadas a la API
│   │   └── store/          # Estado global
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── postcss.config.js
├── backend/                # Node + Express + TypeScript
│   ├── src/
│   │   ├── controllers/    # Controladores de rutas
│   │   ├── routes/         # Definición de rutas Express
│   │   ├── middlewares/    # Middlewares (auth, errores...)
│   │   └── services/       # Lógica de negocio
│   ├── prisma/
│   │   └── schema.prisma   # Modelos de base de datos
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── docker-compose.yml      # Orquestación de contenedores
├── .gitignore
└── README.md
```

---

## 🚀 Puesta en Marcha con Docker

### Prerrequisitos
- [Docker](https://www.docker.com/) ≥ 24
- [Docker Compose](https://docs.docker.com/compose/) ≥ 2

### Pasos

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/Cheluissss/TFG-MultiHUB.git
   cd TFG-MultiHUB
   ```

2. **Configura las variables de entorno del backend**

   ```bash
   cp backend/.env.example backend/.env
   # Edita backend/.env con tus propios valores si es necesario
   ```

3. **Levanta todos los contenedores**

   ```bash
   docker compose up --build
   ```

4. **Ejecuta las migraciones de Prisma** (primera vez)

   ```bash
   docker compose exec backend npx prisma migrate dev --name init
   ```

5. **Accede a la aplicación**

   | Servicio | URL |
   |---------|-----|
   | Frontend | http://localhost:5173 |
   | Backend API | http://localhost:4000 |
   | PostgreSQL | localhost:5432 |

---

## 🧑‍💻 Desarrollo Local (sin Docker)

### Backend

```bash
cd backend
npm install
cp .env.example .env   # Configura DATABASE_URL apuntando a tu PostgreSQL local
npx prisma migrate dev
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Variables de Entorno

Ver [`backend/.env.example`](./backend/.env.example) para la lista completa de variables requeridas.

---

## 📄 Licencia

Este proyecto es un Trabajo de Fin de Grado con fines académicos.

