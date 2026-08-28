---
titulo: "Cómo elegimos la red antes de escribir una línea de código"
bajada: "No arrancamos por la red. Arrancamos por el requerimiento regulatorio y por quién tiene que poder auditar qué. La red sale de ahí."
fecha: 2026-08-28
autor: "Equipo DAppsFactory"
tema: "Regulación"
borrador: true
---

> **Nota de plantilla.** Este archivo existe para mostrar la estructura y los estilos
> del blog. Está marcado como `borrador: true`, así que **no se publica**. Reemplazalo
> por notas reales o borralo.

La primera pregunta que nos hacen suele ser "¿sobre qué red trabajan?". Es la pregunta
equivocada para empezar, y contestarla rápido es la forma más segura de terminar
migrando en seis meses.

## Primero el requerimiento, después la red

Antes de mirar una sola red conviene cerrar tres cosas:

- **Quién tiene que poder auditar.** Si un regulador necesita leer el estado, una red
  permisionada cambia el análisis por completo.
- **Qué se liquida y en cuánto tiempo.** Settlement en minutos y settlement en el día
  no tienen los mismos requisitos.
- **Dónde queda la custodia.** Self-custody, MPC o custodio regulado. Se define acá y
  queda por escrito, no sobre la marcha.

## Recién ahí, la red

Con esas tres respuestas, la lista de redes candidatas suele bajar de veinte a dos. Y
la elección deja de ser una preferencia técnica para pasar a ser una consecuencia.

```bash
# ejemplo ilustrativo
curl -X POST https://api.ejemplo.com/v1/assets \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"tipo":"credito","red":"a-definir"}'
```

El endpoint de arriba es ilustrativo. Cuando publiquemos el real, va a estar
documentado y versionado.
