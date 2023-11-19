// 登录
import request from '../util/request.js';


export const getUserInfo = (data) => {
  return request('resume/user/'+data, 'GET', {})
}

//登录
export const login = (data) => {
    return request('/users/login', 'POST', {
        ...data
    })
};  

export const register = (data) => {
  return request('/user/register', 'POST', {
      ...data
  })
};

export const getDoc = (data) => {
  return request('resume/user/doc/'+data, 'get')
};
