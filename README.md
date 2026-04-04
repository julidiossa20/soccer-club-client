# ⚽ Soccer Club Client

Frontend del sitio web oficial del club de fútbol. Construido con **React + TypeScript + Vite**.

---

## 📋 Índice

- [Tecnologías](#-tecnologías)
- [Instalación](#-instalación)
- [Scripts disponibles](#-scripts-disponibles)
- [Arquitectura CSS](#-arquitectura-css)
  - [Sistema de Design Tokens](#1-sistema-de-design-tokens-srcindexcss)
  - [Variables disponibles](#2-variables-disponibles)
  - [Reglas obligatorias de CSS](#3-reglas-obligatorias-de-css)
  - [Nomenclatura BEM](#4-nomenclatura-bem)
  - [Orden de propiedades](#5-orden-de-propiedades-recess-order)
  - [Qué está prohibido](#6-qué-está-prohibido)
  - [Ejemplos correctos e incorrectos](#7-ejemplos-correctos-e-incorrectos)
- [Linting y Formateo](#-linting-y-formateo)
- [Commits y Git Hooks](#-commits-y-git-hooks)

---

## 🛠 Tecnologías

| Herramienta | Versión | Rol                       |
| ----------- | ------- | ------------------------- |
| React       | 19      | UI library                |
| TypeScript  | 5.9     | Tipado estático           |
| Vite        | 8       | Bundler / Dev server      |
| ESLint      | 9       | Linting de TypeScript/TSX |
| Stylelint   | 17      | Linting de CSS            |
| Prettier    | 3       | Formateo de código        |
| Husky       | 9       | Git hooks                 |
| lint-staged | 16      | Linting previo al commit  |

---

## 🚀 Instalación

```bash
npm install
npm run dev
```

---

## 📦 Scripts disponibles

```bash
# Desarrollo
npm run dev               # Inicia el servidor de desarrollo en localhost:5173

# Build
npm run build             # Compila TypeScript y genera el bundle de producción
npm run preview           # Previsualiza el build de producción

# Linting TypeScript/TSX
npm run lint              # Ejecuta ESLint sobre todos los archivos TS/TSX
npm run lint:fix          # ESLint con auto-corrección

# Linting CSS
npm run stylelint         # Ejecuta Stylelint sobre todos los archivos CSS en src/
npm run stylelint:fix     # Stylelint con auto-corrección

# Formateo
npm run format            # Prettier sobre todos los archivos src/**/*.{ts,tsx,css,html}

# Análisis de dependencias
npm run knip              # Detecta exports, imports y archivos no utilizados
```

---

## 🎨 Arquitectura CSS

Este proyecto usa **Vanilla CSS** con un sistema de **Design Tokens** centralizado. No se usa ningún framework CSS (Tailwind, Bootstrap, etc.).

### 1. Sistema de Design Tokens (`src/index.css`)

Todas las variables globales del sistema de diseño están centralizadas en `src/index.css` dentro de `:root`. Este es el **único lugar** donde se definen valores directos (colores, sombras, radios, etc.).

```
src/
└── index.css       ← Tokens globales + reset base
└── components/
    └── Button.css  ← Solo puede usar var(--...) de index.css
    └── Card.css    ← Solo puede usar var(--...) de index.css
```

> ⚠️ **Stylelint bloqueará** cualquier archivo CSS que no sea `index.css` y use valores directos en propiedades de color, `border-radius` o `box-shadow`.

---

### 2. Variables disponibles

#### 🎨 Colores de marca

```css
var(--primary-color)      /* #1a1a1a — Fondos oscuros, header, menús */
var(--primary-hover)      /* #333333 — Hover del primary */
var(--secondary-color)    /* #e50000 — Rojo Burgos CF, botones de acción */
var(--secondary-hover)    /* #cc0000 — Hover del secondary */
```

#### ✅ Colores semánticos (estados del sistema)

```css
/* Éxito */
var(--success-color)      /* #2e7d32 — Íconos válidos, píldoras "Aceptado" */
var(--success-light)      /* #e8f5e9 — Fondo de alertas de éxito */

/* Advertencia */
var(--warning-color)      /* #ed6c02 — Píldoras "Pendiente", precaución */
var(--warning-light)      /* #fff3e0 — Fondo de alertas de advertencia */

/* Error */
var(--error-color)        /* #dc3545 — Bordes inválidos, botones destructivos */
var(--error-light)        /* #ffebee — Fondo de mensajes de error */

/* Información */
var(--info-color)         /* #0288d1 — Notas informativas, "En proceso" */
var(--info-light)         /* #e1f5fe — Fondo de alertas informativas */
```

#### ⬜ Escala de grises

```css
var(--gray-50)   /* #fafafa — Fondos casi imperceptibles */
var(--gray-100)  /* #f5f5f5 — Fondos secundarios */
var(--gray-200)  /* #eeeeee — Divisores suaves, filas de tabla */
var(--gray-300)  /* #e0e0e0 — Bordes de tarjetas e inputs */
var(--gray-400)  /* #bdbdbd — Bordes pronunciados, focus tenue */
var(--gray-500)  /* #9e9e9e — Placeholders, helper texts */
var(--gray-600)  /* #757575 — Fechas, subtítulos */
var(--gray-700)  /* #616161 — Texto con jerarquía media */
var(--gray-800)  /* #424242 — Texto principal (alias: --text-color) */
var(--gray-900)  /* #212121 — Títulos h1/h2 pesados */
```

#### 🖼 Layout y tipografía

```css
var(--bg-color)     /* #ffffff — Fondo principal de la web */
var(--text-color)   /* alias de --gray-800 — Color de texto por defecto en body */
var(--text-muted)   /* alias de --gray-500 — Texto secundario o apagado */
var(--dark-bg)      /* #0d0d0d — Reservado para Dark Mode */
var(--dark-text)    /* #ffffff — Reservado para Dark Mode */
```

#### 🔲 Bordes y radios

```css
var(--border-color)       /* alias de --gray-300 — Borde predeterminado del sistema */

var(--border-radius-sm)   /* 4px  — Checkboxes, tags, píldoras */
var(--border-radius-md)   /* 6px  — Botones, inputs */
var(--border-radius-lg)   /* 12px — Tarjetas, modales, paneles */
```

#### 🌑 Sombras (elevación)

```css
var(--shadow-sm)  /* Sutil — botones estáticos, dropdowns */
var(--shadow-md)  /* Media — tarjetas de noticias y jugadores */
var(--shadow-lg)  /* Alta  — modales flotantes (z-index alto) */
```

#### 🪟 Glassmorphism / Overlays

```css
var(--glass-bg)      /* rgba blanco al 10% — Fondo de vidrio sobre imágenes */
var(--glass-border)  /* rgba blanco al 20% — Borde de vidrio */
```

---

### 3. Reglas obligatorias de CSS

Stylelint está configurado para **bloquear con error** las siguientes situaciones en archivos de componentes:

#### 🚫 Valores directos en propiedades de color

Las propiedades `color`, `background-color`, `border-color` (y variantes), y `outline-color` **solo pueden usar**:

| Valor permitido                      | Ejemplo                         |
| ------------------------------------ | ------------------------------- |
| Variable CSS                         | `var(--primary-color)`          |
| `transparent`                        | `background-color: transparent` |
| `currentColor`                       | `color: currentColor`           |
| `inherit / initial / unset / revert` | Palabras clave CSS globales     |

#### 🚫 Valores directos en `border-radius`

Las propiedades `border-radius` y sus variantes **solo pueden usar**:

| Valor permitido    | Ejemplo                    |
| ------------------ | -------------------------- |
| Variable CSS       | `var(--border-radius-md)`  |
| `0` (sin unidad)   | `border-radius: 0`         |
| Palabras clave CSS | `inherit`, `initial`, etc. |

#### 🚫 Valores directos en `box-shadow` y `text-shadow`

Solo se permiten:

| Valor permitido    | Ejemplo                    |
| ------------------ | -------------------------- |
| Variable CSS       | `var(--shadow-sm)`         |
| `none`             | `box-shadow: none`         |
| Palabras clave CSS | `inherit`, `initial`, etc. |

#### 🚫 Otras prohibiciones generales

| Prohibición            | Regla                              | Ejemplo incorrecto                          |
| ---------------------- | ---------------------------------- | ------------------------------------------- |
| Colores por nombre     | `color-named`                      | `color: red`                                |
| Hex inválidos          | `color-no-invalid-hex`             | `color: #GGG`                               |
| `rgba()` / `hsla()`    | `color-function-notation`          | `rgba(0,0,0,0.5)` → usar `rgb(0 0 0 / 0.5)` |
| Variables en camelCase | `custom-property-pattern`          | `--primaryColor` → usar `--primary-color`   |
| Bloques vacíos         | `block-no-empty`                   | `.foo {}`                                   |
| `!important`           | `declaration-no-important`         | `color: red !important` _(warning)_         |
| IDs como selectores    | `selector-max-id`                  | `#my-div { ... }` _(warning)_               |
| Unidades no listadas   | `unit-allowed-list`                | `width: 100pt`                              |
| `//` comentarios       | `no-invalid-double-slash-comments` | `// esto falla`                             |

---

### 4. Nomenclatura BEM

Los selectores de clase **deben seguir la convención BEM** (`warning`, no bloquea el build):

```
bloque__elemento--modificador
```

```css
/* ✅ Correcto */
.player-card {
}
.player-card__avatar {
}
.player-card__avatar--large {
}
.player-card--featured {
}

/* ⚠️ Incorrecto (genera warning de Stylelint) */
.playerCard {
}
.PlayerCard {
}
.player_card {
}
```

---

### 5. Orden de propiedades (Recess Order)

Las propiedades CSS deben declararse en este orden lógico. Stylelint lo **bloquea con error** si no se respeta:

```css
.component {
  /* 1. Posicionamiento */
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;

  /* 2. Display y modelo de caja */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
  margin: 0;
  padding: var(--spacing-md);

  /* 3. Tipografía */
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
  color: var(--text-color);

  /* 4. Visual / Decoración */
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);

  /* 5. Transiciones y animaciones */
  transition: background-color 0.3s ease;
  animation: fadeIn 0.5s ease-in;
}
```

---

### 6. Qué está prohibido

```css
/* ❌ Color hardcodeado en componente */
.btn {
  color: #e50000;
}
/* ✅ Correcto */
.btn {
  color: var(--secondary-color);
}

/* ❌ rgb() directo en componente */
.card {
  background-color: rgb(255 255 255);
}
/* ✅ Correcto */
.card {
  background-color: var(--bg-color);
}

/* ❌ border-radius hardcodeado */
.input {
  border-radius: 6px;
}
/* ✅ Correcto */
.input {
  border-radius: var(--border-radius-md);
}

/* ❌ box-shadow hardcodeado */
.modal {
  box-shadow: 0 10px 15px rgb(0 0 0 / 0.1);
}
/* ✅ Correcto */
.modal {
  box-shadow: var(--shadow-lg);
}

/* ❌ Variable en camelCase */
:root {
  --primaryColor: #1a1a1a;
}
/* ✅ Correcto */
:root {
  --primary-color: #1a1a1a;
}

/* ❌ Color con nombre */
.tag {
  color: red;
}
/* ✅ Correcto */
.tag {
  color: var(--error-color);
}

/* ❌ Función de color obsoleta (rgba, hsla) */
.overlay {
  background-color: rgba(0, 0, 0, 0.5);
}
/* ✅ Correcto */
.overlay {
  background-color: rgb(0 0 0 / 0.5);
}
/* ✅ Mejor aún (si el token existe) */
.overlay {
  background-color: var(--glass-bg);
}
```

---

### 7. Ejemplos correctos e incorrectos

#### ✅ Archivo de componente correcto

```css
/* src/components/PlayerCard.css */

.player-card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  color: var(--text-color);
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  transition: box-shadow 0.2s ease;
}

.player-card:hover {
  box-shadow: var(--shadow-lg);
}

.player-card__avatar {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: 2px solid var(--secondary-color);
}

.player-card__name {
  font-weight: 700;
  color: var(--gray-900);
}

.player-card__position {
  color: var(--text-muted);
}

.player-card--featured {
  border-color: var(--secondary-color);
  box-shadow: var(--shadow-lg);
}
```

#### ❌ Archivo de componente incorrecto (Stylelint bloqueará)

```css
/* src/components/PlayerCard.css — INCORRECTO */

.playerCard {
  /* ⚠️ No es BEM */
  color: #1a1a1a; /* ❌ Color hardcodeado */
  background-color: white; /* ❌ Color por nombre */
  border-radius: 12px; /* ❌ Radius hardcodeado */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* ❌ rgba() obsoleto + hardcodeado */
}
```

---

## 🔍 Linting y Formateo

### ESLint (TypeScript / TSX)

```bash
npm run lint        # Ver errores
npm run lint:fix    # Corregir automáticamente
```

Configurado en `eslint.config.js`. Incluye:

- TypeScript strict + type-aware rules
- React Hooks rules
- JSX Accessibility (jsx-a11y)
- Integración con Prettier

### Stylelint (CSS)

```bash
npm run stylelint       # Ver errores en CSS
npm run stylelint:fix   # Corregir lo que sea auto-fixable
```

Configurado en `.stylelintrc.js`. Incluye:

- `stylelint-config-standard` — Reglas CSS modernas
- `stylelint-config-recess-order` — Orden de propiedades
- `stylelint-prettier/recommended` — Integración con Prettier

### Prettier (Formateo general)

```bash
npm run format    # Formatea src/**/*.{ts,tsx,css,html}
```

Configurado en `.prettierrc`. Reglas: `singleQuote`, `tabWidth: 2`, `printWidth: 120`.

---

## 🪝 Commits y Git Hooks

Antes de cada `git commit`, **lint-staged** ejecuta automáticamente:

| Archivos                | Acciones                               |
| ----------------------- | -------------------------------------- |
| `*.{ts,tsx,js,jsx,mjs}` | `eslint --fix` → `prettier --write`    |
| `*.css`                 | `stylelint --fix` → `prettier --write` |
| `*.{json,md,html}`      | `prettier --write`                     |

> Si alguna regla falla y no es auto-correctable, el commit será **bloqueado** hasta que se corrija manualmente.

Configurado en `.lintstagedrc` y `.husky/`.

---

## 🧩 Sistema de Formularios

El proyecto incluye un sistema de formularios reutilizable compuesto por dos piezas que trabajan juntas: el componente `<Form />` y el hook `useForm()`.

---

### Estructura de archivos

```
src/
├── components/core/Form/
│   ├── types.ts        ← Todos los tipos y interfaces
│   ├── FormField.tsx   ← Renderiza un campo según su tipo
│   ├── Form.tsx        ← Componente principal
│   └── index.ts        ← Barrel de exports
└── hooks/
    └── useForm.ts      ← Hook de control de estado
```

---

### `<Form />` — Componente de renderizado

Recibe un `schema` y renderiza los campos correspondientes usando los componentes de `core`. No maneja estado propio, todo viene del padre.

#### Props

| Prop          | Tipo                                 | Default      | Descripción                           |
| ------------- | ------------------------------------ | ------------ | ------------------------------------- |
| `schema`      | `SchemaField[]`                      | —            | Definición de los campos a renderizar |
| `values`      | `Record<string, FieldValue>`         | —            | Valores actuales del formulario       |
| `errors`      | `Record<string, string \| string[]>` | `{}`         | Errores por campo                     |
| `onChange`    | `(key, value) => void`               | —            | Callback al cambiar cualquier campo   |
| `onSubmit`    | `(e) => void`                        | —            | Callback al hacer submit              |
| `columns`     | `1 \| 2`                             | `1`          | Columnas del grid de campos           |
| `isLoading`   | `boolean`                            | `false`      | Muestra spinner en el botón submit    |
| `submitLabel` | `string`                             | `'Guardar'`  | Texto del botón submit                |
| `onCancel`    | `() => void`                         | —            | Si se pasa, aparece el botón cancelar |
| `cancelLabel` | `string`                             | `'Cancelar'` | Texto del botón cancelar              |
| `className`   | `string`                             | `''`         | Clase extra para el `<form>`          |

#### Definición del schema — `SchemaField`

Cada campo del schema es un objeto con discriminated union por `type`, lo que da autocompletado preciso según el tipo elegido.

```ts
// Propiedades comunes a todos los campos
interface BaseField {
  key: string; // identificador único del campo
  label: string; // etiqueta visible
  required?: boolean; // marca el campo como obligatorio
  placeholder?: string;
  helperText?: string;
  disabled?: boolean;
  colSpan?: 1 | 2; // cuántas columnas ocupa en el grid
}
```

| `type`       | Componente renderizado    | Props extra                                        |
| ------------ | ------------------------- | -------------------------------------------------- |
| `'text'`     | `<Input type="text">`     | `leftIcon?`, `rightIcon?`                          |
| `'email'`    | `<Input type="email">`    | `leftIcon?`, `rightIcon?`                          |
| `'password'` | `<Input type="password">` | `leftIcon?`, `rightIcon?`                          |
| `'number'`   | `<Input type="number">`   | `leftIcon?`, `rightIcon?`, `min?`, `max?`, `step?` |
| `'date'`     | `<Input type="date">`     | `leftIcon?`, `rightIcon?`, `min?`, `max?`          |
| `'textarea'` | `<Textarea>`              | `rows?`                                            |
| `'checkbox'` | `<Checkbox>`              | —                                                  |
| `'select'`   | `<Select>`                | `options: Option[]` (requerido)                    |

> Cada `type` es una interfaz independiente (discriminated union). TypeScript sabe exactamente qué props acepta cada uno: `select` requiere `options`, `number` expone `min/max/step`, los campos de input aceptan `leftIcon`/`rightIcon`. Si usas `satisfies SchemaField[]` obtienes autocompletado preciso sin mezclar props entre tipos.

#### Grid de columnas y `colSpan`

Con `columns={2}` el formulario usa un grid de 2 columnas. Cualquier campo con `colSpan: 2` ocupa el ancho completo. En pantallas menores a 600px el grid colapsa a 1 columna automáticamente.

```
columns={2}, sin colSpan:        columns={2}, con colSpan:
┌──────────┬──────────┐          ┌──────────┬──────────┐
│  nombre  │  email   │          │  nombre  │  email   │
├──────────┼──────────┤          ├──────────────────────┤
│  edad    │  rol     │          │       contenido      │  ← colSpan: 2
└──────────┴──────────┘          └──────────────────────┘
```

---

### `useForm()` — Hook de control de estado

Maneja `values`, `errors`, validación de `required` y utilidades para el padre. Está completamente tipado con genéricos inferidos desde el schema.

#### Firma

```ts
function useForm<T extends SchemaField[]>(schema: T, initialValues?: Partial<InferFormValues<T>>): UseFormReturn<T>;
```

#### Inferencia de tipos por campo

El hook infiere el tipo de cada valor según el `type` del campo en el schema:

| `type` del campo | Tipo de `values[key]` |
| ---------------- | --------------------- |
| `'checkbox'`     | `boolean`             |
| `'number'`       | `number`              |
| cualquier otro   | `string`              |

Esto significa que `values.activo` es `boolean` y `values.edad` es `number` directamente, sin casteos.

#### Lo que devuelve

| Propiedad         | Tipo                       | Descripción                               |
| ----------------- | -------------------------- | ----------------------------------------- |
| `values`          | `InferFormValues<T>`       | Valores tipados campo a campo             |
| `errors`          | `FormErrors<T>`            | Errores por campo (solo keys del schema)  |
| `isDirty`         | `boolean`                  | `true` si el usuario tocó algún campo     |
| `handleChange`    | `(key, value) => void`     | Pasa directo a `Form onChange`            |
| `handleSubmit`    | `(onValid) => (e) => void` | Valida required y llama tu callback       |
| `setErrors`       | `(errors) => void`         | Setea errores externos (ej: servidor)     |
| `setFieldError`   | `(key, error) => void`     | Error puntual en un campo                 |
| `clearFieldError` | `(key) => void`            | Limpia el error de un campo               |
| `reset`           | `() => void`               | Vuelve a `initialValues` y limpia errores |
| `setValues`       | `(partial) => void`        | Inyecta valores (modo edición)            |

#### `handleSubmit` — cómo funciona

Recibe tu callback `onValid` y devuelve el handler del `<form>`. Antes de llamar `onValid` valida todos los campos con `required: true`. Si hay errores los setea en `errors` y no llama `onValid`.

```ts
const onSubmit = handleSubmit(async (data) => {
  // data está tipado como InferFormValues<typeof schema>
  // solo llega aquí si todos los required están completos
  await api.save(data);
});

<Form onSubmit={onSubmit} ... />
```

---

### Casos de uso

---

#### Caso 1 — Login (formulario simple, 1 columna, iconos)

El caso más básico. Schema pequeño, sin `initialValues`, errores del servidor mapeados campo a campo.

```tsx
import { AtSign, KeyRound } from 'lucide-react';
import { Form } from '@/components/core/Form';
import { useForm } from '@/hooks';
import type { SchemaField } from '@/components/core/Form';

const loginSchema = [
  {
    key: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    placeholder: 'Correo electrónico',
    leftIcon: <AtSign size={16} />,
  },
  {
    key: 'password',
    label: 'Contraseña',
    type: 'password',
    required: true,
    placeholder: 'Contraseña',
    leftIcon: <KeyRound size={16} />,
  },
] as const satisfies SchemaField[];

const LoginPage = () => {
  const { call, loading, findError } = useServices<Login.Data, Login.TBody>();
  const { values, errors, handleChange, handleSubmit, setFieldError } = useForm(loginSchema);

  const onSubmit = handleSubmit(async (data) => {
    // data.email → string ✅   data.password → string ✅
    const response = await call('post', '/api/v1/user/login', {
      email: data.email,
      password: data.password,
    });

    if (!response.success) {
      // mapea errores del servidor a los campos del schema
      setFieldError('email', findError('email'));
      setFieldError('password', findError('password'));
    }
  });

  return (
    <Form
      schema={loginSchema}
      values={values}
      errors={errors}
      isLoading={loading}
      submitLabel='Iniciar Sesión'
      onChange={handleChange}
      onSubmit={onSubmit}
    />
  );
};
```

---

#### Caso 2 — Crear registro (grid 2 columnas, todos los tipos de campo)

Muestra el uso de `columns={2}`, `colSpan`, iconos, `min/max` en number y date, select con opciones y checkbox.

```tsx
import { User, Mail, Hash, Calendar } from 'lucide-react';
import { Form } from '@/components/core/Form';
import { useForm } from '@/hooks';
import type { SchemaField } from '@/components/core/Form';

const posicionOptions = [
  { label: 'Portero', value: 'GK' },
  { label: 'Defensa', value: 'DEF' },
  { label: 'Centrocampista', value: 'MID' },
  { label: 'Delantero', value: 'FWD' },
];

const playerSchema = [
  {
    key: 'nombre',
    label: 'Nombre completo',
    type: 'text',
    required: true,
    leftIcon: <User size={16} />,
  },
  {
    key: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    leftIcon: <Mail size={16} />,
  },
  {
    key: 'dorsal',
    label: 'Dorsal',
    type: 'number',
    min: 1,
    max: 99,
    leftIcon: <Hash size={16} />,
  },
  {
    key: 'posicion',
    label: 'Posición',
    type: 'select',
    required: true,
    options: posicionOptions,
  },
  {
    key: 'fecha_nacimiento',
    label: 'Fecha de nacimiento',
    type: 'date',
    required: true,
    max: '2010-01-01', // no permite fechas futuras ni muy recientes
    leftIcon: <Calendar size={16} />,
  },
  {
    key: 'contrato',
    label: 'Fecha fin de contrato',
    type: 'date',
    min: new Date().toISOString().split('T')[0], // no permite fechas pasadas
  },
  {
    key: 'bio',
    label: 'Biografía',
    type: 'textarea',
    rows: 4,
    colSpan: 2, // ocupa las 2 columnas
    placeholder: 'Describe al jugador...',
  },
  {
    key: 'activo',
    label: 'Jugador activo',
    type: 'checkbox',
  },
] as const satisfies SchemaField[];

const CreatePlayerForm = () => {
  const { call, loading } = useServices<Player, Partial<Player>>();
  const { values, errors, handleChange, handleSubmit, reset, setErrors } = useForm(
    playerSchema,
    { activo: true }, // initialValues: checkbox marcado por defecto
  );

  const onSubmit = handleSubmit(async (data) => {
    // data.nombre → string, data.dorsal → number, data.activo → boolean ✅
    const response = await call('post', '/api/v1/players', data);

    if (response.success) {
      reset(); // limpia el formulario tras crear
    } else {
      setErrors({
        // errores del servidor, solo keys del schema ✅
        nombre: 'Este nombre ya existe en el equipo',
        email: 'El email ya está registrado',
      });
    }
  });

  return (
    <Form
      schema={playerSchema}
      values={values}
      errors={errors}
      columns={2}
      isLoading={loading}
      submitLabel='Crear jugador'
      onCancel={reset}
      cancelLabel='Limpiar'
      onChange={handleChange}
      onSubmit={onSubmit}
    />
  );
};
```

---

#### Caso 3 — Editar registro (cargar datos existentes con `setValues`)

El patrón de edición: se carga el registro del servidor y se inyecta en el formulario con `setValues`. El botón submit solo se activa si hay cambios (`isDirty`).

```tsx
const EditPlayerForm = ({ playerId }: { playerId: number }) => {
  const { call, loading } = useServices<Player, Partial<Player>>();
  const { values, errors, isDirty, handleChange, handleSubmit, setValues, setErrors } = useForm(playerSchema);

  // cargar datos al montar
  useEffect(() => {
    void call('get', `/api/v1/players/${playerId}`).then((res) => {
      if (res.success) {
        setValues(res.data); // inyecta los datos, solo acepta keys del schema ✅
      }
    });
  }, [playerId]);

  const onSubmit = handleSubmit(async (data) => {
    const response = await call('put', `/api/v1/players/${playerId}`, data);

    if (!response.success) {
      setErrors({ nombre: 'Ya existe un jugador con ese nombre' });
    }
  });

  return (
    <Form
      schema={playerSchema}
      values={values}
      errors={errors}
      columns={2}
      isLoading={loading || !isDirty} // desactiva submit si no hay cambios
      submitLabel='Guardar cambios'
      onChange={handleChange}
      onSubmit={onSubmit}
    />
  );
};
```

---

#### Caso 4 — Schema dinámico según rol o condición

El schema se construye en tiempo de ejecución según el contexto. TypeScript sigue infiriendo los tipos correctamente.

```tsx
const usePlayerSchema = (isAdmin: boolean, equipos: Option[]) =>
  [
    { key: 'nombre', label: 'Nombre', type: 'text', required: true },
    { key: 'email', label: 'Email', type: 'email', required: true },
    // el campo equipo solo aparece si el usuario es admin
    ...(isAdmin ? [{ key: 'equipo', label: 'Equipo', type: 'select' as const, options: equipos, required: true }] : []),
    { key: 'activo', label: 'Activo', type: 'checkbox' },
  ] satisfies SchemaField[];

const PlayerForm = ({ isAdmin }: { isAdmin: boolean }) => {
  const { data: equipos } = useEquipos();
  const schema = usePlayerSchema(isAdmin, equipos);
  const { values, errors, handleChange, handleSubmit } = useForm(schema);

  const onSubmit = handleSubmit(async (data) => {
    // si isAdmin → data.equipo existe ✅
    // si no → data.equipo no existe ✅
    await call('post', '/api/v1/players', data);
  });

  return <Form schema={schema} values={values} errors={errors} onChange={handleChange} onSubmit={onSubmit} />;
};
```

---

#### Caso 5 — Errores múltiples por campo y limpieza manual

`Input` acepta `string[]` para mostrar varios mensajes bajo el campo. `setFieldError` y `clearFieldError` permiten control granular.

```tsx
const onSubmit = handleSubmit(async (data) => {
  const response = await call('post', '/api/v1/players', data);

  if (!response.success) {
    // múltiples mensajes en un campo
    setFieldError('password', ['Mínimo 8 caracteres', 'Debe contener al menos un número']);

    // mensaje simple en otro
    setFieldError('email', 'Este email ya está registrado');
  }
});

// limpiar un error puntual sin resetear todo el formulario
// (handleChange ya lo hace automáticamente al escribir, pero puedes forzarlo)
const handleFocus = (key: string) => {
  clearFieldError(key as 'email' | 'password');
};
```

---

#### Caso 6 — Formulario de solo lectura

Deshabilita todos los campos derivando el schema. Útil para vistas de detalle que comparten el mismo schema que el formulario de edición.

```tsx
const PlayerDetail = ({ player }: { player: Player }) => {
  const readonlySchema = playerSchema.map((f) => ({ ...f, disabled: true }));
  // useForm no es necesario en modo lectura, los valores vienen de props
  const { values, handleChange } = useForm(readonlySchema, player);

  return (
    <Form
      schema={readonlySchema}
      values={values}
      errors={{}}
      columns={2}
      submitLabel='Editar' // el submit puede redirigir al modo edición
      onChange={handleChange}
      onSubmit={(e) => {
        e.preventDefault();
        onEditClick();
      }}
    />
  );
};
```
