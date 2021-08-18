/**
 * 项目相关接口
 */
import service from '../utils/axios'

export function fetchList(query) {
  return service({
    url: '/env',
    method: 'get',
    params: query
  })
}

export function fetchEnv(id) {
  return service({
    url: '/env',
    method: 'get',
    params: { id }
  })
}

export function createEnv(data) {
  return service({
    url: '/env',
    method: 'post',
    data
  })
}

export function updateEnv(data) {
  return service({
    url: `/env/${data.id}`,
    method: 'put',
    data: {
      name: data.name,
      base_url: data.base_url,
      project_id: data.project_id,
      base_header: data.base_header,
      desc: data.desc
    }
  })
}

export function deleteEnv(id) {
  /**
   * 删除项目接口
   * params: id  项目id
   */
  return service({
    url: `/env/${id}`,
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
