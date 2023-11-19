import request from '../util/request.js';

export const getNews = () => {
  return request('system/news/list', 'GET', {})
}


export const getNewDetail = (data) => {
  return request('system/news/'+data, 'GET', {})
}

