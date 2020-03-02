import { addElementWithText, deleteChildElements, deleteElement } from "../utils/element.js";
export function loading(state, element, loadingMessage = "Loading...") {
    state ? addElementWithText(element, "p", loadingMessage) : deleteChildElements(element, "p", element.lastElementChild);
}

export async function hideWeatherCards(elements, day) {
    const nodes = Array.from(elements);
    const placeInList = nodes.map(function (node, i) {
        if (node.hash === `#${day}`) {
            return i;
        }
    }).filter(function (item) {
        return item !== undefined;
    })[0];

    return new Promise(function (res, rej) {
        nodes.map(function (node, i) {
            node.classList.toggle("in-active");
            if (i !== placeInList) {
                setTimeout(function () {
                    node.classList.toggle("hide");
                    setTimeout(function () {
                        node.classList.toggle("hide");
                    }, 2000);
                    setTimeout(function () {
                        deleteElement(node);
                    }, 2000);
                }, 150 * i);
            } else {
                setTimeout(function () {
                    node.classList.toggle("focus");
                    res();
                }, 3000);
            }
        });
    });
}