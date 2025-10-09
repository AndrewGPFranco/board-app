export function parseDateBR(str: string | Date): Date | null {
    if (typeof str === "string") {
        const match = str.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
        if (match) {
            const dia = parseInt(match[1], 10);
            const mes = parseInt(match[2], 10) - 1;
            const ano = parseInt(match[3], 10);
            const date = new Date(ano, mes, dia);

            if (date.getFullYear() === ano && date.getMonth() === mes && date.getDate() === dia) {
                return date;
            }
        }
        return null;
    }

    return str as Date;
}