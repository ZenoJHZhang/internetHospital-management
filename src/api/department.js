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
