import { format } from 'date-fns'
import { getListElements } from './api.js'
import { renderComments } from './renderComments.js'

export function fetchAndCommentsRender(
  commentsData,
  isAuthenticated,
  isAuthorized,
  userName,
) {
  getListElements().then((responseData) => {
    const appComments = responseData.comments.map((comment) => {
      const createDate = format(new Date(comment.date), 'yyyy-MM-dd hh.mm.ss')
      return {
        author: comment.author.name,
        date: createDate,
        text: comment.text,
        likes: comment.likes,
        isLiked: false,
      }
    })

    commentsData = appComments

    renderComments(commentsData, isAuthenticated, isAuthorized, userName)
  })
}