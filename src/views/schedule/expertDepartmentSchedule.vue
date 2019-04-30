<template>
  <div>
    <el-container>
      <el-aside width="50%" style="padding-top:50px;margin-left:5%">
        <span style="font-weight:700;margin-right:50px;">排班日期</span>
        <el-date-picker
          v-model="scheduleTime"
          :picker-options="pickerOption"
          align="right"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          @change="listExpert"
        />
        <div>
          <el-card v-if="noDoctor" class="box-card" shadow="hover" style="margin-top:30px">暂无医生</el-card>
        </div>
        <div v-if="!noDoctor">
          <div v-for="(t,index) in todayScheduleDoctorDtoList" :key="index">
            <div @click="changeDoctor(t)">
              <el-card class="box-card" shadow="hover" style="margin-top:30px">
                <div style="font-weight:700;margin-left:10px;margin-bottom:10px">
                  <span>{{ t.doctorName }}</span>
                  <el-button
                    v-if="t.scheduleDoctorDtoList.length < 3"
                    type="primary"
                    style="margin-left:70%"
                    @click="toggle(t)"
                  >新增排班</el-button>
                </div>
                <el-table :data="t.scheduleDoctorDtoList" stripe style="width:760px;">
                  <el-table-column prop="timeInterval" label="时段" width="150"/>
                  <el-table-column prop="totalNumber" label="号源数" width="200">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.totalNumber" type="number" step="1" min="1"/>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="success"
                        @click="updateScheduleDoctor(scope.row)"
                      >更新排班</el-button>
                      <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                      >删除排班</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div v-if="t.show">
                  <div style="font-weight:700;margin-top:20px">新增排班信息填写</div>
                  <el-table :data="insertTable" stripe style="width:760px;margin-top:20px">
                    <el-table-column prop="timeInterval" label="时段" width="300">
                      <template slot-scope="scope">
                        <el-select v-model="scope.row.timeInterval">
                          <el-option
                            v-for="item in t.time"
                            :key="item.index"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column prop="totalNumber" label="号源数" width="240">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.totalNumber" type="number" step="1" min="1"/>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-button
                    type="primary"
                    style="margin-top:20px;margin-left:50px"
                    @click="insertExpert(t)"
                  >确认添加</el-button>
                  <el-button @click="toggle(t)">取消</el-button>
                </div>
              </el-card>
            </div>
          </div>
        </div>
      </el-aside>
      <el-main
        style="text-align:center;margin-top:20px;padding:30px;margin-left:5%;margin-right:5%;"
      >
        <div v-if="!noDoctor">
          <el-card :body-style="{ padding: '0px', height:'360px',}" shadow="hover">
            <div slot="header">
              <span style="font-weight:700;font-size:18px">{{ doctor.doctorName }}</span>
            </div>
            <el-row style="padding-top:40px;padding-left:25%">
              <el-col>
                <img :src="doctor.imgPath" style="width:120px;height:120px">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8" class="title">
                <div>医生工号</div>
              </el-col>
              <el-col :span="14" class="detail">
                <div>{{ doctor.doctorNumber }}</div>
              </el-col>
            </el-row>
            <el-row class="row-style">
              <el-col :span="8" class="title">
                <div>医生职称</div>
              </el-col>
              <el-col :span="14" class="detail">
                <div>{{ doctor.doctorTitle }}</div>
              </el-col>
            </el-row>
            <el-row class="row-style">
              <el-col :span="8" class="title">
                <div>医生擅长</div>
              </el-col>
              <el-col :span="14" class="detail">
                <div>{{ doctor.goodAt }}</div>
              </el-col>
            </el-row>
            <el-row class="row-style">
              <el-col :span="8" class="title">
                <div>医生手机号</div>
              </el-col>
              <el-col :span="14" class="detail">
                <div>{{ doctor.phone }}</div>
              </el-col>
            </el-row>
            <el-row class="row-style">
              <el-col :span="8" class="title">
                <div>医生身份证号</div>
              </el-col>
              <el-col :span="14" class="detail">
                <div>{{ doctor.doctorIdCard }}</div>
              </el-col>
            </el-row>
            <el-row class="row-style">
              <el-col :span="8" class="title">
                <div>医生所属科室</div>
              </el-col>
              <el-col :span="14" class="detail">
                <el-row :gutter="20" style="margin-bottom:15px">
                  <el-col
                    v-for="(department,index) in doctor.departmentList"
                    :span="12"
                    :key="index"
                  >{{ department.departmentName }}</el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style>
.el-col {
  border-radius: 4px;
  padding-bottom: 20px;
  padding-left: 30px;
}
.name {
  font-weight: 700;
  font-size: 25px;
}
.title {
  font-weight: 600;
  margin-bottom: 15px;
  margin-top: 15px;
}
.detail {
  margin-bottom: 15px;
  margin-top: 15px;
}
</style>

