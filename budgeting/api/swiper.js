import request from '../util/request.js';

export const getSwiper = () => {
  return request('system/swiper/api/list', 'GET')
}



