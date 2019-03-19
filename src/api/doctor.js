import request from '@/utils/request'

export function listDoctorByNameOrNumberWithDepartmentId(doctorMessage, departmentId, pageNumber, pageSize) {
  return request({
    url: '/managementDoctor/listDoctorByNameOrNumberWithDepartmentId',
    method: 'post',
    params: {
      doctorMessage,
      departmentId,
      pageNumber,
      pageSize
    }
  })
}

export function getDoctorById(doctorId) {
  return request({
    url: '/managementDoctor/getDoctorById',
    method: 'get',
    params: {
      doctorId
    }
  })
}
