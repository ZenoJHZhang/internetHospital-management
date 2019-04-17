<template>
  <div>
    <div style="width:800px;margin-left:25px">
      <all-user-reservation-detail :user-reservation-uu-id="userReservationUuId" :audit-flag="false"/>
    </div>
  </div>
</template>

<script>
import allUserReservationDetail from '@/components/Reservation/allUserReservationDetail'
export default {
  components: {
    allUserReservationDetail
  },
  data() {
    return {
      buttonName: '',
      oneButtonFlag: false,
      userReservationUuId: ''
    }
  },
  created() {
    this.userReservationUuId = this.$route.query.userReservationUuId
  },
  mounted() {
    this.$nextTick(function init() {})
  },
  methods: {}
}
</script>
