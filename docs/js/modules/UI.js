import { addElementWithText, deleteElement } from "../utils/addAndDeleteElement.js";
export function loading(state) {
    const article = document.querySelector("article"),
    p = document.querySelector("article > p");
    state ? addElementWithText(article, "p", "Loading...") : deleteElement(article, p);
}