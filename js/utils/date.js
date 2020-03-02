// Give date from current day (0 = today)
export function getDate(fromCurrentDay = 0) {
    const date = new Date(new Date().setDate(new Date().getDate()+fromCurrentDay));
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const month = "0" + (date.getMonth() + 1);
    const year = date.getFullYear();
    return year + "-" + month + "-" + day;
}

export function getNameofDay(fromCurrentDay = 0) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date(new Date().setDate(new Date().getDate()+fromCurrentDay));
    const day = date.getDay();
    for (let i=0; days.length; i++) {
        if (i === day) {
            return days[i];
        }
    }
}