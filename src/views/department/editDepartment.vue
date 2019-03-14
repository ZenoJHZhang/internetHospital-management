
<template>
  <el-container>
    <el-main>
      <el-form
        :model="departmentForm"
        :rules="rules"
        ref="departmentForm"
        label-width="100px"
        class="demo-departmentForm"
        style="width:50%;"
      >
        <el-form-item label="科室图片" prop="departmentImg">
          <el-button type="primary" @click="toggleShow">选择科室示例图</el-button>
          <my-upload
            field="img"
            @crop-success="cropSuccess"
            @crop-upload-success="cropUploadSuccess"
            @crop-upload-fail="cropUploadFail"
            v-model="show"
            :width="160"
            :height="110"
            :params="params"
            :headers="headers"
            img-format="png"
            withCredentials
            noCircle
          ></my-upload>
          <img :src="imgDataUrl">
        </el-form-item>

        <el-form-item label="科室名称" prop="departmentName" style="width:50%">
          <el-input v-model="departmentForm.departmentName" max="400"></el-input>
        </el-form-item>
        <el-form-item label="科室编号" prop="departmentNumber" style="width:50%">
          <el-input v-model="departmentForm.departmentNumber" max="400"></el-input>
        </el-form-item>
        <el-form-item label="科室介绍" prop="introduce">
          <el-input v-model="departmentForm.introduce" type="textarea" :rows="3"></el-input>
        </el-form-item>
        <el-form-item label="科室电话" prop="phone" style="width:50%">
          <el-input v-model="departmentForm.phone" max="400"></el-input>
        </el-form-item>
        <el-form-item label="科室类型" prop="deptType" style="width:50%">
          <el-radio-group v-model="departmentForm.deptType">
            <el-radio :label="0">普通科室</el-radio>
            <el-radio :label="1">专家科室</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="挂号价格" prop="price" style="width:30%">
          <el-input v-model="departmentForm.price" max="400" type="number"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('departmentForm')">立即更新</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import { getDepartmentById } from "@/api/department";
import "babel-polyfill"; // es6 shim
import myUpload from "vue-image-crop-upload";
export default {
  data() {
    return {
      departmentForm: {
        departmentName: "",
        departmentNumber: "",
        introduce: "",
        phone: "",
        deptType: "",
        price: ""
      },
      rules: {
        departmentName: [
          { required: true, message: "请输入科室类型", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        departmentNumber: [
          { required: true, message: "请输入科室编号", trigger: "change" }
        ],
        phone: [
          { required: true, message: "请输入科室联系电话", trigger: "change" }
        ],
        deptType: [
          { required: true, message: "请选择科室类型", trigger: "change" }
        ],
        price: [
          { required: true, message: "请输入科室挂号价格", trigger: "change" }
        ],
        departmentImg: [
          { required: true, message: "请选择科室图片", trigger: "change" }
        ]
      },
      show: false,
      params: {
        token: "123456798",
        name: "avatar"
      },
      headers: {
        smail: "*_~"
      },
      imgDataUrl: "" // the datebase64 url of created image
    };
  },
  components: {
    "my-upload": myUpload
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getDepartmentDetail() {
      let departmentId = this.$route.query.departmentId;
      return new Promise((resolve, reject) => {
        getDepartmentById(departmentId)
          .then(response => {
            this.departmentForm = response.data.returnData;
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    beforeImgUpload() {},
    uploadImg() {},
    toggleShow() {
      this.show = !this.show;
    },
    /**
     * crop success
     *
     * [param] imgDataUrl
     * [param] field
     */
    cropSuccess(imgDataUrl, field) {
      console.log("-------- crop success --------");
      this.imgDataUrl = imgDataUrl;
    },
    /**
     * upload success
     *
     * [param] jsonData   服务器返回数据，已进行json转码
     * [param] field
     */
    cropUploadSuccess(jsonData, field) {
      console.log("-------- upload success --------");
      console.log(jsonData);
      console.log("field: " + field);
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field) {
      console.log("-------- upload fail --------");
      console.log(status);
      console.log("field: " + field);
    }
  },
  mounted() {
    this.$nextTick(function init() {
      this.getDepartmentDetail();
    });
  }
};
</script>