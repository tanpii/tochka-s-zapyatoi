export function formatDate(dateArray: string): string {
    const months: string[] = [
        "января", "февраля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ];

    const [year, month, day] = dateArray.split('-');

    const monthName = months[Number.parseInt(month) - 1];

    return `${day} ${monthName} ${year}`;
}

export default formatDate;