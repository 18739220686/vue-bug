/**
 * 项目相关接口
 */
import service from '../utils/axios'

export function fetchList(query) {
  return axios({
    url: '/task',
    method: 'get',
    params: query
  })
}

export function fetchtask(id) {
  return axios({
    url: '/task',
    method: 'get',
    params: { id }
  })
}

export function createTask(data) {
  return service({
    url: '/task',
    method: 'post',
    data
  })
}

export function updateTask(data) {
  return service({
    url: `/task/${data.id}`,
    method: 'put',
    data: { name: data.name, case_list: data.case_list, env_id: data.env_id, is_timer: data.is_timer, cron: data.cron }
  })
}

export function deleteTask(id) {
  /**
   * 删除项目接口
   * params: id  项目id
   */
  return service({
    url: `/task/${id}`,
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

// 获取项目下的case
export function caseList(p_id) {
  return service({
    url: `/project/${p_id}/cases`,
    method: 'get'
  })
}

// 运行任务
export function runCase(id) {
  return service({
    url: `/task/${id}/run`,
    method: 'post'
  })
}

// 后台运行
export function backgroundRun(id) {
  return service({
    url: `/task/${id}/background`,
    method: 'post'
  })
}

// 查看当前任务定时信息
export function getTimerInfo(id) {
  return service({
    url: `/job/${id}`,
    method: 'get'
  })
}
