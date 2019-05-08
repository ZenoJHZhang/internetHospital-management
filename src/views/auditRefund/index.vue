<template>
  <div>
    <el-container style="margin-left:3px">
      <el-main>
        <div style="margin-top:25px;margin-bottom:20px;">
          <span style="margin-right:15px">退款状态选择</span>
          <el-select v-model="status" placeholder="退款状态选择" @change="statusChange">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <el-table :data="refundList" style="width: 100%">
          <el-table-column prop="deptName" label="科室名"/>
          <el-table-column prop="doctorName" label="医生姓名"/>
          <el-table-column prop="patientName" label="患者姓名"/>
          <el-table-column prop="reason" label="退款原因"/>
          <el-table-column prop="clinicDate" label="就诊日期"/>
          <el-table-column prop="timeInterval" label="就诊时段"/>
          <el-table-column prop="clinicTime" label="就诊时间"/>
          <el-table-column prop="price" label="申请退款金额"/>
          <el-table-column prop="refundStatusName" label="退款状态"/>
          <el-table-column v-if="status === 6" label="操作" width="250">
            <template slot-scope="scope">
              <el-button size="mini" @click="argeeRefund(scope.$index, scope.row)">同意退款</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="refuseRefund(scope.$index, scope.row)"
              >拒绝退款</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align:center;margin-top:50px">
          <el-pagination
            :total="total"
            :current-page.sync="pageNo"
            :page-size="pageSize"
            layout="prev, pager, next"
            @current-change="listRefundByStatus()"
          />
        </div>
      </el-main>
    </el-container>
    <el-dialog :visible.sync="agreeVisible" title="提示" width="30%">
      <div style="margin-bottom:10px;color:red;font-weight:700">最大退款金额: ￥{{ clinicPrice }}</div>
      <el-form ref="agreeForm" :inline="true" :model="agreeForm" :rules="agreeRules">
        <el-form-item label="同意退款金额" prop="reason">
          <el-input v-model="agreeForm.agreePrice" placeholder="同意退款金额"/>
        </el-form-item>
        <br>
        <el-form-item>
          <el-button @click="agreeVisible = false">取 消</el-button>
          <el-button type="primary" @click="agreeConfirm('agreeForm')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog :visible.sync="agreeVisible" title="提示" width="30%">
      <div style="margin-bottom:10px;color:red;font-weight:700">最大退款金额: ￥{{ clinicPrice }}</div>
      <el-form ref="agreeForm" :inline="true" :model="agreeForm" :rules="agreeRules">
        <el-form-item label="同意退款金额" prop="agreePrice">
          <el-input v-model="agreeForm.agreePrice" placeholder="同意退款金额"/>
        </el-form-item>
        <br>
        <el-form-item>
          <el-button @click="agreeVisible = false">取 消</el-button>
          <el-button type="primary" @click="agreeConfirm('agreeForm')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog :visible.sync="refuseVisible" title="提示" width="30%">
      <el-form ref="refuseForm" :inline="true" :model="refuseForm" :rules="refuseRules">
        <el-form-item label="拒绝退款原因" prop="refuse">
          <el-input v-model="refuseForm.refuse" placeholder="拒绝退款原因"/>
        </el-form-item>
        <br>
        <el-form-item>
          <el-button @click="refuseVisible = false">取 消</el-button>
          <el-button type="primary" @click="refuseConfirm('refuseForm')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { listRefundByStatus, refundPay } from '@/api/refund'
export default {
  data() {
    return {
      refundList: [],
      userReservationUuId: '',
      clickFlag: false,
      agreeVisible: false,
      refuseVisible: false,
      agreeForm: {},
      agreeRules: {
        agreePrice: [
          { required: true, message: '请输入同意退款金额', trigger: 'blur' }
        ]
      },
      refuseForm: {},
      refuseRules: {
        refuse: [
          { required: true, message: '请输入拒绝退款原因', trigger: 'blur' }
        ]
      },
      clinicPrice: 0,
      refuseUuId: '',
      status: 6,
      pageNo: 1,
      pageSize: 10,
      total: 10,
      options: [
        {
          value: -1,
          label: '全部'
        },
        {
          value: 6,
          label: '申请退款'
        },
        {
          value: 7,
          label: '已退款'
        },
        {
          value: 8,
          label: '拒绝退款'
        },
        {
          value: 9,
          label: '退款失败'
        }
      ]
    }
  },
  mounted() {
    this.$nextTick(function generate() {
      this.listRefundByStatus()
    })
  },
  methods: {
    listRefundByStatus() {
      listRefundByStatus(this.status, this.pageNo, this.pageSize).then(
        response => {
          if (response.data.returnCode === 200) {
            const data = response.data.returnData
            this.refundList = data.list
            this.total = data.total
          }
        }
      )
    },
    statusChange() {
      this.pageNo = 1
      this.listRefundByStatus()
    },
    argeeRefund(index, row) {
      this.clinicPrice = row.clinicPrice
      this.agreeVisible = true
      this.userReservationUuId = row.userReservationUuId
    },
    refuseRefund(index, row) {
      this.clinicPrice = row.clinicPrice
      this.refuseVisible = true
      this.userReservationUuId = row.userReservationUuId
    },
    agreeConfirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 正数
          const reg = /^([1-9][0-9]*(\.\d{1,2})?)|(0\.\d{1,2})$/
          if (!reg.test(this.agreeForm.agreePrice)) {
            this.$message({
              message: '同意退款金额需大于0',
              type: 'error'
            })
          } else if (this.agreeForm.agreePrice > this.clinicPrice) {
            this.$message({
              message: '同意退款金额不得大于付款金额',
              type: 'error'
            })
          } else {
            refundPay(
              this.userReservationUuId,
              this.agreeForm.agreePrice,
              true,
              ''
            ).then(response => {
              if (response.data.returnCode === 200) {
                this.agreeVisible = false
                this.$store.state.errorTokenVisible = true
                this.$store.state.errorTokenMessage = '同意退款成功'
                this.listRefundByStatus()
              }
            })
          }
        } else {
          return false
        }
      })
    },
    refuseConfirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          refundPay(
            this.userReservationUuId,
            0,
            false,
            this.refuseForm.refuse
          ).then(response => {
            if (response.data.returnCode === 200) {
              this.refuseVisible = false
              this.$store.state.errorTokenVisible = true
              this.$store.state.errorTokenMessage = '拒绝退款成功'
              this.listRefundByStatus()
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
