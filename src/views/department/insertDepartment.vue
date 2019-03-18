
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
          <img :src="imgDataUrl != ''?imgDataUrl:departmentForm.imgPath">
          <el-button type="primary" style="margin-left:50px" @click="toggleShow">选择科室示例图</el-button>
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
          <el-input v-model="departmentForm.price" max="400" type="number" step="0.1"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('departmentForm')">立即新增</el-button>
          <el-button type="info" @click="goBack()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import {
  insertDepartment,
  insertDepartmentImg
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
        price: '0.00',
        id: '',
        imgPath:
          'https://www.woniuyiliao.cn/image/department/ff74c676-984e-4c7c-972f-28b94a3be1bb.png'
      },
      rules: {
        departmentName: [
          { required: true, message: '请输入科室类型', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        departmentNumber: [
          { required: true, message: '请输入科室编号', trigger: 'change' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入科室手机号', trigger: 'change' },
          {
            pattern:
              '^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$',
            message: '手机号格式错误',
            trigger: 'blur'
          }
        ],
        deptType: [
          { required: true, message: '请选择科室类型', trigger: 'change' }
        ],
        price: [
          { required: true, message: '请输入科室挂号价格', trigger: 'change' }
        ]
      },
      show: false,
      imgDataUrl: '', // the datebase64 url of created image
      changeImgFlag: false
    }
  },
  mounted() {
    this.$nextTick(function init() {})
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 科室图片用户未设置，则为默认科室图片
          if (!this.changeImgFlag) {
            this.departmentForm.imgId = 1
          }
          insertDepartment(this.departmentForm).then(response => {
            if (response.data.returnCode === 200) {
              if (this.changeImgFlag) {
                insertDepartmentImg(
                  this.imgDataUrl,
                  response.data.returnData
                ).then(response => {
                  if (response.data.returnCode === 200) {
                    this.$store.state.errorTokenVisible = true
                    this.$store.state.errorTokenMessage = '新增科室成功！'
                    this.$router.push({ name: 'DeparmentManagement' })
                  }
                })
              } else {
                this.$store.state.errorTokenVisible = true
                this.$store.state.errorTokenMessage = '新增科室成功！'
                this.$router.push({ name: 'DeparmentManagement' })
              }
            }
          })
        } else {
          return false
        }
      })
    },
    toggleShow() {
      this.show = !this.show
    },
    cropSuccess(imgDataUrl, field) {
      this.imgDataUrl = imgDataUrl
      this.changeImgFlag = true
    },
    goBack() {
      this.$router.push({ name: 'DeparmentManagement' })
    }
  }
}
</script>
