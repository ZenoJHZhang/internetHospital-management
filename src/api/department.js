import request from '@/utils/request'

export function listDepartmentByNameOrNumberWithDepartmentMessage(departmentMessage, departmentType, pageNumber, pageSize) {
  return request({
    url: '/managementDepartment/listDepartmentByNameOrNumberWithDepartmentMessage',
    method: 'post',
    params: {
      departmentMessage,
      departmentType,
      pageNumber,
      pageSize
    }
  })
}

export function getDepartmentById(departmentId) {
  return request({
    url: '/managementDepartment/getDepartmentById',
    method: 'get',
    params: {
      departmentId
    }
  })
}

export function updateDepartment(department) {
  return request({
    url: '/managementDepartment/updateDepartment',
    method: 'post',
    data: department
  })
}

export function insertDepartmentImg(imgStr, departmentId) {
  return request({
    url: '/img/insertDepartmentImg',
    method: 'post',
    data: imgStr,
    params: {
      departmentId
    }
  })
}

export function insertDepartment(department) {
  return request({
    url: '/managementDepartment/insertDepartment',
    method: 'post',
    data: department
  })
}

export function deleteDepartment(departmentId) {
  return request({
    url: '/managementDepartment/deleteDepartment',
    method: 'post',
    params: {
      departmentId
    }
  })
}
