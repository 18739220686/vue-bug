/**
 * 项目相关接口
 */
import service from "../utils/axios";

export function fetchList(query) {
  return service({
    url: '/project',
    method: 'get',
    params: query
  })
}

export function fetchProject(id) {
  return service({
    url: '/project',
    method: 'get',
    params: { id }
  })
}

export function createProject(data) {
  return service({
    url: '/project',
    method: 'post',
    data
  })
}

export function updateProject(data) {
  return service({
    url: `/project/${data.id}`,
    method: 'put',
    data: { name: data.name, desc: data.desc }
  })
}

export function deleteProject(id) {
  /**
   * 删除项目接口
   * params: id  项目id
   */
  return service({
    url: `/project/${id}`,
    method: `delete`
  })
}
