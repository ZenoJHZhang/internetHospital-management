import request from '@/utils/request'

export function listRefundByStatus(status, pageNo, pageSize) {
  return request({
    url: '/managementRefund/listRefundByStatus',
    method: 'post',
    params: {
      status,
      pageNo,
      pageSize
    }
  })
}

export function refundPay(userReservationUuId, agreeRefundAmount, refundFlag, refuseReason) {
  return request({
    url: '/pay/refundPay',
    method: 'post',
    params: {
      userReservationUuId,
      agreeRefundAmount,
      refundFlag,
      refuseReason
    }
  })
}
