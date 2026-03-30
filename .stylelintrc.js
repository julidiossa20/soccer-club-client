/** @type {import('stylelint').Config} */
export default {
  extends: [
    // Reglas modernas estándar de CSS (propiedades válidas, sintaxis correcta, etc.)
    'stylelint-config-standard',
    // Ordena las propiedades CSS en un orden lógico: posición → display → box-model → tipografía → visual
    'stylelint-config-recess-order',
    // Integra Prettier para que el formato del CSS sea consistente con el resto del proyecto
    'stylelint-prettier/recommended',
  ],
  plugins: [
    // Plugin que conecta Stylelint con Prettier
    'stylelint-prettier',
  ],
  rules: {
    // Aplica las reglas de formato de Prettier sobre los archivos CSS
    'prettier/prettier': true,

    // ─── COLORES ────────────────────────────────────────────────────────────────

    // Obliga a usar valores numéricos para la transparencia: 0.5 en lugar de 50%
    'alpha-value-notation': 'number',
    // Prohíbe usar nombres de colores como "red" o "blue"; se deben usar valores explícitos
    'color-named': 'never',
    // Prohíbe hexadecimales inválidos como #GGG o #12345
    'color-no-invalid-hex': true,

    // ─── TIPOGRAFÍA ─────────────────────────────────────────────────────────────

    // Prohíbe declarar la misma familia tipográfica más de una vez en font-family
    'font-family-no-duplicate-names': true,
    // Exige que font-family siempre termine con una familia genérica: serif, sans-serif, monospace, etc.
    'font-family-no-missing-generic-family-keyword': true,

    // ─── FUNCIONES ──────────────────────────────────────────────────────────────

    // Prohíbe usar funciones CSS desconocidas o inexistentes
    'function-no-unknown': true,
    // Exige que las URLs dentro de url() estén siempre entre comillas: url("imagen.png")
    'function-url-quotes': 'always',

    // ─── NÚMEROS ────────────────────────────────────────────────────────────────

    // Limita la precisión decimal a 4 dígitos: 1.2345 ✓ / 1.23456 ✗
    'number-max-precision': 4,

    // ─── STRINGS ────────────────────────────────────────────────────────────────

    // Prohíbe saltos de línea dentro de strings CSS
    'string-no-newline': true,

    // ─── UNIDADES ───────────────────────────────────────────────────────────────

    // Prohíbe unidades desconocidas o mal escritas como "pxs" o "ems"
    'unit-no-unknown': true,
    // Lista blanca de unidades permitidas en el proyecto
    'unit-allowed-list': [
      // 'px',
      'em',
      'rem',
      '%', // Unidades base más comunes
      'vw',
      'vh', // Viewport clásico
      'svh',
      'svw',
      'dvh',
      'dvw', // Viewport moderno (small/dynamic)
      'fr', // Grid fractions
      'deg',
      'rad', // Ángulos para transforms/gradients
      's',
      'ms', // Tiempos para animaciones
      'ch',
      'ex', // Unidades basadas en caracteres
      'vmin',
      'vmax', // Viewport mín/máx
      'cqw',
      'cqh', // Container queries
    ],

    // ─── PROPIEDADES Y DECLARACIONES ────────────────────────────────────────────

    // Prohíbe valores redundantes en propiedades shorthand: margin: 10px 10px → margin: 10px
    'shorthand-property-no-redundant-values': true,
    // Prohíbe propiedades CSS que no existen o están mal escritas
    'property-no-unknown': true,
    // Prohíbe propiedades duplicadas dentro del mismo bloque
    // (excepto si tienen valores distintos intencionalmente, ej: fallback de color)
    'declaration-block-no-duplicate-properties': [true, { ignore: ['consecutive-duplicates-with-different-values'] }],
    // Prohíbe que una shorthand sobreescriba una propiedad longhand declarada después
    'declaration-block-no-shorthand-property-overrides': true,
    // Advierte cuando se usa !important (penaliza el uso sin prohibirlo completamente)
    'declaration-no-important': [true, { severity: 'warning' }],

    // ─── BLOQUES ────────────────────────────────────────────────────────────────

    // Prohíbe bloques CSS vacíos como: .foo {}
    'block-no-empty': true,

    // ─── SELECTORES ─────────────────────────────────────────────────────────────

    // Valida que los selectores de clase sigan la nomenclatura BEM: bloque__elemento--modificador
    'selector-class-pattern': [
      '^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?(--[a-z0-9]+(-[a-z0-9]+)*)?$',
      {
        message: 'El selector de clase debe usar nomenclatura BEM (ej: block__element--modifier)',
        severity: 'warning',
      },
    ],
    // Valida que los selectores de ID sean kebab-case: #mi-id ✓ / #miId ✗
    'selector-id-pattern': [
      '^[a-z][a-z0-9]*(-[a-z0-9]+)*$',
      {
        message: 'El selector de ID debe ser kebab-case',
        severity: 'warning',
      },
    ],
    // Advierte si se usan selectores de ID (dificultan la reutilización y aumentan la especificidad)
    'selector-max-id': [0, { severity: 'warning' }],
    // Prohíbe calificar selectores con el tipo de elemento: a.link ✗ → .link ✓ (excepto atributos)
    'selector-no-qualifying-type': [true, { ignore: ['attribute'] }],
    // Prohíbe pseudo-clases desconocidas como :hoveer o :focuss
    'selector-pseudo-class-no-unknown': true,
    // Prohíbe pseudo-elementos desconocidos como ::beefore
    'selector-pseudo-element-no-unknown': true,
    // Prohíbe tipos de elementos desconocidos en selectores
    'selector-type-no-unknown': true,

    // ─── MEDIA QUERIES ──────────────────────────────────────────────────────────

    // Prohíbe features de media query desconocidas como @media (widthh: 768px)
    'media-feature-name-no-unknown': true,
    // Prohíbe media queries con sintaxis inválida
    'media-query-no-invalid': true,

    // ─── AT-RULES ───────────────────────────────────────────────────────────────

    // Prohíbe at-rules desconocidas como @unkown {}
    'at-rule-no-unknown': true,
    // Prohíbe prefijos de vendor en at-rules: @-webkit-keyframes ✗ → @keyframes ✓
    'at-rule-no-vendor-prefix': true,

    // ─── CALIDAD GENERAL ────────────────────────────────────────────────────────

    // Advierte cuando un selector de menor especificidad aparece después de uno mayor
    // (puede sobreescribirse inadvertidamente)
    'no-descending-specificity': [true, { severity: 'warning' }],
    // Prohíbe duplicar reglas @import para el mismo archivo
    'no-duplicate-at-import-rules': true,
    // Prohíbe declarar el mismo selector más de una vez en la misma hoja de estilos
    'no-duplicate-selectors': true,
    // Prohíbe comentarios de doble barra // (no son CSS válido estándar)
    'no-invalid-double-slash-comments': true,
    // Prohíbe @import que aparezcan después de otras reglas CSS (deben ir al inicio)
    'no-invalid-position-at-import-rule': true,
    // Convierte errores de fuente vacía en advertencias (útil durante el desarrollo inicial)
    'no-empty-source': [true, { severity: 'warning' }],

    // ─── 🎨 USO OBLIGATORIO DE VARIABLES CSS (Design Tokens) ───────────────────
    //
    // ┌─────────────────────────────────────────────────────────────────────┐
    // │  ¿Qué puede Stylelint v17 hacer de forma NATIVA?                    │
    // │                                                                     │
    // │  ✅ Bloquear colores con nombre: "red", "blue"   → color-named      │
    // │  ✅ Bloquear hex inválidos: #GGG, #12345         → color-no-invalid │
    // │  ✅ Forzar notación moderna: rgb() en vez de rgba()                 │
    // │  ✅ Detectar variables CSS no definidas          → no-unknown-custom │
    // │  ✅ Forzar patrón de nombre en las variables     → custom-property-pattern │
    // │                                                                     │
    // │  ❌ Stylelint NO PUEDE verificar que:                               │
    // │     color: #e50000 debería ser color: var(--secondary-color)        │
    // │     (eso requeriría conocer el mapeo valor → variable,              │
    // │      lo cual ninguna herramienta nativa hace automáticamente)       │
    // │                                                                     │
    // │  🛡️  La estrategia más efectiva sin plugins:                        │
    // │     1. Prohibir colores directos (named + hex raro)                 │
    // │     2. Obligar que las variables respeten el patrón del proyecto    │
    // │     3. Detectar uso de variables no declaradas                      │
    // └─────────────────────────────────────────────────────────────────────┘
    //
    // Obliga a que todas las custom properties (variables CSS) definidas en el proyecto
    // sigan el patrón kebab-case: --primary-color ✓ / --primaryColor ✗ / --Primary_Color ✗
    // Esto garantiza consistencia con los tokens definidos en src/index.css
    'custom-property-pattern': [
      '^[a-z][a-z0-9]*(-[a-z0-9]+)*$',
      {
        message: 'Las variables CSS deben ser kebab-case: --primary-color ✓ / --primaryColor ✗',
      },
    ],

    // Lista de valores permitidos para propiedades de color (sin shorthand como "border"):
    //   → Solo acepta: var(--...) | transparent | currentColor | inherit | initial | unset | none
    //   → BLOQUEA: cualquier hex (#...), rgb(), hsl(), o nombre de color directos
    // NOTA: Esta regla aplica a componentes CSS individuales, no a su archivo de tokens
    'declaration-property-value-allowed-list': {
      // Color de texto: debe usar var(--text-color), var(--gray-800), etc.
      color: ['/^var\\(--[\\w-]+/', 'inherit', 'initial', 'unset', 'revert', 'currentColor', 'transparent'],

      // Fondo: debe usar var(--bg-color), var(--primary-color), etc.
      'background-color': ['/^var\\(--[\\w-]+/', 'inherit', 'initial', 'unset', 'revert', 'transparent', 'none'],

      // Color de borde: debe usar var(--border-color), var(--error-color), etc.
      'border-color': ['/^var\\(--[\\w-]+/', 'inherit', 'initial', 'unset', 'revert', 'transparent', 'currentColor'],
      'border-top-color': [
        '/^var\\(--[\\w-]+/',
        'inherit',
        'initial',
        'unset',
        'revert',
        'transparent',
        'currentColor',
      ],
      'border-right-color': [
        '/^var\\(--[\\w-]+/',
        'inherit',
        'initial',
        'unset',
        'revert',
        'transparent',
        'currentColor',
      ],
      'border-bottom-color': [
        '/^var\\(--[\\w-]+/',
        'inherit',
        'initial',
        'unset',
        'revert',
        'transparent',
        'currentColor',
      ],
      'border-left-color': [
        '/^var\\(--[\\w-]+/',
        'inherit',
        'initial',
        'unset',
        'revert',
        'transparent',
        'currentColor',
      ],

      // Outline: debe usar var(--...) o transparent
      'outline-color': ['/^var\\(--[\\w-]+/', 'inherit', 'initial', 'unset', 'revert', 'transparent', 'currentColor'],

      // Radio de borde: debe usar var(--border-radius-sm/md/lg) o 0 (sin unidad)
      'border-radius': ['/^var\\(--[\\w-]+/', '0', 'inherit', 'initial', 'unset', 'revert'],
      'border-top-left-radius': ['/^var\\(--[\\w-]+/', '0', 'inherit', 'initial', 'unset', 'revert'],
      'border-top-right-radius': ['/^var\\(--[\\w-]+/', '0', 'inherit', 'initial', 'unset', 'revert'],
      'border-bottom-left-radius': ['/^var\\(--[\\w-]+/', '0', 'inherit', 'initial', 'unset', 'revert'],
      'border-bottom-right-radius': ['/^var\\(--[\\w-]+/', '0', 'inherit', 'initial', 'unset', 'revert'],

      // Sombra: debe usar var(--shadow-sm/md/lg) o none
      'box-shadow': ['/^var\\(--[\\w-]+/', 'none', 'inherit', 'initial', 'unset', 'revert'],
    },
  },
  overrides: [
    {
      // ─── Excepción: archivos de tokens/variables globales ──────────────────
      // En estos archivos SE DEFINEN los valores reales de las variables, por lo tanto:
      //   - No se exige que usen var(--...) (aquí es donde se dan los valores)
      //   - No se validan custom properties contra una lista conocida
      //   - Los selectores de reset (*, body, h1-h6, a) no siguen BEM
      files: ['src/index.css', 'src/tokens.css', 'src/variables.css'],
      rules: {
        'selector-class-pattern': null, // Resets globales no son BEM
        'declaration-property-value-allowed-list': null, // Aquí van los valores reales
        'color-named': null, // Podría inicializarse desde nombre (edge case)
        'custom-property-pattern': null, // Pueden existir variables legacy: --light-gray,
        'unit-allowed-list': null,
        'color-function-notation': null,
      },
    },
  ],
  // Archivos y carpetas que Stylelint ignorará completamente
  ignoreFiles: ['dist/**', 'node_modules/**', 'coverage/**', '**/*.min.css'],
};
