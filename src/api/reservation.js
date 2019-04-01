import request from '@/utils/request'

export function getUserReservationOfDoctor(status, startScheduleTime, endScheduleTime, patientName, pageNumber, pageSize) {
  return request({
    url: '/docUserReservation/getUserReservationOfDoctor',
    method: 'post',
    params: {
      status,
      startScheduleTime,
      endScheduleTime,
      patientName,
      pageNumber,
      pageSize
    }
  })
}

export function beginOrFinishClinic(userReservationUuid, flag) {
  return request({
    url: '/docUserReservation/beginOrFinishClinic',
    method: 'post',
    params: {
      userReservationUuid,
      flag
    }
  })
}

export function confirmDoctorReservation(userReservationUuid) {
  return request({
    url: '/docUserReservation/confirmDoctorReservation',
    method: 'post',
    params: {
      userReservationUuid
    }
  })
}
