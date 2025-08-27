# Plataforma plus58 Cursos

Plataforma para gestionar y consumir materiales de cursos (markdown) con control de acceso por rol/estado usando Firebase Auth + Firestore.

## Objetivos clave

- Mostrar temario de múltiples cursos leyendo `config.json` de cada curso (filesystem).
- Control de acceso por usuario: estados (activo, inactivo, graduado) y lecciones desbloqueadas.
- Dashboard profesor: gestionar estudiantes, estados, desbloqueos y enlaces de invitación.
- Contenido markdown en el repositorio; Firestore solo para usuarios, invitaciones y progreso.

## Stack

- Next.js 14 (App Router) + TypeScript
- TailwindCSS modo oscuro forzado + diseño minimalista verde.
- Firebase (Auth, Firestore, Storage opcional)
- Markdown parsing: gray-matter + react-markdown + rehype plugins
- Validación: zod

## Estructura de contenido y código

```
proyecto/
  app/
    (public)/                 # Rutas públicas
    (dashboard)/              # Layout + páginas dashboard profesor
    api/                      # Route handlers (enlaces de registro, sync, etc.)
  src/
    components/               # UI components
    lib/                      # Lógica compartida (firebase, auth, repos, content-fs)
    styles/                   # Estilos
    content/
      <courseId>/
        config.json           # Índice + metadatos de lecciones (fuente de verdad)
        01-tema.md
        02-tema.md
```

## Modelo de datos (Firestore)

Colecciones usadas:

- users/{uid}
  {
  email: string,
  courses: string[], // cursos donde está inscrito
  courseAccess: { // clave: courseId
  [courseId]: {
  state: 'activo'|'inactivo'|'graduado',
  unlockedLessons: string[] // slugs globales courseId--leccion
  }
  },
  createdAt: Timestamp
  }
- inviteLinks/{id} (courseId, active, used, maxUses,...)

No se guardan las lecciones ni su contenido en Firestore.

Slug global de lección: `courseId--slugBase` para evitar colisiones entre cursos.

Acceso a lección:

1. Cargar config.json del curso desde FS.
2. Verificar doc users/{uid}. Si state graduado => acceso completo.
3. Si activo => requiere que slug esté en unlockedLessons.
4. Si inactivo => bloqueado.

Desbloqueo: añadir slug(s) a `courseAccess.courseId.unlockedLessons`.

Graduado: se ignoran los unlockedLessons (acceso total al curso).

## Variables de entorno

```
FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=...
FIREBASE_STORAGE_BUCKET=...
FIREBASE_MESSAGING_SENDER_ID=...
FIREBASE_APP_ID=...
FIREBASE_SERVICE_ACCOUNT_KEY_JSON={"type":"service_account",...}
PROFESSOR_EMAILS=profesor@example.com
```

## Licencia

Pendiente.
