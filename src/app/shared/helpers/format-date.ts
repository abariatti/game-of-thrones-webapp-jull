
// api needs YYYY-MM-DDT00:00:00 as a date format
export function formatDate(date: Date) {
    return "" + date.getFullYear() + "-" + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + 'T00:00:00';
}