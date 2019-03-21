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
          <el-col :span="2">
            <el-button type="success" icon="el-icon-edit" @click="goInsertDector()">新增医生</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row>
          <el-col v-for="(doctor,index) in doctorList" :span="6" :key="index">
            <el-card :body-style="{ padding: '0px', height:'360px',}" shadow="hover">
              <div slot="header">
                <span style="font-weight:700;font-size:18px">{{ doctor.doctorName }}</span>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="confirmDelete(doctor.id)"
                >
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
    <el-dialog :visible.sync="confirmDeleteVisible" :show-close="false" title="提示" width="30%">
      <span>确认删除医生?</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteDoctor(doctorId)">确 定</el-button>
        <el-button type="info" @click="confirmDeleteVisible=false">取 消</el-button>
      </span>
    </el-dialog>
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
import {
  listDoctorByNameOrNumberWithDepartmentId,
  deleteDoctor
} from '@/api/doctor'
export default {
  data() {
    return {
      doctorId: 0,
      departmentId: 0,
      doctorMessage: '',
      pageNumber: 1,
      pageSize: 4,
      total: 1,
      doctorList: [],
      confirmDeleteVisible: false
    }
  },
  mounted() {
    this.$nextTick(function init() {
      this.listDoctorByNameOrNumberWithDepartmentId()
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
    editDoctor(doctorId) {
      this.$router.push({
        name: 'EditDoctor',
        query: { doctorId: doctorId }
      })
    },
    goInsertDector() {
      this.$router.push({
        name: 'InsertDoctor'
      })
    },
    confirmDelete(doctorId) {
      this.doctorId = doctorId
      this.confirmDeleteVisible = true
    },
    deleteDoctor(doctorId) {
      deleteDoctor(doctorId).then(response => {
        this.confirmDeleteVisible = false
        if (response.data.returnCode === 200) {
          this.$store.state.errorTokenVisible = true
          this.$store.state.errorTokenMessage = '删除医生成功！'
          this.listDoctorByNameOrNumberWithDepartmentId(0)
        }
      })
    }
  }
}
</script>
