import request from '@/utils/request'

export function getUserReservationOfDoctor(status, startScheduleTime, endScheduleTime, patientName, pageNumber, pageSize) {
  return request({
    url: '/managementUserReservation/getUserReservationOfDoctor',
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
