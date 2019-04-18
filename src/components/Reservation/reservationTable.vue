<template>
  <div>
    <el-table :data="reservationData" stripe style="width: 100%">
      <el-table-column prop="patientName" label="患者姓名" width="120"/>
      <el-table-column prop="patientSex" label="性别" width="80"/>
      <el-table-column prop="patient.age" label="年龄" width="80"/>
      <el-table-column prop="regNo" label="就诊序号" width="80"/>
      <el-table-column prop="departmentName" label="预约科室"/>
      <el-table-column prop="clinicDate" label="预约日期"/>
      <el-table-column prop="clinicTime" label="预约时段"/>
      <el-table-column prop="statusDescription" label="状态"/>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button
            v-if="oneButtonFlag"
            size="mini"
            type="primary"
            @click="handleClick(scope.$index, scope.row)"
          >{{ buttonName }}</el-button>
          <el-button size="mini" @click="getDetail(scope.$index, scope.row)">查看</el-button>
          <el-button
            v-if="status === 4"
            size="mini"
            type="danger"
            @click="forwardCall(scope.$index, scope.row)"
          >过号</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
export default {
  props: {
    reservationData: {
      type: Array,
      default: () => [],
      required: true,
      code: 0
    },
    status: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      buttonName: '',
      oneButtonFlag: false,
      code: 0,
      message: '',
      clinicState: 0
    }
  },
  created() {
    if (this.status === 4) {
      this.connect()
    }
  },
  mounted() {
    this.$nextTick(function init() {
      if (this.status === 4) {
        this.buttonName = '叫号'
        this.oneButtonFlag = true
      } else if (this.status === 11) {
        this.buttonName = '视频问诊'
        this.oneButtonFlag = true
      } else if (this.status === 12) {
        this.buttonName = '诊断和开药'
        this.oneButtonFlag = true
      } else if (this.status === 13) {
        this.buttonName = '查看'
        this.oneButtonFlag = false
      }
    })
  },
  methods: {
    handleClick(index, row) {
      if (this.status === 4) {
        var hour = new Date().getHours()
        var clinicTime = row.clinicTime
        var startTime = clinicTime.split('-')[0]
        var endTime = clinicTime.split('-')[1]
        var startHour = startTime.split(':')[0]
        var endHour = endTime.split(':')[0]
        if (startHour <= hour && hour <= endHour) {
          this.callPatient(index, row)
        } else {
          this.$store.state.errorTokenVisible = true
          this.$store.state.errorTokenMessage = '未到叫号时段'
        }
      } else if (this.status === 11) {
        const obj = JSON.stringify(row)
        localStorage.setItem('userReservation', obj)
        localStorage.setItem('userReservationUuId', row.uuId)
        this.$router.push({
          name: 'DoctorClinic'
        })
      } else if (this.status === 12) {
        const obj = JSON.stringify(row)
        localStorage.setItem('userReservation', obj)
        localStorage.setItem('userReservationUuId', row.uuId)
        this.$router.push({
          name: 'ClinicResult'
        })
      }
    },
    callPatient(index, row) {
      const obj = JSON.stringify(row)
      var doctorCallRegNo = row.regNo
      const value = {
        userReservationUuId: row.uuId,
        token: localStorage.getItem('token'),
        doctorCallRegNo: doctorCallRegNo
      }
      this.stompClient.send('/doc/pushClinicState', {}, JSON.stringify(value))
      console.log(this.code)
      if (
        this.code === 0 &&
        this.clinicState != null &&
        this.clinicState === 0
      ) {
        localStorage.setItem('userReservation', obj)
        localStorage.setItem('userReservationUuId', row.uuId)
        this.$router.push({
          name: 'DoctorClinic'
        })
      } else if (this.code === 1) {
        this.$store.state.errorTokenVisible = true
        this.$store.state.errorTokenMessage = this.message
      }
    },
    getDetail(index, row) {
      this.$router.push({
        name: 'ReservationDetail',
        query: { userReservationUuId: row.uuId }
      })
    },
    connect() {
      const socket = new SockJS('https://localhost:8082/myWebSocket')
      // let socket = new SockJS("https://www.woniuyiliao.cn/api/myWebSocket");
      const headers = {
        Authorization: localStorage.getItem('token')
      }
      this.stompClient = Stomp.over(socket)
      this.stompClient.connect(
        headers,
        frame => {
          this.stompClient.subscribe(
            '/topic/userReservation',
            msg => {
              const o = JSON.parse(msg.body)
              this.code = o.code
              this.message = o.message
            },
            {}
          )
        },
        err => {
          // 连接发生错误时的处理函数
          console.log('失败')
          console.log(err)
        }
      )
    }
  }
}
</script>
