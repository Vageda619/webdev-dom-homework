import { fetchAndCommentsRender } from "./fetchrender.js";
import { userName } from "./renderLogin.js";

let commentsData = [];
export let isAuthenticated = false;
let isAuthorized = false;
export { commentsData };


fetchAndCommentsRender(commentsData, isAuthenticated, isAuthorized, userName);