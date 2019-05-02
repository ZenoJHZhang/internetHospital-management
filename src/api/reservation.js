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

export function getAllDetailByUuId(userReservationUuId) {
  return request({
    url: '/userReservation/getAllDetailByUuId',
    method: 'post',
    params: {
      userReservationUuId
    }
  })
}

export function getUserReservationByAuditStatus(auditStatus, pageNo, pageSize) {
  return request({
    url: '/managementUserReservation/getUserReservationByAuditStatus',
    method: 'post',
    params: {
      auditStatus,
      pageNo,
      pageSize
    }
  })
}

export function auditUserReservation(userReservationUuId, auditStatus, examineFailReason) {
  return request({
    url: '/managementUserReservation/auditUserReservation',
    method: 'post',
    params: {
      userReservationUuId,
      auditStatus,
      examineFailReason
    }
  })
}

export function passUserReservation(userReservationUuid, passReason) {
  return request({
    url: '/docUserReservation/passUserReservation',
    method: 'post',
    params: {
      userReservationUuid,
      passReason
    }
  })
}
