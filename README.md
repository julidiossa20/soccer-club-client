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
