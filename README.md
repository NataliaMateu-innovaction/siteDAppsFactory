# DAppsFactory — sitio 2026

Port a Astro de la homepage diseñada en Claude Design, más las páginas nuevas
(Blog, Equipo, Contacto).

## Correr

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run preview
```

## Por qué Astro y no el `.dc.html`

El archivo que exporta Claude Design **no es publicable**: monta la página con
React traído de `unpkg.com` y resuelve todo el layout responsive en JavaScript.
Medido en mobile con CPU 4x y Slow 4G:

| Métrica | `.dc.html` de Design | Este sitio | Objetivo |
|---|---|---|---|
| LCP | 3176 ms | **764 ms** | < 2500 ms |
| FCP | 3176 ms | **764 ms** | — |
| CLS | 0,0587 | 0,0587 | < 0,1 |
| TBT | 1165 ms | **256 ms** | — |
| Long tasks | 10 | **4** | — |
| Peso total | 453 KB | **231 KB** | — |
| JS | 196 KB | **8 KB** | — |

En el original `FCP == LCP`: la página quedaba **en blanco hasta los 3,1 s**
esperando a React. Eso es lo que se arregló.

## Fidelidad con el diseño

El port no cambió copy, colores, tipografía ni layout. Verificado comparando
altura de las 10 secciones contra el original en tres anchos:

- **1440px:** las 10 secciones idénticas, `docH` exacto (13417 px).
- **768px y 390px:** 9 de 10 idénticas. Arquitectura difiere en **+8 px** (0,07 %).

## Estructura

```
src/
  layouts/
    Base.astro        <head>, fuentes, variables de marca, carga del script
    Inner.astro       cabecera común de páginas internas
  components/
    Chrome.astro      grano, preloader, nav y panel mobile
    Footer.astro
    sections.html     las 10 secciones de la home (HTML resuelto desde Design)
  styles/
    base.css          copiado textual del <helmet><style> de Design
    layout.css        el layout() en JS reescrito como media queries
  scripts/
    site.js           la clase React portada a vanilla (8 KB)
  pages/
    index.astro  ·  equipo.astro  ·  contacto.astro  ·  blog/
  content/blog/       colección de notas (Markdown)
public/media/         AVIF + WebP + video
```

### Lo que hay que saber para tocarlo

**`layout.css` tiene las dos ramas de cada media query a propósito.** El markup
de Design trae inline styles que a veces son el estado mobile y a veces el de
desktop; el JS pisaba el que hiciera falta. Asumir una sola rama dejó el índice
de Servicios visible en mobile, encimado con el texto. Cada regla replica el
ternario original completo, con `min-width` y `max-width`.

**Los `!important` son necesarios.** Una hoja de estilos no le gana en
especificidad a un inline style, y el markup de Design es todo inline.

## Imágenes

Las PNG originales pesaban **5,1 MB**. Reescaladas al doble del tamaño de
pantalla real y convertidas a AVIF + WebP: **120 KB** (−98 %). Verificado que no
hay banding en los degradés ni pérdida en el metal cepillado.

Para regenerarlas hace falta `sharp`; el script está en el scratchpad de la
sesión. Los originales siguen en `DAppsFactory_claude/`.

## Pendientes

Heredados del handoff, ninguno resuelto acá porque son decisiones de contenido:

1. Número real de usuarios finales (hoy `3,2`)
2. Logos de clientes autorizados — hay 24 placeholders `.df-logo-slot`
   (dos franjas: `#df-marquee` debajo del hero y `#df-clients` en Métricas)
3. ~~Logo oficial~~ — **listo**, ver abajo
4. Endpoint real de la API en el snippet del servicio 03 — **si se saca el
   comentario `# ejemplo ilustrativo`, el endpoint tiene que ser real**
5. URLs de las 3 páginas de servicio (hoy `#`)
6. Confirmar qué casos de uso son reales y cuáles capacidades
7. Datos para hacer verificable la sección de cumplimiento
8. Fotos, nombres y bios del equipo — `src/pages/equipo.astro` tiene marcadores
9. Backend del formulario de contacto — ver `.env.example`

### Logo oficial

`public/logo-dappsfactory.svg`, usado en nav (44px de alto) y footer (58px).

