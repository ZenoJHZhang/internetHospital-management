import request from '@/utils/request'

export function listNormal(departmentId, scheduleTime) {
  return request({
    url: '/managementNormalSchedule/list',
    method: 'post',
    params: {
      departmentId,
      scheduleTime
    }
  })
}

export function updateNormal(scheduleDepartmentId, timeInterval, totalNumber) {
  return request({
    url: '/managementNormalSchedule/update',
    method: 'post',
    params: {
      scheduleDepartmentId,
      timeInterval,
      totalNumber
    }
  })
}

export function insertNormal(departmentId, scheduleTime, timeInterval, totalNumber) {
  return request({
    url: '/managementNormalSchedule/insert',
    method: 'post',
    params: {
      departmentId,
      scheduleTime,
      timeInterval,
      totalNumber
    }
  })
}

export function deleteNormal(scheduleDepartmentId, timeInterval) {
  return request({
    url: '/managementNormalSchedule/delete',
    method: 'post',
    params: {
      scheduleDepartmentId,
      timeInterval
    }
  })
}
