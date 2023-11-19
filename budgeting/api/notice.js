import request from '../util/request.js';

export const getInfo = (data) => {
  return request('/notice/store/'+data, 'GET', {})
}


// 更新
export const update = (data) => {
  return request('/notice/update', 'PUT', data)
}


