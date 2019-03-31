<template>
  <el-container>
    <el-aside width="60%" style="padding:20px">
      <el-tabs v-model="activeName">
        <el-tab-pane label="病情诊断" name="diagnose"><diagnose/></el-tab-pane>
        <el-tab-pane label="处方开具" name="second"><give-medical/></el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </el-aside>
    <el-main>
      <user-reservation-detail/>
    </el-main>
  </el-container>
</template>

<script>
import noComment from '@/components/common/noComment'
import userReservationDetail from '@/components/Reservation/userReservationDetail'
import diagnose from '@/components/Reservation/diagnose'
import giveMedical from '@/components/Reservation/giveMedical'
export default {
  components: {
    noComment,
    userReservationDetail,
    diagnose,
    giveMedical
  },
  data() {
    return {
      userReservation: [],
      activeName: 'diagnose'
    }
  },
  mounted() {
    this.$nextTick(function generate() {
    })
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
