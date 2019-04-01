<template>
  <div>
    <el-container>
      <el-aside width="60%" style="height:800px;">
        <video-test/>
        <el-button style="margin-left:40%" type="primary" @click="dialogVisible=true">结束视频问诊</el-button>
      </el-aside>
      <el-main>
        <user-reservation-detail/>
      </el-main>
    </el-container>
    <el-dialog :visible.sync="dialogVisible" title="提示" width="30%">
      <span>是否结束问诊</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="endClinic()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import videoTest from '@/components/Reservation/videoTest'
import noComment from '@/components/common/noComment'
import userReservationDetail from '@/components/Reservation/userReservationDetail'
import { beginOrFinishClinic } from '@/api/reservation'
export default {
  components: {
    videoTest,
    noComment,
    userReservationDetail
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  mounted() {
    this.$nextTick(function generate() {})
  },
  methods: {
    endClinic() {
      beginOrFinishClinic(localStorage.getItem('userReservationUuId'), 1).then(
        response => {
          if (response.data.returnCode === 200) {
            this.$router.push({
              name: 'ClinicResult'
            })
          }
        }
      )
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
  margin-bottom: 50px;
}
.imgClass {
  height: 100%;
}
.imgClass img {
  padding: 30px;
}
</style>