**El original venía con el wordmark como texto vivo en Roboto Condensed.** El
sitio no carga esa fuente a propósito — el handoff dice "La fuente del logo no
se usa en el sitio" — así que servido tal cual caía a una fuente de reemplazo y
se rompía: los `<tspan>` tienen posiciones X fijas y las letras se encimaban.

Está **convertido a curvas** con opentype.js, tomando Roboto Condensed Bold y
Regular del sistema y respetando el `letter-spacing` de cada `<tspan>`. Ahora es
autocontenido: sin dependencia de fuentes y sin sumar un request al camino
crítico. El isotipo con degradé ya venía en paths.

Hay también un `logo_light.svg` (wordmark en `#231F96`) para fondos claros. No se
usa todavía porque nav y footer son los dos oscuros; si aparece una superficie
clara, hay que outlinearlo igual.

**Pendiente de decisión:** la bajada "by innovAction" es ilegible a 44px en el
nav (queda en ~3px). Si molesta, la salida es una variante del SVG con el
viewBox recortado que la excluya, dejando isotipo + wordmark.

### Nav — tres arreglos

**1. Contraste de los links.** El nav es `position:fixed` con fondo
semitransparente, así que su contraste **depende de la sección que pasa por
debajo**. Con el `rgba(6,6,7,0.55)` original, sobre las cuatro secciones claras
componía a `~#727170` y los links (`#8A8A94`) quedaban en gris sobre gris:

| Nav sobre | Antes | Ahora |
|---|---|---|
| Hero (oscuro) | 5,97:1 | 5,97:1 |
| Proceso (oscuro) | 5,78:1 | 5,92:1 |
| Métricas (claro) | **2,78:1** | 5,44:1 |
| Soluciones (claro) | **2,15:1** | 4,93:1 |
| Arquitectura (claro) | **1,42:1** | 4,93:1 |

Solución: opacidad `0.55` → `0.90`. Se eligió atacar la superficie y no aclarar
el texto, para **conservar el hover** (los links van de `--muted-on-dark` a
blanco al pasar el mouse; aclararlos de entrada lo anulaba). El efecto vidrio lo
da el `backdrop-filter: blur(16px)`, no la transparencia.

**2. Alto y tamaño del logo.** 85/69px → **105/89px**. El logo del nav pasó de
44px a **56px** de alto (134px de ancho) y el padding bajó de 28/20 a 24/16 para
que la barra no siguiera creciendo. Conserva el gesto de compresión de 16px al
scrollear. Idéntico en 1440, 768 y 390.

A 390px el logo ocupa 134 de 390px (34% del ancho) — menos que el lockup de
texto anterior, que se comía el 41%.

**3. `scroll-padding-top`.** No existía: todos los anclas del menú caían con el
título tapado por el nav, entre 57 y 69px ocultos. Ahora hay **104px** (alto del
nav comprimido más aire) y los cinco anclas llegan visibles.

> **Nota de método:** la auditoría de contraste original no detectó el punto 1
> porque medía la página en un solo estado de scroll. Para cualquier elemento
> `fixed` o `sticky` con fondo translúcido hay que medir en cada sección que le
> pasa por debajo.

### Contraste WCAG AA sin resolver

La auditoría encontró 20 textos bajo 4,5:1. **No se corrigieron**: arreglarlos
implica cambiar colores y opacidades, que son decisiones de diseño. Los tres
grupos:

- **Números de índice con degradé** sobre fondo claro: **1,16:1**. El mejor stop
  del degradé llega apenas a 3,39:1. El degradé funciona sobre `#060607`, no
  sobre `#F5F3EF`.
- **Estados inactivos** del Proceso (`opacity: calc(0.35 + 0.65 * var(--sN))`) y
  del índice de Servicios (0,38): entre 1,63:1 y 3,11:1. Tres de los cuatro
  pasos están siempre atenuados.
- **Footer**: 4,08:1 contra 4,5 requerido.

Detalle completo con ratios medidos en `DAppsFactory_claude/qa-shots/contrast-*.json`.

### Regla del degradé

El handoff prohíbe el degradé en títulos y párrafos. La palabra **"producción"**
en el H2 del CTA final lo usa. No falla contraste (5,40:1 en el peor stop), pero
viola la regla documentada. Se dejó como está, pendiente de decisión.
