import request from '@/utils/request'

export function insertDiagnose(diagnose) {
  return request({
    url: '/docDiagnose/insertDiagnose',
    method: 'post',
    data: diagnose
  })
}

export function getDiagnoseByUserReservationUuId(userReservationUuid) {
  return request({
    url: '/docDiagnose/getDiagnoseByUserReservationUuId',
    method: 'post',
    params: {
      userReservationUuid
    }
  })
}
