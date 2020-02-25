export function addElementWithText(element, newElement, text) {
    if (text === undefined) {
        return element.appendChild(createElement(newElement));
    } else {
        return element.appendChild(createElement(newElement)).appendChild(addText(text));
    }
}

export function deleteElement(parent, child) {
    const element = document.querySelector(parent.tagName.toLowerCase() + " " + child);
    return parent.removeChild(element);
}

function createElement(element) {
    return document.createElement(element);
}

function addText(text) {
    return document.createTextNode(text);
}