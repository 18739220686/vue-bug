/**
 * 项目相关接口
 */
import service from '../utils/axios'

export function fetchList(query) {
  return service({
    url: '/case',
    method: 'get',
    params: query
  })
}

export function fetchCase(id) {
  return service({
    url: '/case',
    method: 'get',
    params: { id }
  })
}

export function createCase(data) {
  return service({
    url: '/case',
    method: 'post',
    data
  })
}

export function updateCase(data) {
  return service({
    url: `/case/${data.id}`,
    method: 'put',
    data: {
      name: data.name,
      body: data.body,
      desc: data.desc,
      base_url:data.base_url,
      base_header:data.base_header,
      path: data.path,
      standard: data.standard,
      method: data.method,
      case_name: data.case_name,
      interface_id: data.interface_id,
      content_type: data.content_type,
      extra: data.extra,
      expect: data.expect,
      token: data.token,
      token_path: data.token_path,
      query: data.query
    }
  })
}

export function deleteCase(id) {
  /**
   * 删除项目接口
   * params: id  项目id
   */
  return service({
    url: `/case/${id}`,
    method: `delete`
  })
}

//  获取所有项目，部不分页
export function projectList() {
  return service({
    url: '/projects',
    method: 'get'
  })
}

export function fetchInterface(id) {
  return service({
    url: `/interface/${id}`,
    method: 'get'
  })
}
