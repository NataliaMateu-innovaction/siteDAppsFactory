# PROMPT MAESTRO — DAppsFactory · Homepage

> **Cómo usarlo:** abrí `claude.ai/design`, pegá TODO el bloque de abajo (desde "Construí una homepage…" hasta el final), adjuntá el video y las imágenes en el orden indicado, y generá. Iterá sección por sección si algo no sale perfecto al primer intento.
>
> **Antes de pegar:** reemplazá los `[DATO]` de la sección 08 y la lista de logos de la sección 03. No dejes los corchetes puestos.

---

Construí una **homepage responsive, mobile-first y production-quality** para **DAppsFactory**, empresa de infraestructura blockchain B2B que trabaja con bancos, financieras y desarrolladoras en LatAm, Estados Unidos y Europa. Público hispanohablante, registro rioplatense (voseo). Objetivo único de la página: **que un decisor técnico o de negocio agende una llamada de 30 minutos con un especialista.**

El sitio tiene que percibirse como una empresa internacional de infraestructura financiera. **No** puede parecer una agencia de desarrollo, una startup crypto-gamer, ni una plantilla SaaS de cards.

## STACK

- React + TypeScript + Vite + Tailwind CSS
- Iconos: `lucide-react`
- Animación: **Framer Motion** para reveals, entradas y micro-interacciones + **GSAP con ScrollTrigger** para las secciones pinned y las líneas que se dibujan con el scroll
- Smooth scroll con inercia: **Lenis**
- Video de fondo con `<video autoplay muted loop playsinline preload="metadata" poster>`
- Navegación por anchors con `scroll-behavior` manejado por Lenis

## SISTEMA DE MARCA

**Importante: NO uses la tipografía del logo en ninguna parte del sitio.** Del logo se toman únicamente los colores y el degradé.

### Tokens de color

```css
:root {
  /* fondos */
  --bg-dark:        #060607;
  --surface-dark:   #101014;
  --bg-light:       #F5F3EF;   /* blanco cálido */
  --surface-light:  #EBE8E2;

  /* texto */
  --text-on-dark:   #FAFAF8;
  --muted-on-dark:  #8A8A94;
  --text-on-light:  #0B0B0D;
  --muted-on-light: #5A5A63;

  /* marca */
  --brand-indigo:   #231F96;   /* índigo del wordmark */
  --accent-solid:   #5277F7;   /* azul del degradé, para focus rings y fallbacks */

  /* degradé oficial del logo */
  --brand-gradient: linear-gradient(
    90deg,
    #B4F759 0%,
    #01C7C5 28%,
    #3296E3 55%,
    #7973F6 80%,
    #8E71F5 100%
  );

  /* bordes */
  --hairline-dark:  rgba(255,255,255,0.10);
  --hairline-light: rgba(11,11,13,0.10);
}
```

**Regla de uso del degradé:** aparece en líneas de conexión, bordes de 1px, canales de luz, el botón primario, las cifras de la sección de métricas y el fondo de la sección CTA final. **Nunca** como fondo general ni relleno de párrafos largos. Los titulares van en color sólido, no en degradé (excepto una sola palabra del CTA final, si aporta).

### Tipografía

Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

