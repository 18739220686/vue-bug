import service from '../utils/axios'

export function fetchList(query) {
  return service({
    url: '/report',
    method: 'get',
    params: query
  })
}

export function fetchReport(id) {
  return service({
    url: `/report/${id}`,
    method: 'get'
  })
}

export function deleteReport(id) {
  /**
   * 删除项目接口
   * params: id  项目id
   */
  return service({
    url: `/report/${id}`,
    method: `delete`
  })
}
