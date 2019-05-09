
<template>
  <div>
    <el-container>
      <el-main>
        <el-form
          ref="doctorForm"
          :model="doctorForm"
          :rules="rules"
          label-width="100px"
          style="width:50%;"
        >
          <el-form-item label="医生头像" prop="doctorImg">
            <span style="margin-left:20px">
              <my-upload
                v-model="show"
                :width="120"
                :height="120"
                field="img"
                img-format="png"
                with-credentials
                no-circle
                @crop-success="cropSuccess"
              />
            </span>
            <img :src="imgDataUrl != ''?imgDataUrl:doctorForm.imgPath" width="120px" height="120px">
            <el-button type="primary" style="margin-left:50px" @click="toggleShow">选择医生示例图</el-button>
          </el-form-item>
          <el-form-item label="医生姓名" prop="doctorName" style="width:50%">
            <span>{{ doctorForm.doctorName }}</span>
          </el-form-item>
          <el-form-item label="身份证号" prop="doctorIdCard" style="width:50%">
            <span>{{ doctorForm.doctorIdCard }}</span>
          </el-form-item>
          <el-form-item label="医生工号" prop="doctorNumber" style="width:50%">
            <el-input v-model="doctorForm.doctorNumber" max="400"/>
          </el-form-item>
          <el-form-item label="医生职称" prop="doctorTitle" style="width:50%">
            <el-select v-model="doctorForm.doctorTitle" placeholder="请选择医生职称">
              <el-option
                v-for="item in doctorTitleList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="医生擅长" prop="goodAt" style="width:50%">
            <el-input v-model="doctorForm.goodAt" type="textarea" max="400" rows="3"/>
          </el-form-item>
          <el-form-item label="医生手机" prop="phone" style="width:50%">
            <el-input v-model="doctorForm.phone" max="400"/>
          </el-form-item>
          <el-form-item label="所属科室" prop="doctorDepartmentList" style="width:100%">
            <el-tag
              v-for="tag in doctorDepartmentList"
              :key="tag.id"
              :disable-transitions="false"
              closable
              color="white"
              @close="handleClose(tag)"
            >{{ tag.departmentName }}</el-tag>
            <el-input
              v-if="inputVisible"
              ref="saveTagInput"
              v-model="inputValue"
              class="input-new-tag"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            />
            <el-button
              v-else
              class="button-new-tag"
              type="primary"
              @click="choiceDepartment"
            >+ 新增医生所属科室</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('doctorForm')">立即更新</el-button>
            <el-button type="info" @click="goBack()">取消</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>

    <el-dialog :visible.sync="departmentDiaglogVisible" title="提示" width="50%">
      <el-container>
        <el-header style="padding-top:20px">
          <el-row :gutter="20">
            <el-col :span="10">
              <el-input
                v-model="departmentMessage"
                placeholder="根据科室名/科室编号模糊搜索"
                prefix-icon="el-icon-search"
                @keyup.native="listDepartmentByNameOrNumberWithDepartmentMessage()"
              />
            </el-col>
            <el-col :span="12">
              <el-button-group>
                <el-button type="primary" icon="el-icon-menu" @click="changeDepartmentType(2)">全部科室</el-button>
                <el-button
                  type="primary"
                  icon="el-icon-star-on"
                  @click="changeDepartmentType(1)"
                >专家科室</el-button>
                <el-button
                  type="primary"
                  icon="el-icon-star-off"
                  @click="changeDepartmentType(0)"
                >普通科室</el-button>
              </el-button-group>
            </el-col>
          </el-row>
        </el-header>
        <el-main style="margin-top:20px">
          <el-checkbox
            v-for="(department,index) in departmentList"
            v-model="newDepartmentList"
            :key="index"
            :label="department.id"
            class="department-name-style"
            border
            @change="checked=>addNewDepartment(checked, department)"
          >{{ department.departmentName }}</el-checkbox>
        </el-main>
      </el-container>
      <span slot="footer" class="dialog-footer">
        <el-button @click="departmentDiaglogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAddNewDepartmentList()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getDoctorById, updateDoctor, insertDoctorImg } from '@/api/doctor'
