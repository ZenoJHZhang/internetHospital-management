import request from '@/utils/request'

export function listAllMedicalInPage(pageNumber, pageSize) {
  return request({
    url: '/docMedical/listAllMedicalInPage',
    method: 'post',
    params: {
      pageNumber,
      pageSize
    }
  })
}

export function listMedicalMethod() {
  return request({
    url: '/docMedical/listMedicalMethod',
    method: 'post'
  })
}

export function listMedicalTimes() {
  return request({
    url: '/docMedical/listMedicalTimes',
    method: 'post'
  })
}
