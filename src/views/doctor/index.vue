<template>
  <div>
    <el-container>
      <el-header style="padding-top:20px">
        <el-row>
          <el-col :span="6">
            <el-input
              v-model="doctorMessage"
              placeholder="根据医生性名/医生工号模糊搜索"
              prefix-icon="el-icon-search"
              @keyup.native="listDoctorByNameOrNumberWithDepartmentId(0)"
            />
          </el-col>
          <el-col :span="8">
            <span style="font-weight:700;margin-right:15px">科室筛选:</span>
            <el-cascader
              ref="departmentList"
              :options="departmentList"
              :show-all-levels="false"
              placeholder="科室名"
              filterable
              @change="makeDepartmentId"
            />
          </el-col>
          <el-col :span="2">
            <el-button type="success" icon="el-icon-edit" @click="goInsertDepartment()">新增科室</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row>
          <el-col v-for="(doctor,index) in doctorList" :span="6" :key="index">
            <el-card :body-style="{ padding: '0px', height:'360px',}" shadow="hover">
              <div slot="header">
                <span style="font-weight:700;font-size:18px">{{ doctor.doctorName }}</span>
                <el-button style="float: right; padding: 3px 0" type="text">
                  <i class="el-icon-delete"/>删除医生
                </el-button>
                <el-button
                  style="float: right; padding: 3px"
                  type="text"
                  @click="editDoctor(doctor.id)"
                >
                  <i class="el-icon-edit"/>编辑医生
                </el-button>
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
          </el-col>
        </el-row>
      </el-main>
      <el-footer style="text-align:center;font-size:18px">
        <el-pagination
          :total="total"
          :current-page.sync="pageNumber"
          :page-size="pageSize"
          background
          layout="prev, pager, next"
          @current-change="listDoctorByNameOrNumberWithDepartmentId(1)"
        />
      </el-footer>
    </el-container>
    <!-- <el-dialog :visible.sync="confirmDeleteVisible" :show-close="false" title="提示" width="30%">
      <span>确认删除科室?</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteDepartment(departmentId)">确 定</el-button>
        <el-button type="info" @click="confirmDeleteVisible=false">取 消</el-button>
      </span>
    </el-dialog>-->
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
import { listDoctorByNameOrNumberWithDepartmentId } from '@/api/doctor'
import { listDepartmentByNameOrNumberWithDepartmentMessage } from '@/api/department'
export default {
  data() {
    return {
      departmentId: 0,
      doctorMessage: '',
      pageNumber: 1,
      pageSize: 4,
      total: 1,
      doctorList: [],
      departmentList: [
        {
          value: '0',
          label: '全部科室'
        },
        {
          value: 'normalDepartment',
          label: '普通科室',
          children: []
        },
        {
          value: 'expertDepartment',
          label: '专家科室',
          children: []
        }
      ],
      normalDepartmentList: [],
      expertDepartmentList: []
    }
  },
  mounted() {
    this.$nextTick(function init() {
      this.listDoctorByNameOrNumberWithDepartmentId()
      this.makeCascader()
    })
  },
  methods: {
    listDoctorByNameOrNumberWithDepartmentId(flag) {
      if (flag === 0) {
        this.pageNumber = 1
      }
      listDoctorByNameOrNumberWithDepartmentId(
        this.doctorMessage,
        this.departmentId,
        this.pageNumber,
        this.pageSize
      ).then(response => {
        if (response.data.returnCode === 200) {
          const data = response.data.returnData
          this.total = data.total
          this.doctorList = data.list
        }
      })
    },
    /**
     * 生成科室多级选择器
     */
    makeCascader() {
      listDepartmentByNameOrNumberWithDepartmentMessage('', 2, 0, 0).then(
        response => {
          if (response.data.returnCode === 200) {
            const data = response.data.returnData
            const list = data.list
            list.forEach((item, index) => {
              if (item.deptType === 0) {
                const normalDepartment = {
                  value: '',
                  label: ''
                }
                normalDepartment.label = item.departmentName
                normalDepartment.value = item.id
                this.normalDepartmentList.push(normalDepartment)
              } else if (item.deptType === 1) {
                const expertDepartment = {
                  value: '',
                  label: ''
                }
                expertDepartment.label = item.departmentName
                expertDepartment.value = item.id
                this.expertDepartmentList.push(expertDepartment)
              }
            })
            this.$set(
              this.departmentList[1],
              'children',
              this.normalDepartmentList
            )
            this.$set(
              this.departmentList[2],
              'children',
              this.expertDepartmentList
            )
          }
        }
      )
    },
    makeDepartmentId() {
      if (this.$refs.departmentList.currentValue.length === 1) {
        this.departmentId = 0
      } else {
        this.departmentId = this.$refs.departmentList.currentValue[1]
      }
      this.listDoctorByNameOrNumberWithDepartmentId(0)
    },
    editDoctor(doctorId) {
      this.$router.push({
        name: 'EditDoctor',
        query: { doctorId: doctorId }
      })
    }
  }
}
</script>
