export function addElementWithText(element, newElement, text) {
    if (text === undefined) {
        return element.appendChild(createElement(newElement));
    } else {
        return element.appendChild(createElement(newElement)).appendChild(addText(text));
    }
}

export function deleteElement(parent, child, number = 1) {
    const elements = Array.from(parent.children).filter(function (node) {
        return node.nodeName.toLowerCase() === child;
    });
    const element = elements[number -1];
    return parent.removeChild(element);
}

function createElement(element) {
    return document.createElement(element);
}

function addText(text) {
    return document.createTextNode(text);
}