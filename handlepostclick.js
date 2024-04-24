import { postComment } from "./postcomment.js";
import { isAuthenticated } from "./main.js";

export const handlePostClick = () => {

    const nameInputElement = document.getElementById("name-input");
    const textAreaElement = document.getElementById("text-input");
    const addFormElement = document.querySelector(".add-form");
    const addCommentElement = document.getElementById("add-comment");


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

    postComment(textAreaElement.value, nameInputElement.value, isAuthenticated)

        .catch((error) => {

            if (error.message === "Сервер упал") {
                handlePostClick();
            }

            else if (error.message === "Ошибочный запрос") {
                alert("Имя и комментарий должны быть не короче 3 символов");
                showAddForm();
                return;
            }

            else {
                alert("Кажется, у вас сломался интернет, попробуйте позже");
                showAddForm();
            }
        });

};

const showAddForm = () => {

    const addFormElement = document.querySelector(".add-form");
    const addCommentElement = document.getElementById("add-comment");
    addFormElement.style.display = "flex";
    addCommentElement.style.display = "none";
}