import { listDepartmentByNameOrNumberWithDepartmentMessage } from '@/api/department'
import 'babel-polyfill' // es6 shim
import myUpload from 'vue-image-crop-upload'
export default {
  components: {
    'my-upload': myUpload
  },
  data() {
    var validateDoctorDepartmentList = (rule, value, callback) => {
      if (this.doctorDepartmentList.length === 0) {
        callback(new Error('请至少选择一个所属科室'))
      } else {
        callback()
      }
    }
    return {
      doctorForm: {
        doctorName: '',
        doctorNumber: '',
        doctorTitle: '',
        goodAt: '',
        phone: '',
        departmentList: [],
        imgPath: ''
      },
      rules: {
        goodAt: [
          { required: true, message: '请输入医生擅长', trigger: 'blur' }
        ],
        doctorTitle: [
          { required: true, message: '请选择医生职称', trigger: 'blur' }
        ],
        doctorNumber: [
          { required: true, message: '请输入医生编号', trigger: 'change' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入医生手机号', trigger: 'change' },
          {
            pattern:
              '^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$',
            message: '手机号格式错误',
            trigger: 'blur'
          }
        ],
        doctorDepartmentList: [
          {
            required: true,
            validator: validateDoctorDepartmentList,
            trigger: 'blur'
          }
        ]
      },
      show: false,
      imgDataUrl: '', // the datebase64 url of created image
      changeImgFlag: false,
      doctorTitleList: [
        {
          value: '医生-住院医师',
          label: '医生-住院医师'
        },
        {
          value: '医生-主治医师',
          label: '医生-主治医师'
        },
        {
          value: '医生-副主任医师',
          label: '医生-副主任医师'
        },
        {
          value: '医生-主任医师',
          label: '医生-主任医师'
        }
      ],
      doctorDepartmentList: [],
      inputVisible: false,
      inputValue: '',
      departmentDiaglogVisible: false,
      departmentList: [],
      departmentMessage: '',
      departmentType: 2,
      newDepartmentList: [],
      checkedClass: 'checked'
    }
  },
  mounted() {
    this.$nextTick(function init() {
      this.getDoctorDetail()
    })
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.doctorForm.departmentList = this.doctorDepartmentList
          var obj = {
            imgStr: ''
          }
          if (this.changeImgFlag) {
            this.$set(obj, 'imgStr', this.imgDataUrl)
          }
          updateDoctor(this.doctorForm).then(response => {
            if (response.data.returnCode === 200) {
              if (this.changeImgFlag) {
                insertDoctorImg(obj, response.data.returnData).then(
                  response => {
                    if (response.data.returnCode === 200) {
                      this.$store.state.errorTokenVisible = true
                      this.$store.state.errorTokenMessage = '更新医生成功！'
                      this.$router.push({ name: 'DoctorManagement' })
                    }
                  }
                )
              } else {
                this.$store.state.errorTokenVisible = true
                this.$store.state.errorTokenMessage = '更新医生成功！'
                this.$router.push({ name: 'DoctorManagement' })
              }
            }
          })
        } else {
          return false
        }
      })
    },
    getDoctorDetail() {
      const doctorId = this.$route.query.doctorId
      if (doctorId == null) {
        this.$router.push({ name: 'DoctorManagement' })
      }
      return new Promise((resolve, reject) => {
        getDoctorById(doctorId)
          .then(response => {
            this.doctorForm = response.data.returnData
            this.doctorDepartmentList = this.doctorForm.departmentList
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
      this.changeImgFlag = true
    },
    goBack() {
      this.$router.push({ name: 'DoctorManagement' })
    },
    /**
     * 从所属科室列表移除该科室
     */
    handleClose(tag) {
      this.doctorDepartmentList.splice(
        this.doctorDepartmentList.indexOf(tag),
        1
      )
    },

    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    listDepartmentByNameOrNumberWithDepartmentMessage() {
      return new Promise((resolve, reject) => {
        listDepartmentByNameOrNumberWithDepartmentMessage(
          this.departmentMessage,
          this.departmentType,
          0,
          0
        )
          .then(response => {
            const data = response.data.returnData
            this.total = data.total
            this.departmentList = data.list
            this.newDepartmentList = []
            this.doctorDepartmentList.forEach(element => {
              this.newDepartmentList.push(element.id)
            })
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    choiceDepartment() {
      this.listDepartmentByNameOrNumberWithDepartmentMessage()
      this.newDepartmentList = []
      this.departmentDiaglogVisible = true
    },
    changeDepartmentType(type) {
      this.departmentType = type
      this.listDepartmentByNameOrNumberWithDepartmentMessage()
    },
    /**
     * 从新添加科室列表中添加或删除临时选择
     */
    addNewDepartment(checked, department) {
      // 标志是否已经有所属专家科室
      let expertFlag = false
      this.doctorDepartmentList.forEach(department => {
        if (department.deptType === 1) {
          expertFlag = true
        }
      })
      if (checked) {
        if (department.deptType === 1 && expertFlag) {
          this.newDepartmentList.splice(
            this.newDepartmentList.indexOf(department),
            1
          )
          this.$store.state.errorTokenVisible = true
          this.$store.state.errorTokenMessage = '医生已有所属专家科室'
        } else {
          this.doctorDepartmentList.push(department)
        }
      } else {
        this.doctorDepartmentList.splice(
          this.doctorDepartmentList.indexOf(department),
          1
        )
      }
    },
    confirmAddNewDepartmentList() {
      this.departmentDiaglogVisible = false
    }
  }
}
</script>

<style>
.el-tag {
  margin-right: 30px;
  margin-bottom: 20px;
  height: 32px;
  line-height: 30px;
  width: 200px;
  text-align: center;
  color: black;
  font-size: 14px;
  font-weight: 550;
}
.button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
  width: 200px;
  font-weight: 550;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.department-name-style {
  font-size: 16px;
  text-align: center;
  font-weight: 600;
}
</style>
