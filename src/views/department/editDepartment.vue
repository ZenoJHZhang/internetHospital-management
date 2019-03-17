
<template>
  <el-container>
    <el-main>
      <el-form
        ref="departmentForm"
        :model="departmentForm"
        :rules="rules"
        label-width="100px"
        class="demo-departmentForm"
        style="width:50%;"
      >
        <el-form-item label="科室图片" prop="departmentImg">
          <el-button type="primary" @click="toggleShow">选择科室示例图</el-button>
          <my-upload
            v-model="show"
            :width="160"
            :height="110"
            field="img"
            img-format="png"
            with-credentials
            no-circle
            @crop-success="cropSuccess"
          />
          <img :src="imgDataUrl">
        </el-form-item>

        <el-form-item label="科室名称" prop="departmentName" style="width:50%">
          <el-input v-model="departmentForm.departmentName" max="400"/>
        </el-form-item>
        <el-form-item label="科室编号" prop="departmentNumber" style="width:50%">
          <el-input v-model="departmentForm.departmentNumber" max="400"/>
        </el-form-item>
        <el-form-item label="科室介绍" prop="introduce">
          <el-input v-model="departmentForm.introduce" :rows="3" type="textarea"/>
        </el-form-item>
        <el-form-item label="科室电话" prop="phone" style="width:50%">
          <el-input v-model="departmentForm.phone" max="400"/>
        </el-form-item>
        <el-form-item label="科室类型" prop="deptType" style="width:50%">
          <el-radio-group v-model="departmentForm.deptType">
            <el-radio :label="0">普通科室</el-radio>
            <el-radio :label="1">专家科室</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="挂号价格" prop="price" style="width:30%">
          <el-input v-model="departmentForm.price" max="400" type="number"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('departmentForm')">立即更新</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import {
  getDepartmentById,
  updateDepartment
} from '@/api/department'
import 'babel-polyfill' // es6 shim
import myUpload from 'vue-image-crop-upload'
export default {
  components: {
    'my-upload': myUpload
  },
  data() {
    return {
      departmentForm: {
        departmentName: '',
        departmentNumber: '',
        introduce: '',
        phone: '',
        deptType: '',
        price: '',
        id: ''
      },
      rules: {
        departmentName: [
          { required: true, message: '请输入科室类型', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        departmentNumber: [
          { required: true, message: '请输入科室编号', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '请输入科室联系电话', trigger: 'change' }
        ],
        deptType: [
          { required: true, message: '请选择科室类型', trigger: 'change' }
        ],
        price: [
          { required: true, message: '请输入科室挂号价格', trigger: 'change' }
        ]
        // departmentImg: [
        //   { required: true, message: "请选择科室图片", trigger: "change" }
        // ]
      },
      show: false,
      imgDataUrl: '' // the datebase64 url of created image
    }
  },
  mounted() {
    this.$nextTick(function init() {
      this.getDepartmentDetail()
    })
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          updateDepartment(this.departmentForm).then(response => {
            console.log(response)
          })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    getDepartmentDetail() {
      const departmentId = this.$route.query.departmentId
      return new Promise((resolve, reject) => {
        getDepartmentById(departmentId)
          .then(response => {
            this.departmentForm = response.data.returnData
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    toggleShow() {
      this.show = !this.show
    },
    cropSuccess(imgDataUrl, field) {
      this.imgDataUrl = imgDataUrl
    }
  }
}
</script>
