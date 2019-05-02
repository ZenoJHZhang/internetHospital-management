
<template>
  <div>
    <div v-if="hasDiagnoseFlag" style="font-weight:700;height:40px;margin-left:30px">诊断已填写</div>
    <el-form
      ref="diagnoseForm"
      :model="diagnoseForm"
      :rules="rules"
      label-width="100px"
      class="demo-diagnoseForm"
      style="width:600px;"
    >
      <el-form-item label="主诉" prop="complain">
        <el-input
          v-if="!hasDiagnoseFlag"
          v-model="diagnoseForm.complain"
          :autosize="{ minRows: 2}"
          type="textarea"
        />
        <div v-else>{{ diagnose.complain }}</div>
      </el-form-item>
      <el-form-item label="现病史" prop="presentHistory" style="margin-top:30px">
        <el-input
          v-if="!hasDiagnoseFlag"
          v-model="diagnoseForm.presentHistory"
          :autosize="{ minRows: 2}"
          type="textarea"
        />
        <div v-else>{{ diagnose.presentHistory }}</div>
      </el-form-item>
      <el-form-item label="既往史" prop="pastHistory" style="margin-top:30px">
        <el-input
          v-if="!hasDiagnoseFlag"
          v-model="diagnoseForm.pastHistory"
          :autosize="{ minRows: 2}"
          type="textarea"
        />
        <div v-else>{{ diagnose.pastHistory }}</div>
      </el-form-item>
      <el-form-item label="过敏史" prop="allergicHistory" style="margin-top:30px">
        <el-input
          v-if="!hasDiagnoseFlag"
          v-model="diagnoseForm.allergicHistory"
          :autosize="{ minRows: 2}"
          type="textarea"
        />
        <div v-else>{{ diagnose.allergicHistory }}</div>
      </el-form-item>
      <el-form-item label="初步诊断" prop="firstDiagnose" style="margin-top:30px">
        <el-input
          v-if="!hasDiagnoseFlag"
          v-model="diagnoseForm.firstDiagnose"
          :autosize="{ minRows: 2}"
          type="textarea"
        />
        <div v-else>{{ diagnose.firstDiagnose }}</div>
      </el-form-item>
      <el-form-item label="诊断意见" prop="advice" style="margin-top:30px">
        <el-input
          v-if="!hasDiagnoseFlag"
          v-model="diagnoseForm.advice"
          :autosize="{ minRows: 2}"
          type="textarea"
        />
        <div v-else>{{ diagnose.advice }}</div>
      </el-form-item>
      <el-form-item label="处理" prop="dispose" style="margin-top:30px">
        <el-input
          v-if="!hasDiagnoseFlag"
          v-model="diagnoseForm.dispose"
          :autosize="{ minRows: 2}"
          type="textarea"
        />
        <div v-else>{{ diagnose.dispose }}</div>
      </el-form-item>
      <el-form-item v-if="!hasDiagnoseFlag" style="margin-top:30px">
        <el-button type="primary" @click="submitForm('diagnoseForm')">填写诊断</el-button>
        <el-button @click="resetForm('diagnoseForm')">重置表单</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  insertDiagnose,
  getDiagnoseByUserReservationUuId
} from '@/api/diagnose'
export default {
  data() {
    return {
      diagnoseForm: {},
      rules: {
        complain: [{ required: true, message: '请输入主诉', trigger: 'blur' }],
        presentHistory: [
          { required: true, message: '请输入现病史', trigger: 'blur' }
        ],
        firstDiagnose: [
          { required: true, message: '请输入初步诊断', trigger: 'blur' }
        ],
        advice: [{ required: true, message: '请输入诊断意见', trigger: 'blur' }]
      },
      hasDiagnoseFlag: false,
      diagnose: []
    }
  },
  mounted() {
    this.$nextTick(function init() {
      this.getDiagnoseByUserReservationUuId()
    })
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.diagnoseForm.userReservationUuId = localStorage.getItem(
            'userReservationUuId'
          )
          insertDiagnose(this.diagnoseForm).then(response => {
            if (response.data.returnCode === 200) {
              this.$store.state.errorTokenVisible = true
              this.$store.state.errorTokenMessage = '诊断填写成功'
              this.$store.state.activeName = 'giveMedical'
              this.hasDiagnoseFlag = true
              this.$store.state.hasDiagnoseFlag = true
            }
          })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    getDiagnoseByUserReservationUuId() {
      getDiagnoseByUserReservationUuId(
        localStorage.getItem('userReservationUuId')
      ).then(response => {
        if (response.data.returnCode === 200) {
          if (response.data.returnData !== null) {
            this.hasDiagnoseFlag = true
            this.$store.state.hasDiagnoseFlag = true
            this.diagnose = response.data.returnData
          } else {
            this.hasDiagnoseFlag = false
            this.$store.state.hasDiagnoseFlag = false
            this.diagnose = []
          }
        }
      })
    }
  }
}
</script>
