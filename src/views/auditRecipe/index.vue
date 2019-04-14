<template>
  <el-container>
    <el-aside width="45%">
      <el-table :data="userReservation" style="width: 100%">
        <el-table-column prop="departmentName" label="科室名" width="180"/>
        <el-table-column prop="doctorName" label="医生姓名" width="120"/>
        <el-table-column prop="clinicDate" label="就诊日期"/>
        <el-table-column prop="timeInterval" label="就诊时段"/>
        <el-table-column prop="doctorName" label="审核状态" />
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">通过</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">不通过</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-aside>
    <el-main>
      <all-user-reservation-detail/>
    </el-main>
  </el-container>
</template>

<script>
import allUserReservationDetail from '@/components/Reservation/allUserReservationDetail'
import { getUserReservationByStatus } from '@/api/reservation'
export default {
  components: {
    allUserReservationDetail
  },
  data() {
    return {
      userReservation: [],
      userReservationUuId: '',
      status: 13
    }
  },
  mounted() {
    this.$nextTick(function generate() {
      this.getUserReservationByStatus()
    })
  },
  methods: {
    getUserReservationByStatus() {
      getUserReservationByStatus(this.status).then(response => {
        if (response.data.returnCode === 200) {
          this.userReservation = response.data.returnData
        }
      })
    }
  }
}
</script>
