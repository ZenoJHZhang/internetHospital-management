<template>
  <div>
    <el-container>
      <el-header style="margin-top:50px">
        <el-row :gutter="30">
          <el-col :xs="12" :sm="12" :md="12" :lg="10" :xl="8">
            <div class="block">
              <span style="margin-left:20px;margin-right:10px">日期</span>
              <el-date-picker
                v-model="date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              />
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="10" :xl="8">
            <el-input
              v-model="patientName"
              clearable
              placeholder="请输入患者姓名"
              prefix-icon="el-icon-search"
            />
          </el-col>
        </el-row>
      </el-header>
      <el-main style="padding:50px;padding-top:20px">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="待就诊(今日)" name="待就诊(今日)">
            <reservation-table :reservation-data="reservationData" :status="4"/>
          </el-tab-pane>
          <el-tab-pane label="待就诊(日期筛选)" name="待就诊(日期筛选)" lazy>
            <reservation-table :reservation-data="reservationData"/>
          </el-tab-pane>
          <el-tab-pane label="就诊中" name="就诊中" lazy>
            <reservation-table :reservation-data="reservationData" :status="11"/>
          </el-tab-pane>
          <el-tab-pane label="待诊断" name="待诊断" lazy>
            <reservation-table :reservation-data="reservationData" :status="12"/>
          </el-tab-pane>
          <el-tab-pane label="待审核" name="待审核" lazy>
            <reservation-table :reservation-data="reservationData" :status="13"/>
          </el-tab-pane>
          <el-tab-pane label="审核通过" name="审核通过" lazy>
            <reservation-table :reservation-data="reservationData" :status="14"/>
          </el-tab-pane>
          <el-tab-pane label="审核不通过" name="审核不通过" lazy>
            <reservation-table :reservation-data="reservationData" :status="16"/>
          </el-tab-pane>
          <el-tab-pane label="待评价" name="待评价" lazy>
            <reservation-table :reservation-data="reservationData" :status="17"/>
          </el-tab-pane>
          <el-tab-pane label="已评价" name="已评价" lazy>
            <reservation-table :reservation-data="reservationData" :status="18"/>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import reservationTable from '@/components/Reservation/reservationTable'
import { getUserReservationOfDoctor } from '@/api/reservation'
import dateUtil from '@/utils/dateUtil'
export default {
  components: {
    reservationTable
  },
  data() {
    return {
      date: [''],
      activeName: '待就诊(今日)',
      startScheduleTime: '',
      endScheduleTime: '',
      status: 1,
      pageNumber: 1,
      pageSize: 10,
      total: 1,
      patientName: '',
      reservationData: []
    }
  },
  computed: {
    startTime() {
      return this.date[0]
    },
    endTime() {
      return this.date[1]
    }
  },
  mounted() {
    this.$nextTick(function init() {
      this.todayUserReservation(4, true)
    })
  },
  methods: {
    todayUserReservation(status, todayFlag) {
      let startTime
      let endTime
      let today
      if (todayFlag) {
        today = dateUtil.getDay(0, '-')
      } else {
        today = ''
      }
      if (this.date !== null) {
        if (this.date.length === 2) {
          startTime = this.startTime
          endTime = this.endTime
        } else {
          startTime = today
          endTime = today
        }
      } else {
        startTime = today
        endTime = today
      }
      this.status = status
      getUserReservationOfDoctor(
        this.status,
        startTime,
        endTime,
        this.patientName,
        this.pageNumber,
        this.pageSize
      ).then(response => {
        if (response.data.returnCode === 200) {
          const data = response.data.returnData
          this.total = data.total
          this.reservationData = data.list
        }
      })
    },
    handleClick(tab, event) {
      if (tab.name === '待就诊(今日)') {
        this.todayUserReservation(4, true)
      } else if (tab.name === '待就诊(日期筛选)') {
        this.todayUserReservation(4, false)
      } else if (tab.name === '就诊中') {
        this.todayUserReservation(11, false)
      } else if (tab.name === '待诊断') {
        this.todayUserReservation(12, false)
      } else if (tab.name === '待审核') {
        this.todayUserReservation(13, false)
      } else if (tab.name === '审核通过') {
        this.todayUserReservation(14, false)
      } else if (tab.name === '审核不通过') {
        this.todayUserReservation(16, false)
      } else if (tab.name === '待评价') {
        this.todayUserReservation(17, false)
      } else if (tab.name === '已评价') {
        this.todayUserReservation(18, false)
      }
    }
  }
}
</script>