```css
--font-display: 'Inter Tight', -apple-system, BlinkMacSystemFont, sans-serif;
--font-body:    'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

Escala (usá `clamp`, nada de tamaños fijos):

| Rol | Fuente | Tamaño | Line-height | Letter-spacing | Peso |
|---|---|---|---|---|---|
| H1 hero | display | `clamp(2.6rem, 6.2vw, 5.5rem)` | `0.98` | `-0.035em` | 700 |
| H2 sección | display | `clamp(2rem, 4.4vw, 3.5rem)` | `1.04` | `-0.03em` | 700 |
| H3 bloque | display | `clamp(1.25rem, 2vw, 1.6rem)` | `1.2` | `-0.02em` | 600 |
| Cuerpo | body | `clamp(1rem, 1.15vw, 1.125rem)` | `1.62` | `0` | 400 |
| Eyebrow | body | `0.75rem` | `1` | `0.18em` | 500, uppercase |
| Número de índice (01/02/03) | display | `clamp(3rem, 7vw, 7rem)` | `1` | `-0.04em` | 700 |

### Grid y espaciado

- Contenedor máximo **1280px**, centrado, padding lateral `clamp(20px, 5vw, 40px)`
- Grid de **12 columnas**, gutter 24px
- Padding vertical de sección: `clamp(96px, 12vw, 180px)`
- Mucho espacio en blanco. El aire es parte del diseño, no un descuido.

### Detalles de superficie

- **Grano global:** capa de noise SVG a `opacity: 0.04` sobre toda la página, `pointer-events: none`, `position: fixed`, `mix-blend-mode: overlay`
- **Glass** (solo nav): `background: rgba(6,6,7,0.55)`, `backdrop-filter: blur(16px)`, borde inferior 1px `var(--hairline-dark)`
- **Hairlines:** todas las divisiones son de 1px con los tokens de arriba, nunca sombras

---

## ASSETS ADJUNTOS

Los adjunto en este orden exacto:

| Archivo | Dónde va |
|---|---|
| **Video 1** | Fondo del hero (sección 02), a pantalla completa |
| **Imagen 1** | `poster` del Video 1 — mismo encuadre del monolito |
| **Imagen 2** | Servicio 01 · Tokenización (sección 04) |
| **Imagen 3** | Servicio 02 · Wallets (sección 04) |
| **Imagen 4** | Capa superior "Tu negocio" — PNG transparente (sección 06) |
| **Imagen 5** | Capa media "DAppsFactory" — PNG transparente (sección 06) |
| **Imagen 6** | Capa inferior "Redes" — PNG transparente (sección 06) |
| **Imagen 7** | Logo DAppsFactory en blanco — nav y footer sobre fondo oscuro |
| **Imagen 8** | Logo DAppsFactory full color — usar solo si hace falta versión sobre claro |

Las imágenes 4, 5 y 6 están fotografiadas con cámara y escala idénticas: **alinealas centradas y superpuestas**, se separan con el scroll.

---

## ORDEN DE SECCIONES

1. Preloader · 2. Nav fija · 3. Hero · 4. Franja de confianza · 5. *(corte diagonal)* · 6. Servicios · 7. De la idea a producción · 8. Arquitectura · 9. Casos de uso · 10. Métricas y clientes · 11. Seguridad y cumplimiento · 12. FAQ · 13. CTA final · 14. Footer

---

# DETALLE POR SECCIÓN

## 01) PRELOADER

**Layout:** overlay full-screen `var(--bg-dark)`, `z-index: 100`. Centrado: el isotipo del logo (el anillo circular) en SVG a 64px, con el trazo dibujándose.

**Animación:** el trazo del anillo se dibuja de 0 a 100% con `stroke-dashoffset` en 700ms `ease-out`, con el `stroke` pintado con `var(--brand-gradient)`. Al completar, el overlay entero sube y sale (`y: -100%`) en 500ms con easing `[0.76, 0, 0.24, 1]`, revelando el hero. Duración total máxima **900ms**.

**Regla:** guardá una flag en `sessionStorage`; si el usuario ya lo vio en esta sesión, no lo vuelvas a mostrar.

**Responsive:** idéntico. **Reduced-motion:** no se muestra el preloader.

---

## 02) NAV FIJA

**Layout:** `position: fixed`, ancho completo, contenido a 1280px centrado, `py-5`, flex `justify-between items-center`, `z-index: 50`.

- **Izquierda:** Imagen 7 (logo blanco), altura 28px
- **Centro (desktop, `hidden md:flex`):** `Soluciones` · `Cómo trabajamos` · `Casos` · `Seguridad` — links a anchors, `text-sm`, `font-medium`, color `var(--muted-on-dark)`, hover a `var(--text-on-dark)` en 200ms
- **Derecha (desktop):** botón `Agendar 30 min` — `rounded-full`, `px-5 py-2.5`, `text-sm font-semibold`, fondo `var(--brand-gradient)`, texto `#060607`
- **Mobile:** ícono hamburguesa (`Menu` / `X` de lucide-react) que abre un panel deslizante desde la derecha

**Animación:**

- Al pasar 80px de scroll, la nav aplica el estilo glass y reduce su `py` de 20px a 12px, transición 300ms
- El botón CTA es **magnético**: se desplaza hasta 6px hacia el cursor cuando está a menos de 80px, con retorno elástico
- **Panel mobile:** backdrop `rgba(6,6,7,0.6)` con `blur(8px)`; el panel entra desde `x: '100%'` a `x: 0` en 450ms con easing `[0.22, 1, 0.36, 1]`, ancho `min(88vw, 360px)`, alto `100dvh`, fondo `var(--surface-dark)`. Los links entran con stagger `0.16 + i * 0.06`. Usá `AnimatePresence`.

