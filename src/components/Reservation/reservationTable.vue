<template>
  <div>
    <el-table :data="reservationData" stripe style="width: 100%">
      <el-table-column prop="patientName" label="患者姓名" width="180"/>
      <el-table-column prop="patientSex" label="性别" width="180"/>
      <el-table-column prop="patient.age" label="年龄"/>
      <el-table-column prop="departmentName" label="预约科室"/>
      <el-table-column prop="clinicDate" label="预约日期"/>
      <el-table-column prop="clinicTime" label="预约时段"/>
      <el-table-column prop="regNo" label="就诊序号"/>
      <el-table-column prop="statusDescription" label="状态"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="callPatient(scope.$index, scope.row)">叫号</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    reservationData: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    callPatient(index, row) {
      const obj = JSON.stringify(row)
      localStorage.setItem('userReservation', obj)
      localStorage.setItem('userReservationUuId', row.uuId)
      this.$router.push({
        name: 'DoctorClinic'
      })
    },
    handleDelete(index, row) {
      console.log(index, row)
    }
  }
}
</script>
