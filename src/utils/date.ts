// Fechas de las notas. Las pubDate vienen como YYYY-MM-DD (UTC): se formatean
// en UTC para que no se corran un día en Argentina.
const CORTOS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const LARGOS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

export const fechaCorta = (d: Date) => `${d.getUTCDate()} ${CORTOS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
export const fechaLarga = (d: Date) => `${d.getUTCDate()} de ${LARGOS[d.getUTCMonth()]} de ${d.getUTCFullYear()}`;