**Responsive:** los links centrales desaparecen bajo `md`. **Reduced-motion:** sin efecto magnético, el panel aparece con fade.

---

## 03) HERO

**Layout:** `relative w-full min-h-[100svh]`, fondo `var(--bg-dark)`. Video 1 en `absolute inset-0 w-full h-full object-cover`, con `poster` = Imagen 1. Encima, un overlay: `linear-gradient(90deg, rgba(6,6,7,0.92) 0%, rgba(6,6,7,0.75) 40%, rgba(6,6,7,0.25) 100%)` — más denso a la izquierda, para que el texto tenga contraste AA sobre el video y el monolito quede visible a la derecha.

Bloque de contenido: alineado a la izquierda, `max-width: 620px`, dentro del contenedor de 1280px, centrado verticalmente.

**Copy exacto:**

- **Eyebrow:** `BLOCKCHAIN INFRASTRUCTURE` — color `var(--muted-on-dark)`, con un punto de 6px a la izquierda pintado con el degradé
- **H1:** `Blockchain que ya opera dentro del sistema financiero regulado.`
- **Subheadline:** `Tokenización de activos, wallets fiat + cripto y desarrollo blockchain para bancos, financieras y desarrolladoras. Construimos la capa que conecta tu operación con la red — incluido el cumplimiento.`
- **CTA primario (botón):** `Agendar 30 min con un especialista` + ícono `ArrowUpRight` de lucide-react a la derecha
- **CTA secundario (link con subrayado animado):** `Ver soluciones` + ícono `ArrowDown`

**Botón primario — spec:** fondo `var(--brand-gradient)`, texto `#060607`, `font-semibold`, `rounded-full`, `padding: 16px 28px`, `box-shadow: 0 8px 32px rgba(82,119,247,0.25)`. Hover: `scale(1.03)` + `brightness(1.08)`. Active: `scale(0.97)`. Magnético igual que el de la nav.

**Animación:**

1. El **H1 se revela por líneas con máscara**: cada línea vive en un contenedor con `overflow: hidden` y sube desde `y: 100%` a `y: 0`, duración 0.8s, easing `[0.22, 1, 0.36, 1]`, stagger 0.09s entre líneas.
2. El eyebrow entra antes, con fade + `y: 12px`, 0.5s, delay 0.
3. Subheadline: fade + `y: 24px`, 0.6s, delay 0.45s.
4. Grupo de CTAs: fade + `y: 24px`, 0.6s, delay 0.60s.
5. **Parallax de salida:** al scrollear, el video se desplaza a `0.4x` de la velocidad del scroll y pierde opacidad hasta 0.5; el bloque de texto se mueve a `1x` y hace fade a 0 al 80% de la altura del hero. Usá `useScroll` + `useTransform` de Framer Motion.

**Responsive:**

- `≤768px`: el H1 baja a `clamp(2.2rem, 9vw, 3rem)` pero **no se recorta ni se acorta el texto**. El overlay pasa a vertical (`180deg`, más denso abajo) para que el monolito se vea arriba y el texto abajo tenga contraste. CTAs a ancho completo, apilados con gap 12px.
- `≤390px`: padding lateral 20px, el CTA secundario pasa a texto simple sin ícono.
- El video se carga con `preload="metadata"` y solo bajo `md` se reemplaza directamente por el `poster` si `navigator.connection.saveData` está activo.

**Reduced-motion:** el video se pausa en el poster, el H1 entra con fade simple de 150ms, sin parallax.

---

## 04) FRANJA DE CONFIANZA

**Layout:** franja sobre `var(--bg-dark)`, `py-16`, separada del hero por un hairline superior.

**Copy:**

> Operamos con bancos, financieras y desarrolladoras en Argentina, México, Estados Unidos y Europa.

Texto centrado, `text-sm`, `var(--muted-on-dark)`, `max-width: 520px`.

Debajo: marquee de logos de clientes. `[REEMPLAZAR: lista de logos autorizados]`

**Animación:** marquee infinito horizontal, 40s por vuelta, `translateX` puro. Pausa al hover. Máscara de fade de 120px en ambos extremos con `mask-image: linear-gradient(90deg, transparent, black 12%, black 88%, transparent)`. Los logos van en escala de grises a `opacity: 0.55`, y al hover pasan a color y `opacity: 1` en 250ms.

