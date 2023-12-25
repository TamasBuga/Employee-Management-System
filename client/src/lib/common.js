

/**
 * 
 * @param {string} string format string value
 */
export function formatTime(string) {
    const length = string.length;
    if (length < 1 || length > 2) return "";
    if (length === 1) {
        return "0" + string;
    } else {
        return string;
    }
}

export function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}


export function isEmpty(object) {
    return Object.keys(object).length === 0
}