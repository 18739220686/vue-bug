/*

* */
import service from '../utils/axios'

// 本地接口的
export function login(data) {
  return service({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return service({
    url: '/info',
    method: 'get'
  })
}

export function logout() {
  return service({
    url: '/logout',
    method: 'post'
  })
}

export function list() {
  return service({
    url: '/list'
  })
}
