import request from '../util/request.js';

export const getCommInfo = (data) => {
  return request('/comm/store/'+data, 'GET', {})
}

export const getCateInfo = (data) => {
  return request('/comm/cate/'+data, 'GET', {})
}

// 删除
export const del = (data) => {
  return request('/comm/delete/'+data, 'GET')
} 

// 更新
export const update = (data) => {
  return request('/comm/update', 'PUT', data)
}

// 添加
export const add = (data) => {
  return request('/comm/add', 'POST', data)
}