**Responsive:** en mobile el marquee sigue igual pero a 28s. **Reduced-motion:** el marquee se detiene y los logos se muestran en grid estático de 3 columnas.

---

## 05) CORTE DIAGONAL — transición

La sección 06 (clara) entra por encima de la oscura con un corte arquitectónico:

```css
clip-path: polygon(0 var(--cut), 100% 0, 100% 100%, 0 100%);
```

**Animación:** `--cut` va de `72px` a `0px` ligado al progreso del scroll en los primeros 400px de la sección, con GSAP ScrollTrigger `scrub: 0.6`. El resultado: el corte diagonal se "cierra" a horizontal mientras entrás. Sobre el borde del corte, una línea de 1px pintada con `var(--brand-gradient)` que se dibuja de izquierda a derecha (`scaleX` 0→1) en el mismo scrub.

**Reduced-motion:** corte fijo en 0, línea visible estática.

---

## 06) SERVICIOS

**Layout:** fondo `var(--bg-light)`, texto `var(--text-on-light)`. **Composición editorial asimétrica — prohibido resolverlo con tres cards iguales.** Grid de 12 columnas:

- **Encabezado de sección** (col 1–7): eyebrow `QUÉ CONSTRUIMOS`, H2 `Tres capas. Un mismo sistema.`, bajada `Se contratan por separado. Funcionan mejor juntas.`
- **Bloque 01** — imagen a la izquierda (col 1–5, Imagen 2), texto a la derecha (col 7–11)
- **Bloque 02** — texto a la izquierda (col 2–6), imagen a la derecha (col 8–12, Imagen 3)
- **Bloque 03** — **sin imagen.** El número `03` gigante ocupa col 1–4, el texto col 6–10, y el espacio de la col 11–12 queda vacío a propósito

Cada bloque separado por `clamp(80px, 10vw, 140px)` verticales.

**Copy exacto:**

**01 — Tokenización de activos**
> Convertimos un activo real —un inmueble, una cartera de créditos, un fondo— en un instrumento digital que se emite, se transfiere y se liquida on-chain. Con la estructura legal y el registro que tu regulador espera ver.

**02 — Wallets Fiat + Cripto**
> Una sola billetera donde conviven pesos, dólares y stablecoins. Onboarding con KYC, cuentas, transferencias y conversión — bajo tu marca y tus reglas de negocio.

**03 — Desarrollo Blockchain**
> Smart contracts auditados, integración con tu core y APIs que tu equipo puede mantener. Sin dependencia eterna del proveedor.

Cada número (`01`, `02`, `03`) va con la escala de "Número de índice" y relleno `var(--brand-gradient)` vía `background-clip: text`.

**Animación:**

1. Cada bloque entra con fade + `y: 32px`, 0.7s, easing `[0.22, 1, 0.36, 1]`, `whileInView` con `once: true` y `margin: "-15%"`. Dentro de cada bloque, stagger de 0.10s entre número → título → párrafo.
2. **Líneas técnicas de conexión:** un SVG absoluto detrás de los tres bloques dibuja una polilínea de 1px que baja desde el bloque 01, cruza al 02 y termina en el 03, con esquinas rectas a 90° (nada de curvas orgánicas). Se dibuja con `stroke-dashoffset` ligado al scroll (GSAP ScrollTrigger, `scrub: 1`) y el `stroke` es `var(--brand-gradient)`. En los puntos donde la línea toca cada bloque, un nodo circular de 7px que hace un pulso de escala 1→1.35→1 al llegar la línea.
3. Las Imágenes 2 y 3 hacen parallax vertical suave a `0.88x` del scroll.

**Responsive:**

- `≤768px`: los bloques pasan a una columna, imagen arriba y texto abajo, alternando el alineado del número. La polilínea SVG se reemplaza por una **línea vertical simple** de 1px con degradé que recorre los tres bloques por la izquierda. Sin parallax.
- `≤390px`: número reducido a `3rem`, imágenes a ancho completo.

**Reduced-motion:** reveals a fade de 150ms; la línea aparece dibujada al 100% sin animar.

---

## 07) DE LA IDEA A PRODUCCIÓN

**Layout:** fondo `var(--surface-dark)`, texto claro. Encabezado a la izquierda (col 1–6), los cuatro pasos en una columna a la derecha (col 7–12), separados por hairlines.

**Copy exacto:**

