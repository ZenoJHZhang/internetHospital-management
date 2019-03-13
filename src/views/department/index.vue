<template>
  <el-container>
    <el-header style="padding-top:20px">
      <el-row>
        <el-col :span="6">
          <el-input placeholder="根据科室名/科室编号模糊搜索" prefix-icon="el-icon-search" v-model="input21"></el-input>
        </el-col>
        <el-col :span="10">
          <el-button-group>
            <el-button type="primary" icon="el-icon-menu">全部科室</el-button>
            <el-button type="primary" icon="el-icon-star-on">专家科室</el-button>
            <el-button type="primary" icon="el-icon-star-off">普通科室</el-button>
          </el-button-group>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row>
        <!--就改这里一行-->
        <el-col :span="6" v-for="(project,index) in allprojects" :key="index">
          <el-card :body-style="{ padding: '0px', height:'360px',}" shadow="hover">
            <div slot="header">
              <span style="font-weight:700;font-size:18px">卡片名称</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <el-row style="padding-top:40px;padding-left:25%">
              <el-col>
                <img src="@/assets/defaultDepartment.png">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8" class="title">
                <div>科室编号</div>
              </el-col>
              <el-col :span="14" class="detail">
                <div>343433</div>
              </el-col>
            </el-row>
            <el-row class="row-style">
              <el-col :span="8" class="title">
                <div>科室介绍</div>
              </el-col>
              <el-col :span="14" class="detail">
                <div>343433</div>
              </el-col>
            </el-row>
            <el-row class="row-style">
              <el-col :span="8" class="title">
                <div>科室电话</div>
              </el-col>
              <el-col :span="14" class="detail">
                <div>343433</div>
              </el-col>
            </el-row>
            <el-row class="row-style">
              <el-col :span="8" class="title">
                <div>科室类型</div>
              </el-col>
              <el-col :span="14" class="detail">
                <div>343433</div>
              </el-col>
            </el-row>
            <el-row class="row-style">
              <el-col :span="8" class="title">
                <div>挂号价格</div>
              </el-col>
              <el-col :span="14" class="detail">
                <div style="color:red">￥343433</div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>


<style>
.el-col {
  border-radius: 4px;
  padding-bottom: 20px;
  padding-left: 30px;
}
.name {
  font-weight: 700;
  font-size: 25px;
}
.title {
  font-weight: 600;
  margin-bottom: 15px;
  margin-top: 15px;
}
.detail {
  margin-bottom: 15px;
  margin-top: 15px;
}
</style>

<script>
export default {
  data() {
    return {
      currentDate: new Date(),
      allprojects: [
        {
          pid: "123",
          pname: "pname",
          pcname: "pcname",
          pdatesave: "2018-4-9 11:11:11",
          ppageview: 10
        },
        {
          pid: "123",
          pname: "pname",
          pcname: "pcname",
          pdatesave: "2018-4-9 11:11:11",
          ppageview: 10
        },
        {
          pid: "123",
          pname: "pname",
          pcname: "pcname",
          pdatesave: "2018-4-9 11:11:11",
          ppageview: 10
        },
        {
          pid: "123",
          pname: "pname",
          pcname: "pcname",
          pdatesave: "2018-4-9 11:11:11",
          ppageview: 10
        },
        {
          pid: "123",
          pname: "pname",
          pcname: "pcname",
          pdatesave: "2018-4-9 11:11:11",
          ppageview: 10
        },
        {
          pid: "123",
          pname: "pname",
          pcname: "pcname",
          pdatesave: "2018-4-9 11:11:11",
          ppageview: 10
        }
      ]
    };
  }
};
</script>