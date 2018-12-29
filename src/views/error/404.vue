<template>
  <div class="errPage-container">
    <el-button icon="arrow-left" class="pan-back-btn" @click="back">返回</el-button>
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">Oops!</h1>
        <h2>您的网页已经随风而逝</h2>
        <ul class="list-unstyled">
          <li>您可以:</li>
          <li class="link-type">
            <router-link to="/dashboard">回首页</router-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img :src="errGif" width="800" height="428" alt="Girl has dropped her ice cream.">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import errGif from "@/assets/404.png";

export default {
  name: "Page401",
  data() {
    return {
      errGif: errGif,
    };
  },
  methods: {
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: "/dashboard" });
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style scoped>
.errPage-container {
  width: 800px;
  max-width: 100%;
  margin: 100px auto;
  margin-top: 150px;
}
.pan-back-btn {
  background: #008489;
  color: #fff;
  border: none !important;
}
.pan-gif {
  margin: 0 auto;
  display: block;
}
.pan-img {
  display: block;
  margin: 0 auto;
  width: 100%;
}
.text-jumbo {
  font-size: 60px;
  font-weight: 700;
  color: #484848;
}
.list-unstyled {
  font-size: 14px;
}
.list-unstyled li {
  padding-bottom: 5px;
}
.list-unstyled a {
  color: #008489;
  text-decoration: none;
}
</style>
