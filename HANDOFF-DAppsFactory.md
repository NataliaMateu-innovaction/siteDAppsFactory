# DAppsFactory — Homepage · Documento de traspaso

> **Estado 17/09/2026:** el export de Claude Design se portó a Astro (ver [README.md](README.md)).
> Lo que sigue abajo es el documento original del handoff. Ya resueltos en el port:
> el logo oficial en nav y footer (punto 3), el bug de las capas de Arquitectura,
> el QA en 390/768/1440, `prefers-reduced-motion`, el H1 del hero en mobile, y los
> PNG de >1 MB (ahora AVIF/WebP de 5–65 KB). Siguen pendientes los puntos que dependen
> de datos del cliente (2, 5, 6, 7, 8) y la auditoría de contraste AA completa.
> La sección Métricas (punto 1) se reemplazó por Clientes y proyectos con los 10
> proyectos del sitio anterior (dappsfactory.io/#clientes); los textos de Cómo
> trabajamos, Seguridad y FAQ se reemplazaron por la versión formal del cliente.


Estado al momento del export desde Claude Design. Este documento es la verdad actual del proyecto: el Prompt Maestro original quedó desactualizado por las decisiones que se tomaron durante la iteración.

---

## Contexto en una línea

Homepage B2B de infraestructura blockchain. Objetivo único: **agendar una llamada de 30 minutos con un especialista**. Público hispanohablante (voseo rioplatense), comprador solution-aware: ya sabe qué es tokenizar, necesita evaluar capacidad de ejecución en producción y cumplimiento regulatorio.

---

## Sistema de marca

```css
--bg-dark:#060607;  --surface-dark:#101014;
--bg-light:#F5F3EF; --surface-light:#EBE8E2;
--text-on-dark:#FAFAF8;  --muted-on-dark:#8A8A94;
--text-on-light:#0B0B0D; --muted-on-light:#5A5A63;
--brand-indigo:#231F96; --accent-solid:#5277F7;
--brand-gradient: linear-gradient(90deg,#B4F759 0%,#01C7C5 28%,#3296E3 55%,#7973F6 80%,#8E71F5 100%);
--hairline-dark: rgba(255,255,255,.10);
--hairline-light: rgba(11,11,13,.10);
```

Los hex del degradé se extrajeron del PNG del logo, no son estimados.

**Tipografía:** Inter Tight (display, 500/600/700) + Inter (cuerpo, 400/500). La fuente del logo no se usa en el sitio.

**Regla del degradé — se violó dos veces durante la iteración, vigilarla:**
va en cifras, números de índice, líneas, nodos y el botón primario.
**Nunca en párrafos, títulos ni texto de cuerpo.** Un párrafo con degradé rompe la legibilidad y hace que el contraste varíe palabra por palabra, así que parte de la frase falla WCAG AA y parte no.

---

## Jerarquía de CTAs — no romper

| Nivel | Uso | Estilo |
|---|---|---|
| Primario | "Agendar 30 min" (nav, hero, CTA final) | Píldora rellena con `--brand-gradient`, texto `#060607`, magnética |
| Secundario | "Ver soluciones" (hero) | Link de texto con flecha |
| Terciario | Los 3 links de servicios | Link de texto con `ArrowUpRight`, hairline abajo que se oscurece al hover |

Los tres links de servicios **no pueden** convertirse en botones rellenos. Si lo hacen, la página pasa de tener un CTA primario a tener cuatro y pierde el foco.

---

## Decisiones tomadas y por qué (para no revertirlas sin motivo)

- **Hero:** composición de dos columnas con el objeto contenido a la derecha, no video full-bleed. Se decidió así porque evita pelear contraste sobre video y es más cercano a la referencia Apple pedida.
- **Servicios:** índice sticky a la izquierda + paneles que scrollean a la derecha. Cumple literalmente el titular "Tres capas. Un mismo sistema": el lector ve los tres mientras recorre uno.
- **Servicio 03:** no lleva render 3D. Lleva un panel de código del mismo tamaño y radio que las imágenes de 01 y 02. Para "Desarrollo Blockchain" el código convence más que un objeto de metal, y evita tres bloques con imagen (que el brief prohibía).
- **Arquitectura:** 3 PNG con alfa animados con scroll, **no** scrub de video. El scrub pesa 10-20 MB, se rompe en Safari iOS y destruye el LCP.
- **Se agregaron dos secciones al brief original:** Seguridad y cumplimiento (en fintech regulado el deal se cae en el comité de riesgo, no por diseño) y FAQ de objeciones (descalifica al lead malo).
- **Métricas:** se sacó el volumen en USD por decisión del cliente. Las cuatro son: usuarios finales / integraciones en producción / países / años de la compañía. El label de años dice "de la compañía" a propósito: "25 años operando" al lado de "blockchain" no es creíble (Bitcoin tiene 17).

---

## Bug conocido a verificar primero

**Sección Arquitectura — las capas arrancan separadas.** La causa es estructural: las tres imágenes están en el flujo normal del documento con un `gap`, así que el `translateY` de la animación se suma a una separación que ya crea el layout.

Fix: contenedor `position: relative` con `aspect-ratio` fijo; las tres capas en `position: absolute; inset: 0; object-fit: contain`, sin flex, sin grid, sin gap. z-index 3/2/1. Los tres PNG están alineados píxel a píxel entre sí (verificado: IoU de silueta 0.99+, mismo lienzo 2264×563), así que superpuestos coinciden.

**Criterio de aceptación:** al entrar a la sección, antes de scrollear, se ve prácticamente una sola losa con dos bordes finos asomando. Si se ven tres losas separadas, el fix no se aplicó.

Valores de la animación: `pin: true, start: "top top", end: "+=150%", scrub: 0.8`. Inicio `y: -14/0/+14`, final `y: -110/0/+110`, `rotateX` 0→14deg con `perspective: 1200px`. **Solo eje Y, sin traslación en X.**

---

## Pendientes de contenido (bloquean el launch)

| # | Qué falta | Dónde |
|---|---|---|
| 1 | Número de usuarios finales | Métricas, 1ª cifra |
| 2 | Logos de clientes autorizados a publicar | Franja de confianza + Métricas |
| 3 | Logo oficial en PNG (hoy es texto) | Nav y footer |
| 4 | Email de contacto real (`hello@dappsfactory.com`) | CTA final y footer (✅ Actualizado) |
| 5 | Endpoint real de la API | Panel de código del servicio 03 |
| 6 | URLs de las 3 páginas de servicio | Links terciarios (hoy apuntan a `#`) |
| 7 | Confirmar cuáles de los 4 casos de uso son casos reales y cuáles capacidades | Sección Casos de uso |
| 8 | Datos para hacer verificable la sección de cumplimiento | Ver abajo |

**Sobre el punto 8:** la sección de Seguridad quedó reescrita como pregunta del comité de riesgo → respuesta, lo que la hace mucho menos genérica. Pero para que sea *verificable* hace falta: nombre de la firma que audita contratos, proveedor de KYC/screening, proveedor de custodia, certificaciones reales (ISO 27001 / SOC 2), y sobre todo **si DAppsFactory o alguna empresa del grupo está registrada ante algún regulador** (PSAV en CNV, PSP en BCRA). Ese último dato, si existe, va arriba de todo.

**Advertencia sobre el punto 5:** el snippet actual lleva `# ejemplo ilustrativo` a propósito. Si se saca ese comentario, el endpoint tiene que ser real — un desarrollador lo va a copiar en la primera llamada.

**Advertencia sobre la línea de marcos regulatorios:** "Trabajamos con requerimientos de CNV, UIF, BCRA y CNBV" es ambiguo y un oficial de cumplimiento lo detecta. O se dice algo concreto o se saca la línea.

---

## QA pendiente — nada de esto se verificó todavía

- [ ] **Mobile 390px y tablet 768px.** No se revisó ni una sola pantalla chica en toda la iteración. Riesgo alto en: el pin de Arquitectura y el índice sticky de Servicios (los dos tienen que desactivarse), y el H1 del hero (no puede recortarse ni acortarse).
- [ ] **`prefers-reduced-motion: reduce`.** Especificado en todas las secciones, verificado en ninguna. Tiene que desactivar parallax, pin, scrub, cursor custom, marquee, mesh animado y count-up.
- [ ] **Contraste WCAG AA en toda la página.** Se encontraron dos fallas graves revisando solo dos secciones (labels de arquitectura a 2.35:1 y 2.11:1 sobre metal; párrafos con degradé). Auditar el resto.
- [ ] **Core Web Vitals.** LCP < 2.5s, CLS < 0.1, INP < 200ms. Los PNG de las capas pesan >1 MB cada uno sin optimizar. El video del hero ya está en 110 KB.
- [ ] **Secciones nunca revisadas a resolución completa:** Casos de uso, CTA final, Footer.
- [ ] **Foco visible** en todos los interactivos, navegación completa por teclado (incluido el accordion de FAQ y el índice de servicios, que son `<button>`).
- [ ] **Sin errores de consola.**

---

## Assets finales

| Archivo | Uso | Estado |
|---|---|---|
| `DF-hero-monolito.png` | Hero (poster del video) | ✅ |
| `V1-loop.mp4` / `.webm` / `V1-poster.jpg` | Fondo del hero, loop 3.6s, 110 KB | ✅ Ya corregido: el original de Seedance variaba el brillo un 122% y tenía un corte visible |
| `DF-servicio-01-tokenizacion.png` | Servicio 01 | ✅ |
| `DF-servicio-02-wallets.png` | Servicio 02 | ✅ |
| `DAppsFactory-capa-a/b/c.png` | Arquitectura, 3 capas con alfa | ✅ Recortadas y alineadas |
| Logo oficial PNG | Nav y footer | ⛔ Falta |
| Logos de clientes | Marquee | ⛔ Falta |

Descartado: la versión de "wallets" con canal dorado (fuera de paleta y silueta en Y que se leía como logo). No usar.
