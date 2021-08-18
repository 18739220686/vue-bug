/**
 * 项目相关接口
 */
import service from "/../utils/axios";

export function fetchList(query) {
  return service({
    url: '/interface',
    method: 'get',
    params: query
  })
}

export function fetchInterface(id) {
  return service({
    url: '/interface',
    method: 'get',
    params: { id }
  })
}

export function createInterface(data) {
  return service({
    url: '/interface',
    method: 'post',
    data: data
  })
}

export function updateInterface(data) {
  return service({
    url: `/interface/${data.id}`,
    method: 'put',
    data: {
      name: data.name,
      method: data.method,
      project_id: data.project_id,
      path: data.path,
      desc: data.desc,
      standard: data.standard
    }
  })
}

export function deleteInterface(id) {
  /**
   * 删除项目接口
   * params: id  项目id
   */
  return service({
    url: `/interface/${id}`,
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
