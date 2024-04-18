import { sanitizeHtml } from "./helpers.js";

export function getListElements() {
    const loadingElement = document.querySelector(".loading");
    return fetch("https://wedev-api.sky.pro/api/v1/artyom-vagin/comments", {
        method: "GET"
    })
        .then((response) => {
            loadingElement.style.display = "none";
            if (response.status === 500) {
                throw new Error("Сервер упал");
            }
            return response.json();
        })
        .catch((error) => {
            console.error("Ошибка при загрузке комментариев:", error);
        });
}

export function postListElement({ name, text }) {
    return fetch("https://wedev-api.sky.pro/api/v1/artyom-vagin/comments", {
        method: "POST",
        body: JSON.stringify({
            name: sanitizeHtml(name),
            text: sanitizeHtml(text),
            forceError: true,
        })
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error("Сервер упал");
            }

            if (response.status === 400) {
                throw new Error("Ошибочный запрос");
            }
            else {
                return response.json()
            }
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
}