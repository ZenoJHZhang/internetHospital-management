<template>
  <div>
    <div class="title-line">患者就诊详情</div>
    <div class="reservationStyle">
      <div class="lineClass">
        <div class="detailClass">
          <label style="color:black">姓名：</label>
          <span style="color: #fe9e20;">{{ userReservation.patientName }}</span>
        </div>
        <div class="detailClass">
          <label style="color:black">性别：</label>
          <span>{{ userReservation.patientSex }}</span>
        </div>
        <div class="detailClass">
          <label style="color:black">年龄：</label>
          <span>{{ patient.age }}</span>
        </div>
      </div>
      <div class="lineClass">
        <div>
          <label style="color:black">身份证号：</label>
          <span>{{ patient.idCard }}</span>
        </div>
      </div>
      <div class="lineClass">
        <div class="detailClass">
          <label style="color:black">科室：</label>
          <span>{{ userReservation.departmentName }}</span>
        </div>
        <div class="detailClass">
          <label style="color:black">医生：</label>
          <span>{{ userReservation.doctorName }}</span>
        </div>
      </div>
      <div class="lineClass">
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
          <label style="color:black">费用：</label>
          <span style="color: #fe9e20;">￥{{ userReservation.clinicPrice }}</span>
        </div>
      </div>
      <div class="lineClass">
        <div class="detailClass">
          <label style="color:black">疾病描述：</label>
          <span>{{ userReservation.conditionDesc }}</span>
        </div>
      </div>
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
</template>

<script>
import noComment from '@/components/common/noComment'
import userReservationImgWaterFall from '@/components/Reservation/userReservationImgWaterFall'
export default {
  components: {
    noComment,
    userReservationImgWaterFall
  },
  data() {
    return {
      userReservation: [],
      patient: {},
      imgPathList: []
    }
  },
  mounted() {
    this.$nextTick(function generate() {
      this.getUserReservationDetail()
    })
  },
  methods: {
    getUserReservationDetail() {
      const obj = localStorage.getItem('userReservation')
      if (obj === null) {
        this.$router.push({
          name: 'DoctorClinic'
        })
      }
      this.userReservation = JSON.parse(obj)
      this.patient = this.userReservation.patient
      this.imgPathList = this.userReservation.imgPathList
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