- **Eyebrow:** `CÓMO TRABAJAMOS`
- **H2:** `El piloto funciona. Producción es otra cosa.`
- **Bajada:** `Los proyectos blockchain casi nunca mueren en la parte técnica. Mueren cuando hay que conectarlos al core, pasar auditoría, resolver custodia y sostenerlos 24/7 con plata adentro.`

| | Título | Texto |
|---|---|---|
| **01** | Diagnóstico y arquitectura | Definimos qué se tokeniza, sobre qué red, con qué modelo de custodia y bajo qué marco. Sale un documento, no un pitch. |
| **02** | Prueba de concepto acotada | Un alcance chico y medible, en semanas. Si no cierra, se corta acá y sabés por qué. |
| **03** | Integración y auditoría | Conexión con tu core, auditoría externa de contratos y pruebas de carga antes de tocar producción. |
| **04** | Producción y operación | Salida a producción, monitoreo y soporte. Con documentación para que tu equipo lo opere. |

**Animación:** una **línea vertical de 1px** corre por el borde izquierdo de la columna de pasos, pintada con `var(--brand-gradient)`, y se dibuja de arriba a abajo con `scaleY` ligado al scroll (`scrub: 0.8`). Cada paso arranca a `opacity: 0.35` y pasa a `1` cuando la línea llega a su altura, en 350ms. El número del paso hace un pulso sutil de escala al encenderse. El encabezado de la izquierda queda `position: sticky; top: 25vh` mientras la columna de pasos avanza.

**Responsive:** `≤768px` el sticky se desactiva, todo pasa a una columna, la línea queda a la izquierda del bloque completo. **Reduced-motion:** todos los pasos en `opacity: 1`, línea estática, sin sticky.

---

## 08) ARQUITECTURA — *centerpiece de la página*

**Layout:** fondo `var(--bg-light)`. Sección **pinned** con GSAP ScrollTrigger: se fija durante `+150%` de la altura del viewport mientras el contenido interno avanza, y se despinea al terminar.

Dos columnas: texto a la izquierda (col 1–5), el diagrama a la derecha (col 6–12).

**Copy exacto:**

- **Eyebrow:** `INTEGRACIÓN`
- **H2:** `Se integra a lo que ya tenés.`
- **Bajada:** `No reemplazamos tu core ni tu stack. Nos ubicamos como una capa entre tu operación y la red, con APIs REST, webhooks y SDKs.`

Labels de cada capa (aparecen al lado de su capa correspondiente cuando se separa):

| Capa | Label | Detalle |
|---|---|---|
| Superior (Imagen 4) | `Tu negocio` | Core bancario · ERP · CRM · app |
| Media (Imagen 5) | `Capa DAppsFactory` | APIs · orquestación · custodia · KYC/AML · reporting |
| Inferior (Imagen 6) | `Redes` | Ethereum · Polygon · Base · redes permisionadas |

**Animación (el momento clave del sitio):**

- Estado inicial: las Imágenes 4, 5 y 6 están **superpuestas y centradas**, alineadas píxel a píxel, formando un solo bloque compacto.
- A medida que avanza el scroll dentro de la sección pinned, las tres capas se **separan verticalmente en perspectiva**: la Imagen 4 sube `-140px` y la Imagen 6 baja `+140px`, la Imagen 5 se queda quieta. Al mismo tiempo el conjunto rota de `rotateX(0deg)` a `rotateX(18deg)` con `perspective: 1200px`, para que se lea como un diagrama explotado isométrico.
- Cuando cada capa alcanza su posición final, entra su **label** desde la derecha con fade + `x: 20px` en 400ms, y se dibuja un hairline horizontal de 1px que conecta la capa con su label.
- Entre las capas, dos líneas verticales de 1px con `var(--brand-gradient)` se dibujan de arriba a abajo indicando el flujo.
- Todo ligado al progreso del scroll con `scrub: 0.8`. Nada se mueve por sí solo.

**Responsive:**

- `≤1024px`: se elimina el pin. Las tres capas se muestran **apiladas verticalmente ya separadas**, cada una con su label debajo, y cada bloque entra con reveal + fade al llegar al viewport, stagger 0.12s. El `rotateX` baja a 8°.
- `≤390px`: `rotateX(0)`, capas a ancho completo, labels centrados.

**Reduced-motion:** estado final estático (capas separadas, labels visibles), sin pin ni scrub.

---

## 09) CASOS DE USO

