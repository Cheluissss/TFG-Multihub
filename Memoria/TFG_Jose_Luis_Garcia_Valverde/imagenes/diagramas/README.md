Para generar las imágenes PNG desde los archivos Mermaid, puede usar cualquiera de estos metodos:

# OPCION 1: Usar Mermaid CLI (recomendado)

Instalar mermaid-cli globally:
npm install -g @mermaid-js/mermaid-cli

Convertir archivo .mmd a PNG:
mmdc -i sprint1_er.mmd -o sprint1_er.png
mmdc -i pbi6_login_sequence.mmd -o pbi6_login_sequence.png
mmdc -i pbi8_rbac_sequence.mmd -o pbi8_rbac_sequence.png

O convertir todo de una vez:
for file in \*.mmd; do mmdc -i "$file" -o "${file%.mmd}.png"; done

# OPCION 2: Usar Kroki API Online

Usar curl para convertir a PNG:

curl -X POST http://kroki.io/mermaid/png \
 --data-binary @sprint1_er.mmd \
 -o sprint1_er.png

Para todos los archivos:
for file in \*.mmd; do
curl -X POST http://kroki.io/mermaid/png \
 --data-binary @"$file" \
    -o "${file%.mmd}.png"
done

# OPCION 3: Editor Online

Abrir cada archivo .mmd content en: https://mermaid.live/

- Copiar el contenido del archivo .mmd
- Pegar en mermaid.live
- Usar boton "Download as PNG"

# ARCHIVOS INCLUIDOS:

1. sprint1_er.mmd
   - Diagrama entidad-relacion del schema de base de datos
   - Muestra todas las entidades: User, Sede, Shift, ShiftRequest
   - Muestra todas las relaciones y foreign keys
   - Ver en: imagenes/diagramas/sprint1_er.png (si se genera)

2. pbi6_login_sequence.mmd
   - Diagrama de secuencia para flujo de login (PBI-6)
   - Muestra interaccion entre: Usuario, Frontend, Backend, Base de Datos
   - Incluye validaciones: Zod, lookup, bcryptjs comparison, JWT generation
   - Muestra casos de error y happy path
   - Ver en: imagenes/diagramas/pbi6_login_sequence.png (si se genera)

3. pbi8_rbac_sequence.mmd
   - Diagrama de secuencia para validacion RBAC (PBI-8)
   - Muestra interaccion entre: Frontend, Middleware, RoleMiddleware, Controller, DB
   - Incluye validacion de JWT, extraccion de role, authorization checks
   - Muestra filtrado de datos por rol (EMPLOYEE, MANAGER, ADMIN)
   - Ver en: imagenes/diagramas/pbi8_rbac_sequence.png (si se genera)

# INTEGRACION CON LATEX:

Para incluir las imagenes en el documento LaTeX:

\begin{figure}[h]
\centering
\includegraphics[width=\textwidth]{imagenes/diagramas/sprint1_er.png}
\caption{Diagrama ER - Sprint 1}
\label{fig:sprint1_er}
\end{figure}

\begin{figure}[h]
\centering
\includegraphics[width=\textwidth]{imagenes/diagramas/pbi6_login_sequence.png}
\caption{Secuencia - Login (PBI-6)}
\label{fig:pbi6_login}
\end{figure}

\begin{figure}[h]
\centering
\includegraphics[width=\textwidth]{imagenes/diagramas/pbi8_rbac_sequence.png}
\caption{Secuencia - RBAC (PBI-8)}
\label{fig:pbi8_rbac}
\end{figure}

Luego hacer referencia con: \ref{fig:sprint1_er}, \ref{fig:pbi6_login}, \ref{fig:pbi8_rbac}
