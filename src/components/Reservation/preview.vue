<template>
  <el-container>
    <el-main>
      <div>
        <div class="title-line">诊断</div>
        <div v-if="!this.$store.state.hasDiagnoseFlag">暂无诊断</div>
        <diagnose v-if="this.$store.state.hasDiagnoseFlag"/>
      </div>

      <div style="margin-top:50px">
        <div class="title-line">处方</div>
        <div v-if="!this.$store.state.hasMedicalFlag">暂无处方</div>
        <give-medical v-if="this.$store.state.hasDiagnoseFlag"/>
      </div>
    </el-main>
    <el-footer style="text-align:center">
      <el-button type="primary" @click="confirmDoctorReservation">医嘱无误，提交审核</el-button>
    </el-footer>
  </el-container>
</template>

<script>
import noComment from '@/components/common/noComment'
import userReservationDetail from '@/components/Reservation/userReservationDetail'
import diagnose from '@/components/Reservation/diagnose'
import giveMedical from '@/components/Reservation/giveMedical'
import { confirmDoctorReservation } from '@/api/reservation'
export default {
  components: {
    noComment,
    userReservationDetail,
    diagnose,
    giveMedical
  },
  data() {
    return {}
  },
  mounted() {
    this.$nextTick(function generate() {})
  },
  methods: {
    confirmDoctorReservation() {
      confirmDoctorReservation(
        localStorage.getItem('userReservationUuId')
      ).then(response => {
        if (response.data.returnCode === 200) {
          this.$store.state.errorTokenVisible = true
          this.$store.state.errorTokenMessage = '医嘱提交成功'
          this.$router.push({
            name: 'ReservationList'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.title-line {
  border-bottom: 1px solid #e5e5e5;
  height: 40px;
  line-height: 40px;
  color: #a71820;
  font-size: 1;
  font-family: "microsoft yahei";
  font-weight: 700;
  margin-bottom: 20px;
}
</style>