**Layout:** fondo `var(--bg-dark)`. Encabezado centrado, y debajo cuatro filas horizontales separadas por hairlines — **no cards**. Cada fila: número de índice a la izquierda (col 1–2), título (col 3–6), descripción (col 7–11), ícono `ArrowUpRight` a la derecha (col 12).

**Copy exacto:**

- **Eyebrow:** `DÓNDE SE APLICA`
- **H2:** `Cuatro problemas que resolvemos.`

| | Título | Descripción |
|---|---|---|
| 01 | Real estate tokenizado | Fraccionar un desarrollo inmobiliario en participaciones digitales, con registro de titularidad y distribución automática de rentas. |
| 02 | Cartera de créditos on-chain | Llevar originación y cesión de cartera a un registro compartido y auditable entre entidades. |
| 03 | Billetera fiat + cripto de marca | Producto propio con cuentas, conversión y stablecoins, sin construir el back-end desde cero. |
| 04 | Liquidación entre entidades | Settlement en minutos en lugar de días, con trazabilidad completa por operación. |

**Animación:** cada fila entra con fade + `y: 24px`, stagger 0.08s. Al hover en desktop: el fondo de la fila pasa a `rgba(255,255,255,0.03)` en 250ms, el título se desplaza `x: 8px`, la flecha se desplaza `x: 6px, y: -6px`, y un hairline de 1px con `var(--brand-gradient)` se dibuja de izquierda a derecha en el borde inferior de la fila (`scaleX` 0→1, 350ms).

**Responsive:** `≤768px` cada fila pasa a bloque de dos líneas (número + título arriba, descripción abajo), sin flecha. Sin hover. **Reduced-motion:** fade simple, sin desplazamientos.

---

## 10) MÉTRICAS Y CLIENTES

**Layout:** fondo `var(--bg-light)`. H2 a la izquierda, cuatro métricas en grid de 4 columnas debajo, y una fila de logos al final.

**Copy:**

- **H2:** `Los números que sí podemos mostrar.`
- Métricas: `[DATO] años operando` · `[DATO] integraciones en producción` · `[DATO] países` · `[DATO] volumen procesado`

> **REEMPLAZAR antes de generar.** No dejes los corchetes ni inventes cifras.

**Animación:** las cifras cuentan de 0 a su valor en 1.4s con easing `easeOutExpo` al entrar en viewport, una sola vez, con stagger de 0.12s entre métricas. La cifra va con relleno `var(--brand-gradient)` vía `background-clip: text`; el label debajo en `var(--muted-on-light)`, `text-sm`. Los logos entran con fade + `y: 16px`, stagger 0.06s.

**Responsive:** `≤768px` grid de 2 columnas; `≤390px` una columna. **Reduced-motion:** la cifra se muestra directamente en su valor final, sin conteo.

---

## 11) SEGURIDAD Y CUMPLIMIENTO

**Layout:** fondo `var(--surface-dark)`. Encabezado a la izquierda (col 1–5, `sticky top-[25vh]`), lista de cinco ítems a la derecha (col 7–12), separados por hairlines. **Sin animación llamativa: acá el usuario está leyendo, no mirando.**

**Copy exacto:**

- **Eyebrow:** `LO QUE REVISA TU ÁREA DE RIESGO`
- **H2:** `Escrito para pasar el comité, no solo la demo.`

| Título | Texto |
|---|---|
| Auditoría de contratos | Revisión externa antes de cada salida a producción. |
| Custodia | Modelos self-custody, MPC o custodio regulado, según lo que tu operación necesite. |
| KYC / AML | Onboarding, screening y monitoreo integrados al flujo, no pegados encima. |
| Trazabilidad | Registro completo por operación, exportable para auditoría interna y externa. |
| Marcos regulatorios | Trabajamos con requerimientos de CNV, UIF, BCRA y CNBV según jurisdicción. |

Cada ítem lleva un ícono de `lucide-react` a 20px en `var(--muted-on-dark)`: `ShieldCheck`, `KeyRound`, `UserCheck`, `FileSearch`, `Scale`.

**Animación:** reveal fade + `y: 20px`, stagger 0.07s. Nada más.

**Responsive:** `≤768px` una columna, sin sticky.

---

## 12) FAQ

**Layout:** fondo `var(--bg-light)`. H2 centrado, accordion de ancho `max-width: 860px` centrado. Cada ítem con hairline inferior, `py-6`, pregunta en H3 y un ícono `Plus` a la derecha.

