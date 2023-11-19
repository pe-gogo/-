import request from '../util/request.js';

export const getCateInfo = (data) => {
  return request('/cate/store/'+data, 'GET', {})
}

export const getCateList = () => {
  return request('/cate/store/list', 'GET', {})
}

export const update = (data) => {
  return request('/cate/update', 'PUT', data)
}

export const del = (data) => {
  return request('/cate/delete/'+data, 'GET')
}

export const add = (data) => {
  return request('/cate/add', 'POST', data)
}
