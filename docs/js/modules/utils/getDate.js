// Give date from current day (0 = today)
export function getDate(fromCurrentDay = 0) {
    const date = new Date(new Date().setDate(new Date().getDate()+fromCurrentDay));
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return year + "-" + month + "-" + day;
}