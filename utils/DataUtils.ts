export function parseDateFromStringToDateBR(str: string | Date): Date | null {
    if (typeof str === "string") {
        const match = str.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
        if (match) {
            const dia: number = parseInt(match[1], 10);
            const mes: number = parseInt(match[2], 10) - 1;
            const ano: number = parseInt(match[3], 10);
            const date: Date = new Date(ano, mes, dia);

            if (date.getFullYear() === ano && date.getMonth() === mes && date.getDate() === dia) {
                return date;
            }
        }
        return null;
    }

    return str as Date;
}

export function parseDateFromDateToStringBR(data: Date | string): string {
    if (!data) return "-";

    let dateObj: Date;

    if (typeof data === "string") {
        if (data.includes("T"))
            dateObj = new Date(data);
        else {
            const [ano, mes, dia] = data.split("-");
            dateObj = new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia));
        }
    } else
        dateObj = data;

    const dia: string = dateObj.getDate().toString().padStart(2, "0");
    const mes: string = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const ano: number = dateObj.getFullYear();

    return `${dia}/${mes}/${ano}`;
}
