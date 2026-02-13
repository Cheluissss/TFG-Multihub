# TFG-Multihub

**Sistema de Gestión de Nóminas y Turnos** - Trabajo de Fin de Grado (TFG)

Universidad: [Tu Universidad]  
Curso: Cuarto año  
Fecha: 2026

---

## 📋 Contenido del Repositorio

```
TFG-Multihub/
├── Memoria/                    # Documentación del TFG (LaTeX)
│   └── TFG_Jose_Luis_Garcia_Valverde/
│       ├── main.tex
│       ├── bibliografia.bib
│       ├── capitulos/          # Capítulos del TFG
│       │   ├── 01_introduccion.tex
│       │   ├── 02_estado_arte.tex
│       │   ├── 03_stack_tecnologico.tex
│       │   ├── 04_secciones.tex
│       │   └── 05_division_tareas.tex
│       └── imagenes/
│
├── proyecto/                   # Código fuente de la aplicación
│   ├── backend/                # API REST (Express + TypeScript)
│   ├── frontend/               # Interfaz de usuario (React + TypeScript)
│   ├── docker-compose.yml      # Orquestación de servicios
│   ├── .env.example
│   ├── README.md
│   └── INFRASTRUCTURE.md
│
└── README.md                   # Este archivo
```

---

## 🚀 Sobre el Proyecto

### Descripción
MultiHub es un sistema integral para la gestión empresarial de nóminas, turnos y recursos humanos. Diseñado con arquitectura moderna y escalable.

### Stack Tecnológico (PERN + TypeScript)

**Frontend:**
- React 18 + Vite
- TypeScript
- TanStack Query
- Tailwind CSS

**Backend:**
- Node.js + Express
- PostgreSQL
- Prisma ORM
- JWT Authentication

**DevOps:**
- Docker & Docker Compose
- GitHub Actions (CI/CD)
- Dependabot

---

## 📁 Estructura del Proyecto

### `/Memoria` - Documentación
Documento completo del TFG en LaTeX con:
- Introducción y justificación
- Estado del arte
- Stack tecnológico seleccionado
- Requisitos funcionales
- Diseño y arquitectura
- División de tareas

Ver: `Memoria/TFG_Jose_Luis_Garcia_Valverde/main.tex`

### `/proyecto` - Código Fuente

**Backend** (`proyecto/backend/`):
- Estructura MVC
- Autenticación JWT
- Validación con Zod
- ORM con Prisma
- Testing con Jest

**Frontend** (`proyecto/frontend/`):
- Componentes React
- React Router para navegación
- TanStack Query para estado
- Tailwind CSS para estilos
- Vitest para testing

---

## 🛠️ Instalación y Uso

### Requisitos Previos
- Docker & Docker Compose
- Node.js 20+
- Git

### Lanzar Aplicación

```bash
cd proyecto
docker compose up -d
```

Accede a:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001
- **PostgreSQL**: localhost:5433

### Desarrollo Local

**Backend:**
```bash
cd proyecto/backend
npm install
npm run dev
```

**Frontend:**
```bash
cd proyecto/frontend
npm install
npm run dev
```

---

## 🔐 Usuarios de Prueba

Después de ejecutar `npm run db:seed` en backend:

| Email | Rol | Contraseña |
|-------|-----|-----------|
| admin@multihub.local | ADMIN | admin123 |
| manager@multihub.local | MANAGER | manager123 |
| employee@multihub.local | EMPLOYEE | employee123 |

---

## 📚 Documentación Adicional

- [Infraestructura del Proyecto](proyecto/INFRASTRUCTURE.md)
- [README Backend](proyecto/backend/README.md) *(si existe)*
- [README Frontend](proyecto/frontend/README.md) *(si existe)*

---

## 📊 Estado del Proyecto

- ✅ Infraestructura configurada
- ✅ Docker containerizado
- ✅ Base de datos y ORM
- ✅ Autenticación JWT
- ✅ CI/CD automático
- 🔄 Desarrollo de features en curso

---

## 👤 Autor

**José Luis García Valverde**

---

## 📝 Licencia

Este proyecto es académico y está creado como Trabajo de Fin de Grado.

---

## 🤝 Contribuciones

Este es un repositorio académico. Las contribuciones son bienvenidas para mejoras educativas.

---

**Creado:** 12 de febrero de 2026  
**Última actualización:** 13 de febrero de 2026
