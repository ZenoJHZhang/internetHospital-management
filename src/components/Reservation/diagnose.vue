
<template>
  <el-form
    ref="diagnoseForm"
    :model="diagnoseForm"
    :rules="rules"
    label-width="100px"
    class="demo-diagnoseForm"
    style="width:50%"
  >
    <el-form-item label="主诉" prop="complain">
      <el-input v-model="diagnoseForm.complain"/>
    </el-form-item>
    <el-form-item label="现病史" prop="presentHistory">
      <el-input v-model="diagnoseForm.presentHistory"/>
    </el-form-item>
    <el-form-item label="既往史" prop="pastHistory">
      <el-input v-model="diagnoseForm.pastHistory"/>
    </el-form-item>
    <el-form-item label="过敏史" prop="allergicHistory">
      <el-input v-model="diagnoseForm.allergicHistory"/>
    </el-form-item>
    <el-form-item label="初步诊断" prop="firstDiagnose">
      <el-input v-model="diagnoseForm.firstDiagnose"/>
    </el-form-item>
    <el-form-item label="诊断意见" prop="advice">
      <el-input v-model="diagnoseForm.advice"/>
    </el-form-item>
    <el-form-item label="处理" prop="dispose">
      <el-input v-model="diagnoseForm.dispose"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('diagnoseForm')">填写主诉</el-button>
      <el-button @click="resetForm('diagnoseForm')">重置表单</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
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
        advice: [
          { required: true, message: '请输入诊断意见', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
