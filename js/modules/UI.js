import { addElementWithText, deleteChildElements } from "../utils/element.js";
export function loading(state, element, loadingMessage = "Loading...") {
    state ? addElementWithText(element, "p", loadingMessage) : deleteChildElements(element, "p", element.lastElementChild);
}

export function hideWeatherCards(elements, day) {
    const nodes = Array.from(elements);
    const placeInList = nodes.map(function (node, i) {
        if (node.hash === `#${day}`) {
            return i;
        }
    }).filter(function (item) {
        return item !== undefined;
    })[0];

    nodes.map(function (node, i) {
        node.classList.toggle("in-active");
        if (i !== placeInList) {
            setTimeout(function () {
                node.classList.toggle("hide");
                setTimeout(function () {
                    node.classList.toggle("hide");
                    node.classList.toggle("hidden");
                }, 5000);
            }, 250 * i);
        } else {
            setTimeout(function () {
                node.classList.toggle("focus");
            }, 2500);
        }
    });
}