<template>
  <div>
    <div>
      <div class="title-line">{{ firstTitle }}</div>
      <div class="reservationStyle">
        <div class="lineClass">
          <div class="detailClass">
            <label style="color:black">姓名：</label>
            <span style="color: #fe9e20;">{{ userReservation.patientName }}</span>
          </div>
          <div class="detailClass">
            <label style="color:black">性别：</label>
            <span>{{ patient.sex == 1?'男':'女' }}</span>
          </div>
          <div class="detailClass">
            <label style="color:black">年龄：</label>
            <span>{{ patient.age }}</span>
          </div>
        </div>
        <div v-if="!auditFlag" class="lineClass">
          <div>
            <label style="color:black">身份证号：</label>
            <span>{{ patient.idCard }}</span>
          </div>
        </div>
        <div v-if="!auditFlag" class="lineClass">
          <div class="detailClass">
            <label style="color:black">科室：</label>
            <span>{{ userReservation.departmentName }}</span>
          </div>
          <div class="detailClass">
            <label style="color:black">医生：</label>
            <span>{{ userReservation.doctorName }}</span>
          </div>
        </div>
        <div v-if="!auditFlag" class="lineClass">
          <div class="detailClass">
            <label style="color:black">预约日期：</label>
            <span style="color: #fe9e20;">{{ userReservation.clinicDate }}</span>
          </div>
          <div class="detailClass">
            <label style="color:black">预约时段：</label>
            <span style="color: #fe9e20;">{{ userReservation.clinicTime }}</span>
          </div>
        </div>
        <div class="lineClass">
          <div class="detailClass">
            <label style="color:black">挂号费：</label>
            <span style="color: #fe9e20;">￥{{ userReservation.clinicPrice }}</span>
          </div>
          <div v-if="recipeFlag" class="detailClass">
            <label style="color:black">处方费：</label>
            <span style="color: #fe9e20;">￥{{ userReservation.recipePrice }}</span>
          </div>
        </div>
        <div v-if="!auditFlag" class="lineClass">
          <div style="width:100%">
            <label style="color:black">疾病描述：</label>
            <span>{{ userReservation.conditionDesc }}</span>
          </div>
        </div>
        <div v-if="!auditFlag">
          <div class="lineClass">
            <div>
              <label style="color:black">
                病情图片：
                <span style="color: #fe9e20;">（点击查看大图）</span>
              </label>
              <user-reservation-img-water-fall v-if="imgPathList.length !== 0"/>
            </div>
          </div>
        </div>
        <no-comment
          v-if="imgPathList.length === 0"
          style="margin-top:50px;margin-bottom:150px;text-align:center"
          title="暂无图片"
        />
      </div>
    </div>
    <div class="title-line">
      诊断详情
      <span v-if="diagnoseFlag">
        <el-button
          type="text"
          style="float:right;margin-right:20%"
          @click="diagnoseVisableFlag = !diagnoseVisableFlag"
        >{{ diagnoseVisableFlag == true ?'收起':'展开' }}</el-button>
      </span>
    </div>
    <div v-if="diagnoseFlag">
      <div v-if="diagnoseVisableFlag" class="reservationStyle">
        <div class="lineClass">
          <div class="longDetailClass">
            <label style="color:black">主诉：</label>
            <span>{{ userReservation.diagnose.complain != ''?userReservation.diagnose.complain :'暂无主诉' }}</span>
          </div>
        </div>
        <div class="lineClass">
          <div class="longDetailClass">
            <label style="color:black">现病史：</label>
            <span>{{ userReservation.diagnose.presentHistory !='' ?userReservation.diagnose.presentHistory:'暂无现病史' }}</span>
          </div>
        </div>
        <div class="lineClass">
          <div class="longDetailClass">
            <label style="color:black">既往史：</label>
            <span>{{ userReservation.diagnose.pastHistory != ""? userReservation.diagnose.pastHistory:'暂无既往史：' }}</span>
          </div>
        </div>
        <div class="lineClass">
          <div class="longDetailClass">
            <label style="color:black">过敏史：</label>
            <span>{{ userReservation.diagnose.allergicHistory != ""? userReservation.diagnose.allergicHistory:'暂无过敏史：' }}</span>
          </div>
        </div>
        <div class="lineClass">
          <div class="longDetailClass">
            <label style="color:black">初步诊断：</label>
            <span>{{ userReservation.diagnose.firstDiagnose != ""? userReservation.diagnose.firstDiagnose:'暂无初步诊断：' }}</span>
          </div>
        </div>
        <div class="lineClass">
          <div class="longDetailClass">
            <label style="color:black">诊断意见：</label>
            <span>{{ userReservation.diagnose.advice != ""? userReservation.diagnose.advice:'暂无诊断意见：' }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!diagnoseFlag" style="font-weight:700">暂无诊断意见</div>

    <div style="margin-top:25px;margin-bottom:50px">
      <div class="title-line">
        处方详情
        <span v-if="recipeFlag">
          <el-button
            type="text"
            style="float:right;margin-right:20%"
            @click="recipeVisableFlag = !recipeVisableFlag"
          >{{ recipeVisableFlag == true ?'收起':'展开' }}</el-button>
        </span>
      </div>
      <div v-if="recipeFlag">
        <div v-if="recipeVisableFlag ">
          <el-table :data="userReservation.medicalList" style="width: 100%">
            <el-table-column prop="name" label="药品名称"/>
            <el-table-column prop="unit" label="规格" width="50"/>
            <el-table-column prop="type" label="类型" width="50"/>
            <el-table-column prop="price" label="单价" width="50"/>
            <el-table-column prop="amount" label="数量" width="50"/>
            <el-table-column prop="dosageDetail" label="每次服用剂量" width="120"/>
            <el-table-column prop="times" label="用药频次"/>
            <el-table-column prop="day" label="天数" width="80"/>
            <el-table-column prop="method" label="用法"/>
          </el-table>
        </div>
      </div>
      <div v-if="!recipeFlag" style="font-weight:700">暂无处方</div>
    </div>

    <div v-if="userReservation.isEvaluate === '1'" style="margin-bottom:80px">
      <div class="title-line">星级评价</div>
      <div class="block">
        <el-rate
          v-model="userReservation.evaluateStar"
          :score-template="userReservation.evaluateStar"
          disabled
          show-score
          text-color="#ff9900"
        />
      </div>
    </div>
  </div>
</template>

<script>
import noComment from '@/components/common/noComment'
import userReservationImgWaterFall from '@/components/Reservation/userReservationImgWaterFall'
import { getAllDetailByUuId } from '@/api/reservation'
export default {
  components: {
    noComment,
    userReservationImgWaterFall
  },
  props: {
    auditFlag: {
      type: Boolean,
      default: function() {
        return true
      }
    },
    userReservationUuId: {
      type: String,
      default: function() {
        return ''
      }
    }
  },
  data() {
    return {
      userReservation: {},
      firstTitle: '',
      diagnoseVisableFlag: false,
      recipeVisableFlag: true,
      recipeFlag: false,
      diagnoseFlag: false,
      imgPathList: [],
      patient: {}
    }
  },
  watch: {
    userReservationUuId(newVar, oldVar) {
      if (newVar !== oldVar) {
        this.getAllDetailByUuId()
      }
    }
  },
  mounted() {
    this.$nextTick(function generate() {
      if (this.auditFlag) {
        this.firstTitle = '患者信息'
      } else {
        this.firstTitle = '患者就诊详情'
      }
      this.getAllDetailByUuId()
    })
  },
  methods: {
    getAllDetailByUuId() {
      getAllDetailByUuId(this.userReservationUuId).then(response => {
        if (response.data.returnCode === 200) {
          this.userReservation = response.data.returnData
          localStorage.setItem(
            'userReservation',
            JSON.stringify(this.userReservation)
          )
          this.imgPathList = this.userReservation.imgPathList
          this.patient = this.userReservation.patient
          if (this.userReservation.diagnose !== null) {
            this.diagnoseFlag = true
          } else {
            this.diagnoseFlag = false
          }
          if (this.userReservation.medicalList !== null) {
            if (this.userReservation.medicalList.length !== 0) {
              this.recipeFlag = true
            }
          } else {
            this.recipeFlag = false
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.title-line {
  border-bottom: 1px solid #e5e5e5;
  height: 40px;
  line-height: 40px;
  color: #a71820;
  font-size: 1;
  font-family: "microsoft yahei";
  font-weight: 700;
  margin-bottom: 20px;
}
.reservationStyle {
  margin-left: 5%;
  margin-top: 30px;
  font-size: 16px;
}
.detailClass {
  display: inline-block;
  width: 30%;
}
.detailClass span {
  margin-left: 5%;
}
.longDetailClass {
  display: inline-block;
  width: 90%;
}
.longDetailClass span {
  width: 100% !important;
  word-wrap: break-word;
  word-break: break-all;
}
.lineClass {
  margin-bottom: 25px;
}
.imgClass {
  height: 100%;
}
.imgClass img {
  padding: 30px;
}
</style>
