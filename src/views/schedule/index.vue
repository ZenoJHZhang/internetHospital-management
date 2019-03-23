<template>
  <div>
    <el-container>
      <el-header style="padding-top:20px">
        <el-row>
          <el-col :span="6">
            <el-input
              v-model="departmentMessage"
              placeholder="根据科室名/科室编号模糊搜索"
              prefix-icon="el-icon-search"
              @keyup.native="listDepartmentByNameOrNumberWithDepartmentMessage(0)"
            />
          </el-col>
          <el-col :span="8">
            <el-button-group>
              <el-button type="primary" icon="el-icon-menu" @click="changeDepartmentType(2)">全部科室</el-button>
              <el-button type="primary" icon="el-icon-star-on" @click="changeDepartmentType(1)">专家科室</el-button>
              <el-button
                type="primary"
                icon="el-icon-star-off"
                @click="changeDepartmentType(0)"
              >普通科室</el-button>
            </el-button-group>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row>
          <el-col v-for="(department,index) in departmentList" :span="6" :key="index">
            <el-card :body-style="{ padding: '0px', height:'360px',}" shadow="hover">
              <div slot="header">
                <span style="font-weight:700;font-size:18px">{{ department.departmentName }}</span>
                <el-button
                  style="float: right; padding: 8px"
                  type="success"
                  icon="el-icon-edit"
                  round
                  @click="goSchedule(department.id,department.deptType)"
                >立即排班</el-button>
              </div>
              <el-row style="padding-top:40px;padding-left:25%">
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
          @current-change="listDepartmentByNameOrNumberWithDepartmentMessage()"
        />
      </el-footer>
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
import {
  listDepartmentByNameOrNumberWithDepartmentMessage
} from '@/api/department'
export default {
  data() {
    return {
      currentDate: new Date(),
      departmentType: 2,
      pageNumber: 1,
      pageSize: 4,
      total: 1,
      departmentList: [],
      departmentMessage: '',
      confirmDeleteVisible: false,
      departmentId: 1
    }
  },
  mounted() {
    this.$nextTick(function init() {
      this.listDepartmentByNameOrNumberWithDepartmentMessage()
    })
  },
  methods: {
    listDepartmentByNameOrNumberWithDepartmentMessage(flag) {
      if (flag === 0) {
        this.pageNumber = 1
      }
      return new Promise((resolve, reject) => {
        listDepartmentByNameOrNumberWithDepartmentMessage(
          this.departmentMessage,
          this.departmentType,
          this.pageNumber,
          this.pageSize
        )
          .then(response => {
            const data = response.data.returnData
            this.total = data.total
            this.departmentList = data.list
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    changeDepartmentType(type) {
      this.departmentType = type
      this.pageNumber = 1
      this.listDepartmentByNameOrNumberWithDepartmentMessage(0)
    },
    goSchedule(departmentId, deptType) {
      if (deptType === 0) {
        this.$router.push({
          name: 'NormalDepartmentSchdule',
          query: { departmentId: departmentId }
        })
      } else if (deptType === 1) {
        this.$router.push({
          name: 'ExpertDepartmentSchedule',
          query: { departmentId: departmentId }
        })
      }
    }
  }
}
</script>
