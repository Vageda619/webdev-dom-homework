import { postListElement } from "./api.js";
import { fetchAndCommentsRender } from "./fetchrender.js";
import {commentsData, nameInputElement} from "./main.js";
import {textAreaElement} from "./main.js";

export const postComment = () => {
    return postListElement({ name: nameInputElement.value, text: textAreaElement.value })
        .then(() => {
            fetchAndCommentsRender(commentsData);
            nameInputElement.value = "";
            textAreaElement.value = "";
        })
        .catch((error) => {
            if (error.message === "Сервер упал") {
                alert("Сервер временно недоступен. Пожалуйста, попробуйте позже.");
            } else if (error.message === "Ошибочный запрос") {
                alert("Имя и комментарий должны быть не короче 3 символов.");
            } else {
                alert("Кажется, у вас сломался интернет, попробуйте позже");
            }
        });
};