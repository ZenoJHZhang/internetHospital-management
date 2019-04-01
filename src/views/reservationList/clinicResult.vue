<template>
  <el-container>
    <el-aside width="60%" style="padding:20px">
      <el-tabs v-model="activeName">
        <el-tab-pane label="病情诊断" name="diagnose">
          <diagnose/>
        </el-tab-pane>
        <el-tab-pane label="处方开具" name="giveMedical">
          <give-medical/>
        </el-tab-pane>
        <el-tab-pane label="医嘱预览" name="preview">
          <preview/>
        </el-tab-pane>
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
import preview from '@/components/Reservation/preview'
export default {
  components: {
    noComment,
    userReservationDetail,
    diagnose,
    giveMedical,
    preview
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
  methods: {}
}
</script>

<style scoped>
</style>
