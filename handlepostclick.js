import { sanitizeHtml, delay } from "./helpers.js";
import { addCommentElement, addFormElement, nameInputElement, textAreaElement } from "./main.js";
import { postListElement } from "./api.js";
import { fetchAndCommentsRender } from "./fetchrender.js";

export const handlePostClick = () => {
    nameInputElement.classList.remove("error");
    textAreaElement.classList.remove("error");

    if (!nameInputElement.value || nameInputElement.value.trim().length === 0) {
        nameInputElement.classList.add("error");
        return;
    }

    else if (!textAreaElement.value || textAreaElement.value.trim().length === 0) {
        textAreaElement.classList.add("error");
        return;
    }

    addFormElement.style.display = "none";
    addCommentElement.textContent = "Комментарий добавляется...";
    addCommentElement.style.display = "block";

    postListElement({ name: sanitizeHtml(nameInputElement.value), text: sanitizeHtml(textAreaElement.value) })
        .then(() => {
            fetchAndCommentsRender();
            nameInputElement.value = "";
            textAreaElement.value = "";
        })
};

function showAddForm() {
    addFormElement.style.display = "flex";
    addCommentElement.style.display = "none";
}