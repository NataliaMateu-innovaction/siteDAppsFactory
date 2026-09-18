# DAppsFactory — sitio 2026

Homepage B2B de infraestructura blockchain, en [Astro](https://astro.build).
Es el port a código del diseño hecho en Claude Design (`DAppsFactory Homepage Build/`):
mismo look, mismas animaciones al scroll, pero HTML real + CSS + un JS de 4 KB.

## Correr

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run preview
```

Deploy: Vercel, conectado al repo de GitHub — cada push a `main` despliega a producción. `vercel.json` fija framework Astro, salida `dist/` y los redirects.

## Estructura

```
src/
  pages/
    index.astro                la home: arma las 10 secciones en orden
    blog/index.astro           listado de notas · blog/[slug].astro: cada nota
    contacto.astro             formulario del CRM (LeadConnector) embebido
    servicios/[slug].astro     landing de cada servicio, armada desde data/servicios.ts
  content/blog/*.md            las notas (una por archivo, con frontmatter)
  content.config.ts            esquema de las notas
  layouts/Base.astro           <head>, fuentes, preloader, nav, footer, botón "arriba"
  layouts/Inner.astro          cabecera de páginas interiores
  components/
    Nav.astro · Footer.astro · Eyebrow.astro · LogoMarquee.astro
    sections/                  Hero · Trust · Services · Process · Architecture ·
                               Cases · Portfolio · Security · Faq · Cta
  data/site.ts                 TODO el contenido editable (textos, proyectos, links, FAQ…)
  data/servicios.ts            contenido de las landings de servicio (una entrada por servicio)
  styles/global.css            una sola hoja: tokens de marca, layout, animaciones
  scripts/site.js              scroll animado, menú, FAQ, índice, magnéticos, scroll driver
  assets/                      PNG originales + assets/blog/ (portadas); Astro genera AVIF/WebP
  utils/date.ts                fechas de las notas en español, sin corrimiento de zona
scripts/redirects.mjs          genera vercel.json con los 301 desde las URLs viejas
public/
  logos/                       logos de clientes (portfolio + franja del hero)
  logo-dappsfactory.svg        logo oficial (wordmark ya convertido a curvas)
  favicon.svg
  media/                       video del hero (hero02.mp4, 1080p, loop sin corte, sin audio) + poster
```

### Dónde tocar qué

- **Textos, links, FAQ, casos:** [`src/data/site.ts`](src/data/site.ts). No hay que tocar componentes.
- **Proyectos y clientes:** el array `projects` en site.ts. Alimenta las tarjetas del portfolio y la franja de clientes bajo el hero. Para el logo de un cliente, poner el archivo en `public/logos/` y completar `logo`; mientras falte, se muestra el nombre como wordmark.
- **URL de agenda (Calendly, etc.):** `contact.agendaUrl` en site.ts. Vacía → el botón del CTA final cae al mail.
- **Colores / tipografía / espaciados:** variables al principio de [`src/styles/global.css`](src/styles/global.css).
- **Una sección puntual:** su archivo en `src/components/sections/`.
- **Landing de un servicio:** una entrada en [`src/data/servicios.ts`](src/data/servicios.ts) (hero, planes,
  grilla, pasos, comparativa, infraestructura, CTA y FAQ; las secciones son opcionales). La URL es
  `/servicios/<slug>/`. Después, apuntar el link del servicio en `services` (site.ts) y el footer.
- **Una nota nueva del blog:** crear `src/content/blog/mi-nota.md` con frontmatter
  `title`, `description`, `pubDate` (YYYY-MM-DD), `author` y opcional `cover`
  (ruta relativa a la imagen en `src/assets/blog/`). El nombre del archivo es la URL.
  `draft: true` la oculta.
- **Formulario de contacto:** es el del CRM LeadConnector/GoHighLevel; el ID está en
  `contact.crmFormId` (site.ts). Colores y campos se cambian desde el CRM.

## Cómo funciona el scroll

`site.js` escribe variables CSS en `:root` al scrollear (`--hero-p`, `--cut`, `--svc`,
`--proc`, `--s1..4`, `--arch`, `--la/lb/lc`) y el CSS hace el resto. Sin JS la página se
ve completa en estado de reposo. Los reveals y el índice de Servicios usan
scroll-driven animations donde el browser las soporta (Chrome/Edge); en el resto
hay fallback por JS.

Breakpoints (heredados del diseño): `sm ≥641`, `md ≥769`, `wide ≥900`, `lg ≥1025`.
El pin de Arquitectura y el índice sticky de Servicios solo existen en `lg`/`wide`;
en mobile y tablet se apilan. `prefers-reduced-motion: reduce` desactiva video, pin,
marquee, parallax, scroll animado y preloader.

## Decisiones de este port (además de las del handoff)

- **Logo oficial en nav y footer** (SVG outlined), en vez del lockup de texto que traía el export.
- **Nav scrolleado a `rgba(6,6,7,.90)`** en vez de `.55`: con `.55` los links caían a ~1,4:1 sobre las secciones claras.
- **`scroll-padding-top: 104px`** para que los anclas del menú no queden tapados por el nav.
- **H1 del hero en mobile** baja a `clamp(1.6rem, 8.4vw, 2.4rem)` para que "Blockchain que ya opera" entre en una línea en 360–640px (antes se partía).
- **Visual de Servicios** siempre a 520px máx (antes en tablet ocupaba todo el ancho).
- **Entrada del hero** con las líneas del H1 subiendo en secuencia después del preloader (el export lo especificaba pero no lo ejecutaba).
- **Preloader 100% en CSS**, una vez por sesión, disparado por un script inline en `<head>` para que no haya flash de contenido antes.
- **Botón "Agendar la llamada"** del CTA final: si no hay `agendaUrl`, va al mail (antes apuntaba a la misma sección, o sea a nada).

## Pendientes

Ver [HANDOFF-DAppsFactory.md](HANDOFF-DAppsFactory.md). En resumen, todo lo que
depende de datos del cliente: logo de MB&L y de NYBANQ, año de NYBANQ, URLs de las páginas
de servicio, endpoint real de la API, cuáles casos son reales, datos verificables de
cumplimiento, URL de agenda, páginas de privacidad y términos.

## Cambios de contenido (17/09/2026)

- **Métricas → Clientes y proyectos.** Los 10 proyectos vienen del sitio anterior
  (dappsfactory.io/#clientes), reescritos en el tono nuevo y sin páginas de detalle:
  la ficha va en la tarjeta y, si hay sitio propio, un link externo. Orden: primero
  lo más cercano al posicionamiento actual (Metro Futuro, Banco Galicia…).
- **Cómo trabajamos, Seguridad y FAQ** con la versión formal del cliente. La FAQ
  (19 preguntas) lleva datos estructurados `FAQPage` (schema.org).
- **Scroll animado** para "volver arriba" y todos los anclas (`scrollToY` en site.js):
  duración proporcional a la distancia, se cancela con rueda/touch, directo con
  reduced-motion.
- Nav completo desde 1025px (antes 769): con Proyectos, Blog y Contacto son 6 links.

## Video del hero (17/09/2026)

`her02.mp4` del cliente (1080p, con audio, 2 MB). Se le quitó el audio, se hizo el loop
sin salto con un fundido de 0,8 s entre el final y el principio (ffmpeg `xfade`) y
quedó en 818 KB. El original está en `src/assets/video/`. En mobile el recorte se
centra a la derecha (`object-position: 70%`) porque ahí está el monolito.

## Blog y contacto (17/09/2026)

- **/blog** con las 29 notas migradas del sitio anterior (dappsfactory.io/blog.html),
  convertidas a Markdown. Fechas y autores normalizados (el HTML viejo tenía
  fechas placeholder y un título duplicado). Cada nota lleva JSON-LD `BlogPosting`.
- **/contacto** con el formulario del CRM embebido, más mail/WhatsApp/LinkedIn.
  Todos los "Agendar 30 min" del sitio van ahí.
- **Nav:** Soluciones · Cómo trabajamos · Proyectos · Seguridad · Blog · Contacto +
  botón "Agendar 30 min". "Casos" salió del nav (sigue en el footer). El nav completo
  entra desde 1025px; abajo, menú hamburguesa con lo mismo.
- **Redirects 301** desde las URLs viejas (`blog-postNN.html`, `blog.html`…) en
  `vercel.json`, generado con `npm run redirects`.
- Las 29 notas tienen portada en `src/assets/blog/` (PNG/JPG originales; Astro sirve AVIF/WebP).
