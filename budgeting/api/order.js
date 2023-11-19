import request from '../util/request.js';

export const postOrder = (data) => {
  return request('system/orders', 'POST', data)
}

// 我的订单
export const getMyOrder = (data) => {
    return request('system/orders/my/'+data, 'GET')
}

// 医生订单
export const getDOCOrder = (data) => {
    return request('system/orders/doc/'+data, 'GET')
}

// 取消订单
export const cancelOrder = (data) => {
    return request('/orders/cancel/'+data, 'PUT')
    }
// 确认订单
export const confirmOrder = (data) => {
    return request('/orders/submit/'+data, 'PUT')
    }

// 确认订单
export const update = (data) => {
    return request('system/orders', 'PUT',data)
    }


