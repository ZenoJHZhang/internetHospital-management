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

export function updateDoctor(doctor) {
  return request({
    url: '/managementDoctor/updateDoctor',
    method: 'post',
    data: doctor
  })
}

export function insertDoctor(doctor) {
  return request({
    url: '/managementDoctor/insertDoctor',
    method: 'post',
    data: doctor
  })
}

export function deleteDoctor(doctorId) {
  return request({
    url: '/managementDoctor/deleteDoctor',
    method: 'post',
    params: {
      doctorId
    }
  })
}

export function insertDoctorImg(imgStr, doctorId) {
  return request({
    url: '/img/insertDoctorImg',
    method: 'post',
    data: imgStr,
    params: {
      doctorId
    }
  })
}

