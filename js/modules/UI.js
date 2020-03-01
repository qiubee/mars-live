import { addElementWithText, deleteElement } from "../utils/element.js";
export function loading(state, element, loadingMessage = "Loading...") {
    state ? addElementWithText(element, "p", loadingMessage) : deleteElement(element, "p");
}