<script>
import dateUtil from '@/utils/dateUtil'
import { getDoctorById } from '@/api/doctor'
import {
  listExpert,
  updateExpert,
  insertExpert,
  deleteExpert
} from '@/api/schedule'
export default {
  data() {
    return {
      doctorId: 16,
      departmentId: 0,
      doctorMessage: '',
      pageNumber: 1,
      pageSize: 4,
      total: 1,
      doctorList: [],
      confirmDeleteVisible: false,
      doctor: '',
      pickerOption: {
        disabledDate(time) {
          const now = new Date()
          const end = now.setDate(now.getDate() + 7)
          const flag = time <= new Date() || time >= end
          return flag
        }
      },
      scheduleTime: '',
      tableData: [{}],
      todayScheduleDoctorDtoList: [],
      noDoctor: false,
      insertTable: [{}]
    }
  },
  mounted() {
    this.$nextTick(function init() {
      this.scheduleTime = dateUtil.getDay(1, '-')
      this.listExpert()
    })
  },
  methods: {
    getDoctorDetail() {
      const doctorId = this.doctorId
      if (doctorId == null) {
        this.$router.push({ name: 'ScheduleManagement' })
      }
      return new Promise((resolve, reject) => {
        getDoctorById(doctorId)
          .then(response => {
            this.doctor = response.data.returnData
            this.doctorDepartmentList = this.doctor.departmentList
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    listExpert() {
      const departmentId = this.$route.query.departmentId
      if (departmentId == null) {
        this.$router.push({ name: 'ScheduleManagement' })
      } else {
        this.departmentId = departmentId
      }
      listExpert(this.departmentId, this.scheduleTime).then(response => {
        if (response.data.returnCode === 200) {
          const data = response.data.returnData
          this.todayScheduleDoctorDtoList = data.todayScheduleDoctorDtoList
          if (this.todayScheduleDoctorDtoList.length === 0) {
            this.noDoctor = true
          } else {
            this.doctorId = this.todayScheduleDoctorDtoList[0].doctorId
            this.getDoctorDetail()
            this.todayScheduleDoctorDtoList.forEach(element => {
              if (element.length !== 0) {
                this.$set(element, 'show', false)
                this.$set(element, 'time', [])
              }
            })
          }
        }
      })
    },
    handleDelete(index, row) {
      deleteExpert(row.scheduleDoctorId, row.timeInterval).then(response => {
        if (response.data.returnCode === 200) {
          this.$store.state.errorTokenVisible = true
          this.$store.state.errorTokenMessage = '专家科室排班删除成功！'
          this.listExpert()
        }
      })
    },
    updateScheduleDoctor(row) {
      if (
        typeof row.totalNumber === 'undefined' ||
        typeof row.timeInterval === 'undefined'
      ) {
        this.$store.state.errorTokenVisible = true
        this.$store.state.errorTokenMessage = '请将排班信息填写完整'
      } else {
        updateExpert(
          row.scheduleDoctorId,
          row.timeInterval,
          row.totalNumber
        ).then(response => {
          if (response.data.returnCode === 200) {
            this.$store.state.errorTokenVisible = true
            this.$store.state.errorTokenMessage = '专家科室排班更新成功！'
            this.listExpert()
          }
        })
      }
    },
    // 筛选出未排班的时段
    filterTimeInterval(item) {
      const time = [
        {
          value: '上午',
          label: '上午'
        },
        {
          value: '下午',
          label: '下午'
        },
        {
          value: '晚上',
          label: '晚上'
        }
      ]
      for (let i = 0; i < time.length; i++) {
        item.scheduleDoctorDtoList.forEach(t => {
          if (t.timeInterval === time[i].value) {
            time.splice(i, 1)
          }
        })
      }
      this.$set(item, 'time', time)
    },
    toggle(item) {
      item.show = !item.show
      this.filterTimeInterval(item)
    },
    insertExpert(item) {
      let scheduleDoctorId
      const totalNumber = this.insertTable[0].totalNumber
      const timeInterval = this.insertTable[0].timeInterval
      if (
        typeof totalNumber === 'undefined' ||
        typeof timeInterval === 'undefined'
      ) {
        this.$store.state.errorTokenVisible = true
        this.$store.state.errorTokenMessage = '请将排班信息填写完整'
      } else {
        if (item.scheduleDoctorDtoList.length !== 0) {
          scheduleDoctorId = item.scheduleDoctorDtoList[0].scheduleDoctorId
          updateExpert(scheduleDoctorId, timeInterval, totalNumber).then(
            response => {
              if (response.data.returnCode === 200) {
                this.$store.state.errorTokenVisible = true
                this.$store.state.errorTokenMessage = '专家科室排班新增成功！'
                this.listExpert()
              }
            }
          )
        } else {
          insertExpert(
            this.departmentId,
            this.doctorId,
            this.scheduleTime,
            timeInterval,
            totalNumber
          ).then(response => {
            if (response.data.returnCode === 200) {
              this.$store.state.errorTokenVisible = true
              this.$store.state.errorTokenMessage = '专家科室排班新增成功！'
              this.listExpert()
            }
          })
        }
      }
      this.insertTable = [{}]
    },
    changeDoctor(t) {
      this.doctorId = t.doctorId
      this.getDoctorDetail()
    }
  }
}
</script>
