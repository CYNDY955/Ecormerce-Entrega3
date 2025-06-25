export function formatPrice(value) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(value);
}

export function formatTimestampToInputDate(timeStamp) {
    const collator = new Intl.DateTimeFormat("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });
    return collator.format(timeStamp);
}
