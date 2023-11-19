import request from '../util/request.js';

export const postNote = (data) => {
  return request('system/note', 'POST', data)
}




export const postComment = (data) => {
  return request('system/comments', 'POST', data)
}