import { addElementWithText, deleteElement } from "../utils/element.js";
export function loading(state, element) {
    state ? addElementWithText(element, "p", "Loading...") : deleteElement(element, "p");
}