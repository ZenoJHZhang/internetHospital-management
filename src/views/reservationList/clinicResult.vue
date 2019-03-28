<template>
  <el-container>
    <el-aside width="60%" style="padding:20px">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="病情诊断" name="diagnose"><diagnose/></el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
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
export default {
  components: {
    noComment,
    userReservationDetail,
    diagnose
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
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style scoped>

</style>
