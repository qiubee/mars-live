// localStorage source: https://www.taniarascia.com/how-to-use-local-storage-with-javascript/

export function addToSessionStorage(name, content) {
    content = JSON.stringify(content);
    sessionStorage.setItem(name, content);
    console.log("Added", name, content);
}

export function checkInSessionStorage(name) {
    if (sessionStorage.getItem(name)) {
        return true;
    } else { return false; }
}

export function getFromSessionStorage(name) {
    if (sessionStorage.getItem(name)) {
        return JSON.parse(sessionStorage.getItem(name));
    }
}