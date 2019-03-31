<template>
  <div>
    <el-container>
      <el-aside style="width:800px;text-align:center">
        <el-card :body-style="{ padding: '0px', height:'360px',}" shadow="hover">
          <div slot="header">
            <span style="font-weight:700;font-size:18px">{{ department.departmentName }}</span>
          </div>
          <el-row style="padding-top:40px;">
            <el-col>
              <img :src="department.imgPath">
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" class="title">
              <div>科室编号</div>
            </el-col>
            <el-col :span="14" class="detail">
              <div>{{ department.departmentNumber }}</div>
            </el-col>
          </el-row>
          <el-row class="row-style">
            <el-col :span="8" class="title">
              <div>科室介绍</div>
            </el-col>
            <el-col :span="14" class="detail">
              <div>{{ department.introduce==null?'暂无介绍':department.introduce }}</div>
            </el-col>
          </el-row>
          <el-row class="row-style">
            <el-col :span="8" class="title">
              <div>科室电话</div>
            </el-col>
            <el-col :span="14" class="detail">
              <div>{{ department.phone }}</div>
            </el-col>
          </el-row>
          <el-row class="row-style">
            <el-col :span="8" class="title">
              <div>科室类型</div>
            </el-col>
            <el-col :span="14" class="detail">
              <div>{{ department.deptType==1?'专家科室':'普通科室' }}</div>
            </el-col>
          </el-row>
          <el-row class="row-style">
            <el-col :span="8" class="title">
              <div>挂号价格</div>
            </el-col>
            <el-col :span="14" class="detail">
              <div style="color:red">￥{{ department.price }}</div>
            </el-col>
          </el-row>
        </el-card>
      </el-aside>
      <el-main>
        <span style="font-weight:700;margin-right:50px;">排班日期</span>
        <el-date-picker
          v-model="scheduleTime"
          :picker-options="pickerOption"
          align="right"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          @change="listNormalDepartmentSchedule(0)"
        />
        <el-button
          v-if="insertFlag"
          type="primary"
          style="margin-left:25px"
          @click="insertTableVisable=true"
        >新增排班</el-button>
        <el-table :data="tableData" stripe style="width:760px;margin-top:50px">
          <el-table-column prop="timeInterval" label="时段" width="300"/>
          <el-table-column prop="totalNumber" label="号源数" width="240">
            <template slot-scope="scope">
              <el-input v-model="scope.row.totalNumber" type="number" step="1" min="1"/>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope" width="160">
              <el-button
                size="mini"
                type="success"
                @click="updateScheduleDepartment(scope.row)"
              >更新排班</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除排班</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div v-if="insertTableVisable">
          <div style="margin-top:100px;font-weight:700">新增排班信息填写</div>
          <el-table :data="insertTable" stripe style="width:760px;margin-top:50px">
            <el-table-column prop="timeInterval" label="时段" width="300">
              <template slot-scope="scope">
                <el-select v-model="scope.row.timeInterval">
                  <el-option
                    v-for="item in timeIntervalSelect"
                    :key="item.value"
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
            @click="insertScheduleDepartment"
          >确认添加</el-button>
          <el-button @click="insertTableVisable=false">取消</el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {
  listNormal,
  updateNormal,
  insertNormal,
  deleteNormal
} from '@/api/schedule'
import { getDepartmentById } from '@/api/department'
import dateUtil from '@/utils/dateUtil'
export default {
  data() {
    return {
      pickerOption: {
        disabledDate(time) {
          const now = new Date()
          const end = now.setDate(now.getDate() + 7)
          const flag = time <= new Date() || time >= end
          return flag
        }
      },
      tableData: [],
      insertTable: [{}],
      departmentId: 1,
      scheduleTime: '',
      defaultDay: '',
      department: '',
      insertFlag: false,
      insertTableVisable: false,
      scheduleDepartmentId: 1,
      timeIntervalSelect: [
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
    }
  },
  mounted() {
    this.$nextTick(function init() {
      this.scheduleTime = dateUtil.getDay(1, '-')
      this.listNormalDepartmentSchedule()
      this.getDepartmentById()
    })
  },
  methods: {
    listNormalDepartmentSchedule() {
      const departmentId = this.$route.query.departmentId
      if (departmentId == null) {
        this.$router.push({ name: 'ScheduleManagement' })
      } else {
        this.departmentId = departmentId
      }
      listNormal(this.departmentId, this.scheduleTime).then(response => {
        if (response.data.returnCode === 200) {
          this.timeIntervalSelect = [
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
          this.tableData = response.data.returnData
          // 排班列表不为空，说明该排班已创建，应当调取更新api
          if (this.tableData.length !== 0) {
            this.scheduleDepartmentId = this.tableData[0].scheduleDepartmentId
          }
          if (this.tableData.length === 3) {
            this.insertFlag = false
          } else {
            this.insertFlag = true
          }
          // 新增排班时去除已排班时段的选择
          this.tableData.forEach(element => {
            this.timeIntervalSelect.forEach(o => {
              if (o.value === element.timeInterval) {
                this.timeIntervalSelect.splice(
                  this.timeIntervalSelect.indexOf(o),
                  1
                )
              }
            })
          })
        }
      })
    },
    getDepartmentById() {
      getDepartmentById(this.departmentId).then(response => {
        if (response.data.returnCode === 200) {
          this.department = response.data.returnData
        }
      })
    },
    handleDelete(index, row) {
      deleteNormal(row.scheduleDepartmentId, row.timeInterval).then(
        response => {
          if (response.data.returnCode === 200) {
            this.$store.state.errorTokenVisible = true
            this.$store.state.errorTokenMessage = '普通科室排班删除成功！'
            this.listNormalDepartmentSchedule()
          }
        }
      )
    },
    updateScheduleDepartment(row) {
      if (
        typeof row.totalNumber === 'undefined' ||
        typeof row.timeInterval === 'undefined'
      ) {
        this.$store.state.errorTokenVisible = true
        this.$store.state.errorTokenMessage = '请将排班信息填写完整'
      } else {
        updateNormal(
          row.scheduleDepartmentId,
          row.timeInterval,
          row.totalNumber
        ).then(response => {
          if (response.data.returnCode === 200) {
            this.$store.state.errorTokenVisible = true
            this.$store.state.errorTokenMessage = '普通科室排班更新成功！'
            this.listNormalDepartmentSchedule()
          }
        })
      }
    },
    insertScheduleDepartment() {
      const totalNumber = this.insertTable[0].totalNumber
      const timeInterval = this.insertTable[0].timeInterval
      if (
        typeof totalNumber === 'undefined' ||
        typeof timeInterval === 'undefined'
      ) {
        this.$store.state.errorTokenVisible = true
        this.$store.state.errorTokenMessage = '请将排班信息填写完整'
      } else {
        if (this.tableData.length !== 0) {
          updateNormal(
            this.scheduleDepartmentId,
            timeInterval,
            totalNumber
          ).then(response => {
            if (response.data.returnCode === 200) {
              this.$store.state.errorTokenVisible = true
              this.$store.state.errorTokenMessage = '普通科室排班新增成功！'
              this.listNormalDepartmentSchedule()
              this.insertTableVisable = false
            }
          })
        } else {
          insertNormal(
            this.departmentId,
            this.scheduleTime,
            timeInterval,
            totalNumber
          ).then(response => {
            if (response.data.returnCode === 200) {
              this.$store.state.errorTokenVisible = true
              this.$store.state.errorTokenMessage = '普通科室排班新增成功！'
              this.listNormalDepartmentSchedule()
              this.insertTableVisable = false
            }
          })
        }
      }
      // 清空，防止下次新增时原先数据影响
      this.insertTable = [{}]
    }
  }
}
</script>

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
