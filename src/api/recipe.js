import request from '@/utils/request'

export function insertRecipe(medicalList) {
  return request({
    url: '/docRecipe/insertRecipe',
    method: 'post',
    data: medicalList
  })
}

export function getRecipeDetailListByUserReservationUuid(userReservationUuid) {
  return request({
    url: '/docRecipe/getRecipeDetailListByUserReservationUuid',
    method: 'post',
    params: {
      userReservationUuid
    }
  })
}
