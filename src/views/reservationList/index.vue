<template>
  <el-container>
    <el-header style="margin-top:50px">
      <el-row>
        <el-col :xs="12" :sm="12" :md="12" :lg="10" :xl="6">
          <div class="block">
            <span style="margin-left:20px;margin-right:10px">日期</span>
            <el-date-picker
              v-model="value4"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            />
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="10" :xl="6">
          <el-input v-model="input21" clearable placeholder="请输入患者姓名" prefix-icon="el-icon-search"/>
        </el-col>
      </el-row>
    </el-header>
    <el-main style="padding:50px;padding-top:20px">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="待就诊(今日)" name="待就诊(今日)">
          <reservation-table :reservation-data="reservationData" :status="4"/>
        </el-tab-pane>
        <el-tab-pane label="待就诊(其他)" name="待就诊(其他)" lazy>
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
        <el-tab-pane label="已结束" name="已结束" lazy>
          <reservation-table :reservation-data="reservationData"/>
        </el-tab-pane>
        <el-tab-pane label="已取消" name="已取消" lazy>
          <reservation-table :reservation-data="reservationData"/>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
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
      value4: [''],
      activeName: '待就诊(今日)',
      input21: '',
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
  mounted() {
    this.$nextTick(function init() {
      this.todayUserReservation(4)
    })
  },
  methods: {
    todayUserReservation(status) {
      const today = dateUtil.getDay(0, '-')
      this.status = status
      getUserReservationOfDoctor(
        this.status,
        today,
        today,
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
        this.todayUserReservation(4)
      } else if (tab.name === '就诊中') {
        this.todayUserReservation(11)
      } else if (tab.name === '待诊断') {
        this.todayUserReservation(12)
      } else if (tab.name === '待审核') {
        this.todayUserReservation(13)
      }
    }
  }
}
</script>