**Copy exacto:**

- **H2:** `Preguntas que nos hacen antes de firmar.`

1. **¿Cuánto tarda un proyecto en llegar a producción?** — Depende del alcance y de tu core. Una wallet de marca sobre nuestra infraestructura arranca en meses; una tokenización con estructura legal nueva depende más del regulador que de nosotros. En la primera llamada te damos un rango, no una promesa.
2. **¿Sobre qué red trabajan?** — La que corresponda al caso. No arrancamos con la red elegida: arrancamos con el requerimiento y de ahí sale la red.
3. **¿Quién custodia los activos?** — Vos, un custodio regulado o un esquema MPC. Lo definimos en la etapa de arquitectura y queda por escrito.
4. **¿Nos quedamos atados a ustedes?** — No. El código, la documentación y los accesos son tuyos. Si tu equipo quiere operarlo solo, lo dejamos preparado para eso.
5. **¿Para quién no son?** — Si buscás lanzar un token sin caso de uso ni marco legal, no somos el proveedor.

**Animación:** altura del panel animada en 350ms con easing `[0.22, 1, 0.36, 1]`; el ícono `Plus` rota 45° al abrir. Solo un ítem abierto por vez. Accesible: `<button>` real con `aria-expanded` y `aria-controls`.

**Responsive:** ancho completo bajo `md`. **Reduced-motion:** apertura instantánea sin animar altura.

---

## 13) CTA FINAL

**Layout:** fondo `var(--bg-dark)`, `min-height: 70vh`, contenido centrado, `max-width: 780px`.

Detrás del contenido: un **gradiente mesh animado** construido con tres radial-gradients desenfocados usando los colores del degradé de marca (`#01C7C5`, `#3296E3`, `#8E71F5`) a `opacity: 0.18`, con `filter: blur(90px)`, desplazándose muy lento en loop de 20s. Encima, la capa de grano.

**Copy exacto:**

- **H2:** `Contanos qué querés poner en producción.`
- **Bajada:** `30 minutos con alguien que ya construyó esto. Sin pitch de ventas.`
- **CTA:** `Agendar la llamada` — mismo botón primario del hero, magnético, con `box-shadow: 0 12px 48px rgba(82,119,247,0.30)`
- **Microcopy debajo:** `Si preferís escribir: [EMAIL] · LinkedIn`

**Animación:** contenido con reveal fade + `y: 28px`, stagger 0.12s. El mesh se mueve en loop continuo (`translate` y `scale` muy suaves, 20s, `ease-in-out`, `alternate`).

**Responsive:** el botón pasa a ancho completo bajo `sm`. **Reduced-motion:** el mesh queda estático en un frame.

---

## 14) FOOTER

**Layout:** fondo `var(--bg-dark)`, hairline superior, `py-16`. Cuatro columnas en desktop: logo + descripción corta (col 1–4), `Soluciones` (col 6–7), `Empresa` (col 8–9), `Contacto` (col 10–12). Barra inferior con copyright y links legales.

- Logo: Imagen 7, altura 28px
- Descripción: `Infraestructura blockchain para tokenización, wallets y productos financieros digitales.`
- Barra inferior: `© 2026 DAppsFactory · by innovAction` + `Política de privacidad` + `Términos`

**Animación:** reveal fade simple. Sobre la barra inferior, un hairline de 1px pintado con `var(--brand-gradient)` a `opacity: 0.4`.

---

# COMPONENTES REUTILIZABLES

Creá estos componentes y usalos en todo el sitio; no dupliques lógica:

- **`<Reveal>`** — wrapper con Framer Motion `whileInView`, props `delay` y `y` (default 24px), `viewport={{ once: true, margin: "-15%" }}`, duración 0.6s, easing `[0.22, 1, 0.36, 1]`. Lee `prefers-reduced-motion` y, si está activo, hace fade de 150ms sin desplazamiento.
- **`<Marquee>`** — fila en loop infinito por `translateX`, props `speed` y `pauseOnHover`, con máscara de fade en los extremos.
- **`<MagneticButton>`** — botón que se desplaza hasta `maxOffset` (default 6px) hacia el cursor dentro de un radio de 80px, con retorno con spring. Desactivado en touch y en reduced-motion.
- **`<CountUp>`** — cuenta de 0 al valor al entrar en viewport, props `value`, `suffix`, `duration`. Muestra el valor final directo en reduced-motion.
- **`<CustomCursor>`** — círculo de 14px que sigue al mouse con lerp 0.15; se agranda a 40px y baja opacidad sobre elementos interactivos. **Solo desktop con puntero fino** (`@media (pointer: fine)`), nunca en touch ni en reduced-motion.
- **`<VideoBg>`** — `<video>` con autoplay, muted, loop, playsInline, poster y `preload="metadata"`, con su overlay de gradiente configurable.
- **`<GrainOverlay>`** — capa fija de noise SVG a `opacity: 0.04`.
- **`<SectionEyebrow>`** — el eyebrow con el punto de degradé a la izquierda.

