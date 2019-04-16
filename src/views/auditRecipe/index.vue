<template>
  <div>
    <el-container style="margin-left:3px">
      <el-aside width="45%">
        <div style="margin-top:25px;margin-bottom:20px">
          <span>审核状态选择</span>
          <el-select
            v-model="auditStatus"
            placeholder="审核状态选择"
            @change="getUserReservationByAuditStatus"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <el-table :data="userReservation" style="width: 100%" @row-click="getDetail">
          <el-table-column prop="departmentName" label="科室名" width="180"/>
          <el-table-column prop="doctorName" label="医生姓名" width="120"/>
          <el-table-column prop="clinicDate" label="就诊日期"/>
          <el-table-column prop="timeInterval" label="就诊时段"/>
          <el-table-column prop="doctorName" label="审核状态"/>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button size="mini" @click="argeeAudit(scope.$index, scope.row)">通过</el-button>
              <el-button size="mini" type="danger" @click="refuseAudit(scope.$index, scope.row)">不通过</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align:center;margin-top:50px">
          <el-pagination :total="total" layout="prev, pager, next"/>
        </div>
      </el-aside>
      <el-main>
        <all-user-reservation-detail v-if="clickFlag" :user-reservation-uu-id="userReservationUuId"/>
      </el-main>
    </el-container>
    <el-dialog :visible.sync="dialogVisible" title="提示" width="30%">
      <el-form ref="form" :inline="true" :model="form" :rules="rules">
        <el-form-item label="审核不通过原因" prop="reason">
          <el-input v-model="form.reason" placeholder="审核不通过原因"/>
        </el-form-item>
        <br>
        <el-form-item>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm('form')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import allUserReservationDetail from '@/components/Reservation/allUserReservationDetail'
import {
  getUserReservationByAuditStatus,
  auditUserReservation
} from '@/api/reservation'
export default {
  components: {
    allUserReservationDetail
  },
  data() {
    return {
      userReservation: [],
      userReservationUuId: '',
      clickFlag: false,
      dialogVisible: false,
      form: {},
      rules: {
        reason: [
          { required: true, message: '请输入审核不通过原因', trigger: 'blur' }
        ]
      },
      refuseUuId: '',
      auditStatus: '',
      pageNo: 1,
      pageSize: 10,
      total: 10,
      options: [
        {
          value: '-1',
          label: '全部'
        },
        {
          value: '0',
          label: '未审核的'
        },
        {
          value: '1',
          label: '已审核通过的'
        },
        {
          value: '2',
          label: '审核未通过的'
        }
      ]
    }
  },
  mounted() {
    this.$nextTick(function generate() {
      this.getUserReservationByAuditStatus()
    })
  },
  methods: {
    getUserReservationByAuditStatus() {
      var auditStatus = this.auditStatus
      if (this.auditStatus === '') {
        auditStatus = 0
      }
      getUserReservationByAuditStatus(
        auditStatus,
        this.pageNo,
        this.pageSize
      ).then(response => {
        if (response.data.returnCode === 200) {
          this.userReservation = response.data.returnData.list
          this.total = response.data.returnData.total
        }
      })
    },
    getDetail(row, column, event) {
      this.userReservationUuId = row.uuId
      this.clickFlag = true
    },
    argeeAudit(index, row) {
      var uuId = row.uuId
      auditUserReservation(uuId, '2', null).then(response => {
        if (response.data.returnCode === 200) {
          this.$store.state.errorTokenVisible = true
          this.$store.state.errorTokenMessage = '审核通过成功'
          this.getUserReservationByAuditStatus()
        }
      })
    },
    refuseAudit(index, row) {
      this.refuseUuId = row.uuId
      this.dialogVisible = true
    },
    confirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogVisible = false
          auditUserReservation(this.refuseUuId, '1', this.form.reason).then(
            response => {
              if (response.data.returnCode === 200) {
                this.$store.state.errorTokenVisible = true
                this.$store.state.errorTokenMessage = '审核不通过成功'
                this.getUserReservationByAuditStatus()
              }
            }
          )
        } else {
          return false
        }
      })
    }
  }
}
</script>