---

# RESPONSIVE

Breakpoints: `≤390px` (mobile chico) · `≤640px` · `≤768px` (tablet) · `≤1024px` · `≥1280px` (desktop). Verificá explícitamente en **1440px, 768px y 390px**.

Reglas transversales en mobile:

- Se desactivan: parallax, cursor custom, botones magnéticos, secciones pinned
- Las secciones pinned (08) se convierten en apiladas verticales con reveal
- El video del hero mantiene el loop pero con overlay vertical y, si `saveData` está activo, se reemplaza por el poster
- Todo pasa a una columna con `gap: clamp(32px, 8vw, 56px)`
- El H1 del hero **no se acorta ni se recorta nunca**
- Target táctil mínimo **44×44px** en todo elemento interactivo

---

# ACCESIBILIDAD Y PERFORMANCE

- **`prefers-reduced-motion: reduce`** implementado de verdad: se desactivan parallax, pin, scrub, cursor custom, marquee, mesh animado y count-up; los reveals pasan a fade de 150ms; el video se congela en el poster. Envolvelo en un hook `useReducedMotion` y respetalo en cada componente.
- **Contraste WCAG AA** en todo texto. Sobre el video del hero, el overlay tiene que garantizar mínimo 4.5:1 para el cuerpo y 3:1 para el H1 — verificalo, no lo asumas.
- **Focus visible** en todos los interactivos: outline de 2px en `var(--accent-solid)` con `offset: 3px`. Nunca `outline: none` sin reemplazo.
- HTML semántico: un solo `<h1>`, jerarquía correcta de headings, `<nav>`, `<main>`, `<section>` con `aria-labelledby`, `<footer>`.
- Navegación completa por teclado, incluido el panel mobile (con focus trap) y el accordion.
- Video: `preload="metadata"`, poster ligero, `loading="lazy"` en todas las imágenes salvo la del hero, `width` y `height` explícitos para evitar CLS.
- Animaciones **solo con `transform` y `opacity`**. Nada de animar `width`, `height`, `top` o `left`.
- Objetivos: LCP < 2.5s, CLS < 0.1, INP < 200ms.
- Sin errores de consola. Sin lorem ipsum. Sin emojis en el copy.

---

# RECAP DE COMPORTAMIENTO

Entrás y el anillo del logo se dibuja en negro durante menos de un segundo antes de subir como una cortina. Aparece el hero: un monolito de aluminio grafito con luz de colores corriendo por sus juntas, respirando en loop sobre un vacío negro. El titular sube línea por línea desde detrás de una máscara y el resto entra escalonado. Al scrollear, el video se queda atrás mientras el texto se va, y una diagonal blanca se cierra sobre el negro: entrás a la sección clara de servicios, donde una línea de 1px con el degradé de la marca se dibuja conectando los tres bloques mientras cada uno se revela, y el tercero rompe el patrón quedándose sin imagen. Volvés al oscuro para el proceso, donde una línea vertical va encendiendo los cuatro pasos a medida que la cruzás. Después llega el momento del sitio: la sección se fija, el monolito se separa en sus tres capas, rota en perspectiva y cada capa recibe su nombre por un hairline. Se despinea y seguís por los casos de uso, filas horizontales que se subrayan con el degradé al pasar el mouse. Las métricas cuentan de cero. Seguridad se lee tranquila, sin animación. La FAQ descalifica al que no corresponde. Y el cierre es un campo de color muy desaturado que se mueve lentísimo detrás de una sola frase y un botón que se acerca a tu cursor.

---

**Instrucción final para Claude Design:** implementá el sitio completo, ejecutable, sin errores de consola ni layouts rotos. Usá el copy exacto de este documento, sin reescribirlo. Si algo no entra en una sola pasada, priorizá en este orden: hero → servicios → arquitectura → resto.
